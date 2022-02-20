import express from 'express';
import data from './utils/data.js';

const app = express();

app.get('/api/products', (req, res) => {
    res.send(data.products);
})

app.get('/api/product/:slug', (req, res) => {
    const product = data.products.find(product => product.slug === req.params.slug)

    if (!product) return res.status(404).send({message: "Product not found"})

    res.send(product)
})

app.get('/api/products/:id', (req, res) => {
    const product = data.products.find(product => product._id === req.params.id)

    if (!product) return res.status(404).send({message: "Product not found"})

    res.send(product)
})

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})