/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const parse = require('csv-parser');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const csvFilePath = 'src/infra/database/seed/csv/movieList.csv';

export default async function insertData() {
  const data = [];

  try {
    fs.createReadStream(csvFilePath)
      .pipe(
        parse({
          separator: ';',
          headers: [
            'year',
            'title',
            'studios',
            'producers',
            'winner',
            'imageUrl',
          ],
        }),
      )
      .on('data', (row) => {
        row.year !== 'year' && data.push(row);
      })
      .on('end', async () => {
        const hasTheTableData = await prisma.movie.findMany();
        if (hasTheTableData.length > 0) {
          console.log('Data already inserted');
          return;
        }

        console.log('Inserting data...');
        for (const row of data) {
          await prisma.movie.create({
            data: {
              year: row.year,
              title: row.title,
              studios: row.studios,
              producers: row.producers,
              winner: row.winner,
              urlImage: row.imageUrl || '',
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
