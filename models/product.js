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

// Define the product schema
const productSchema = `
  CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    image VARCHAR(255) DEFAULT '',
    images TEXT[] DEFAULT ARRAY[]::TEXT[],
    price NUMERIC DEFAULT 0,
    c_id int,
    foreign key (c_id) REFERENCES categories(c_id),
    count_in_stock INT NOT NULL CHECK (count_in_stock >= 0 AND count_in_stock <= 255),
    rating NUMERIC DEFAULT 0,
    is_featured BOOLEAN DEFAULT false,
    date_created TIMESTAMPTZ DEFAULT NOW()
  );
`;

// Create the "products" table in the database
pool.query(productSchema, (err, res) => {
  if (err) {
    console.error('Error creating products table:', err);
  } else {
    console.log('Products table created successfully.');
  }
  // Start the Express server after creating the table
  startServer();
});
