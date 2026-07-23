// Populates a few sample rides so GET /rides has something to return.
// Run with: npm run seed  (after migrating)
// const { PrismaClient } = require('@prisma/client');
// const prisma = new PrismaClient();

const prisma = require("../src/lib/prisma");

async function main() {
  await prisma.ride.createMany({
    data: [
      {
        busCode: 'FUTO-8816-BS7',
        origin: 'Bank Road Terminal',
        destination: 'SOSC Complex',
        departureTime: '16:13',
        totalSeats: 14,
      },
      {
        busCode: 'FUTO-2201-BS2',
        origin: 'Main Gate',
        destination: 'School of Engineering',
        departureTime: '08:30',
        totalSeats: 18,
      },
      {
        busCode: 'FUTO-4470-BS9',
        origin: 'Hostel B',
        destination: 'ICT Center',
        departureTime: '12:45',
        totalSeats: 20,
      },
    ],
  });

  console.log('Seeded sample rides.');
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
