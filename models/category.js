const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const app = express();
const port = 5500;
const cors = require('cors');

const pool = new Pool({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: '6267',
    database: "kalakriti",
});

app.use(bodyParser.json())
app.use(express.json());
app.use(cors());

// Define the category schema
const categorySchema = `
  CREATE TABLE IF NOT EXISTS categories (
    c_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    icon VARCHAR(255),
    color VARCHAR(255)
  );
`;

// Create the "categories" table in the database
pool.query(categorySchema, (err, res) => {
  if (err) {
    console.error('Error creating categories table:', err);
  } else {
    console.log('Categories table created successfully.');
  }
  // Start the Express server after creating the table
  startServer();
});
module.exports = router;