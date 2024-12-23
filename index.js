const express = require('express');
const pool = require('./db');

const app = express();
app.use(express.json());

// Add a favorite
app.post('/users/:id/favorites', async (req, res) => {
  const userId = req.params.id;
  const { product_id } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO favorites (user_id, product_id) VALUES ($1, $2) RETURNING *',
      [userId, product_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all favorites for a user
app.get('/users/:id/favorites', async (req, res) => {
  const userId = req.params.id;
  try {
    const result = await pool.query('SELECT * FROM favorites WHERE user_id = $1', [userId]);
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a favorite
app.delete('/users/:id/favorites/:favoriteId', async (req, res) => {
  const { id, favoriteId } = req.params;
  try {
    const result = await pool.query('DELETE FROM favorites WHERE id = $1 AND user_id = $2', [
      favoriteId,
      id,
    ]);
    if (result.rowCount === 0) {
      res.status(404).json({ error: 'Favorite not found' });
    } else {
      res.status(204).send();
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
