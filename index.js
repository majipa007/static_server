// Import necessary modules
const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3001;
const dataFilePath = path.join(__dirname, 'data.json');
app.use(express.static('public'));

// API endpoint to serve static JSON data
app.get('/api/products', (req, res) => {
  fs.readFile(dataFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading the data file:', err);
      res.status(500).send('Error loading data.');
    } else {
      const jsonData = JSON.parse(data);
      res.json(jsonData.products);  // Send the products array as a response
    }
  });
});

// API endpoint to get a product by ID
app.get('/api/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);  // Convert id to an integer

  fs.readFile(dataFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading the data file:', err);
      res.status(500).send('Error loading data.');
    } else {
      const jsonData = JSON.parse(data);
      const product = jsonData.products.find(p => p.id === productId);

      if (product) {
        res.json(product);
      } else {
        res.status(404).send('Product not found.');
      }
    }
  });
});

// Default route to show a welcome message
app.get('/', (req, res) => {
  res.send('Welcome to the Static JSON API. Use /api/products to get the list of products, or /api/products/:id to get a product by its ID.');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
