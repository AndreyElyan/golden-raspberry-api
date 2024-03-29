/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const parse = require('csv-parser');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const csvFilePath = 'src/infra/csv/movieList.csv';

async function insertData() {
  const data = [];

  try {
    fs.createReadStream(csvFilePath)
      .pipe(
        parse({
          separator: ';',
          headers: ['year', 'title', 'studios', 'producers', 'winner'],
        }),
      )
      .on('data', (row) => {
        data.push(row);
      })
      .on('end', async () => {
        console.log('Inserting data...');
        for (const row of data) {
          await prisma.movie.create({
            data: {
              year: row.year,
              title: row.title,
              studios: row.studios,
              producers: row.producers,
              winner: row.winner,
            },
          });
        }

        console.log('Data inserted successfully');
      });
  } catch (error) {
    console.error('Error inserting data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

insertData();
