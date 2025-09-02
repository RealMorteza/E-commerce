  const express = require('express');
  const fs = require('fs/promises');
  const path = require('path');
  const cors = require('cors');

  const app = express();
  const PORT = process.env.PORT || 3001;


  app.use(cors());
  app.use(express.json());

  const DATA_PATH = path.join(__dirname, 'data', 'products.json');

  app.use('/images', express.static(path.join(__dirname, 'Products-images')));

  app.get('/api/products', async (req, res) => {
    try {
      const raw = await fs.readFile(DATA_PATH, 'utf-8');
      const products = JSON.parse(raw);
      res.json(products);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'خطا در خواندن محصولات' });
    }
  });

  app.get('/api/products/:id', async (req, res) => {
    try {
      const raw = await fs.readFile(DATA_PATH, 'utf-8');
      const products = JSON.parse(raw);
      const product = products.find(p => p.id === Number(req.params.id));
      if (!product) {
        return res.status(404).json({ error: 'محصول یافت نشد' });
      }
      res.json(product);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'خطا در خواندن محصول' });
    }
  });

  app.post('/api/products', async (req, res) => {
    try {
      const raw = await fs.readFile(DATA_PATH, 'utf-8');
      const products = JSON.parse(raw);

      const nextId = products.length ? Math.max(...products.map(p => p.id)) + 1 : 1;
      const newProduct = { id: nextId, ...req.body };

      products.push(newProduct);
      await fs.writeFile(DATA_PATH, JSON.stringify(products, null, 2));

      res.status(201).json(newProduct);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'خطا در افزودن محصول' });
    }
  });


  app.delete('/api/products/:id', async (req, res) => {
    try {
      const raw = await fs.readFile(DATA_PATH, 'utf-8');
      let products = JSON.parse(raw);

      const newProducts = products.filter(p => p.id !== Number(req.params.id));
      if (newProducts.length === products.length) {
        return res.status(404).json({ error: 'محصول یافت نشد' });
      }

      await fs.writeFile(DATA_PATH, JSON.stringify(newProducts, null, 2));
      res.status(204).end();
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'خطا در حذف محصول' });
    }
  });


  app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
  });
