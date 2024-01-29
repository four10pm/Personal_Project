const { Client } = require('pg');

// const datenight = 'datenight'
// const client = new Client(`https://localhost:54321/${datenight}`)

const connectionString = process.env.DATABASE_URL || 'https://localhost:5431/datenight';

const client = new Client({
  connectionString,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined,
});

module.exports = client;