const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());

let products = [
  { id: 1, name: 'Áo thun basic', price: 150000 },
  { id: 2, name: 'Quần jeans slim', price: 450000 },
];

app.get('/api/products', (req, res) => {
  res.json(products);
});

app.post('/api/products', (req, res) => {
  const { name, price } = req.body;
  if (!name || !price)
    return res.status(400).json({ error: 'Thiếu dữ liệu' });

  const newProduct = {
    id: Date.now(),
    name,
    price: Number(price)
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

app.listen(5000, () =>
  console.log('Backend chạy tại port :5000')
);