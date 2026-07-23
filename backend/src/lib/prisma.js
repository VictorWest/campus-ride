// // A single shared PrismaClient instance, reused across every route file.
// // Avoids opening a new database connection pool per file.
// const { PrismaClient } = require('@prisma/client');

// const prisma = new PrismaClient();

// module.exports = prisma;


// import "dotenv/config";
// import { PrismaClient } from "@prisma/client";
// import { PrismaPg } from "@prisma/adapter-pg";
// import pg from "pg";

require("dotenv/config")
const { PrismaClient } = require('@prisma/client')
const { PrismaPg } = require('@prisma/adapter-pg')
const pg = require("pg")

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

pool.connect()
  .then(() => console.log("Connected to DB!"))
  .catch(console.error);

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

// export default prisma;
module.exports = prisma;