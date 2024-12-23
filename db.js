const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'acme_hr_db',
  password: 'gidrocket',
  port: 5432,
});

// Users
async function createUser({ username, password }) {
  const result = await pool.query(
    'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *',
    [username, password]
  );
  return result.rows[0];
}

async function getUsers() {
  const result = await pool.query('SELECT * FROM users');
  return result.rows;
}

// Products
async function createProduct({ name, description, price }) {
  const result = await pool.query(
    'INSERT INTO products (name, description, price) VALUES ($1, $2, $3) RETURNING *',
    [name, description, price]
  );
  return result.rows[0];
}

async function getProducts() {
  const result = await pool.query('SELECT * FROM products');
  return result.rows;
}

module.exports = {
  createUser,
  getUsers,
  createProduct,
  getProducts,
};
