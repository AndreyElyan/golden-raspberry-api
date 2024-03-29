/* eslint-disable @typescript-eslint/no-var-requires */
import * as fs from 'fs';
import * as parse from 'csv-parser';

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

const seed = () => {
  const data = [];

  fs.createReadStream('src/infra/csv/movieList.csv')
    .pipe(
      parse({
        separator: ';',
        headers: ['year', 'title', 'studios', 'producers', 'winner'],
      }),
    )
    .on('data', (row) => {
      data.push(row);
    })
    .on('end', () => {
      db.serialize(() => {
        db.run(
          'CREATE TABLE IF NOT EXISTS golden_raspberry_awards (year INTEGER, title TEXT, studios TEXT, producers TEXT, winner TEXT)',
          (error) => {
            if (error) {
              console.error('Error creating table', error);
            }
          },
        );

        const stmt = db.prepare(
          'INSERT INTO golden_raspberry_awards VALUES (?, ?, ?, ?, ?)',
        );

        data.forEach((row) => {
          stmt.run(row.year, row.title, row.studios, row.producers, row.winner);
        });

        db.each('SELECT * FROM golden_raspberry_awards', (error, row) => {
          console.log(row);
        });
      });
    });
};

seed();
