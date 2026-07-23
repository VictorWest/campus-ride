const express = require('express');
const prisma = require('../lib/prisma');

const router = express.Router();

// GET /rides — public, no auth required (like browsing rides before logging in)
router.get('/', async (req, res) => {
  const rides = await prisma.ride.findMany();
  res.json(rides);
});

module.exports = router;
