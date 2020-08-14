const express = require('express');
const router = express.Router();
const Product = require('../models/product.js');

router.get('/product', (req, res) => {
    Product.find({}, (err, data) => {
        res.json(data);
    })
})

router.get('/product/:id', (req, res) => {
    Product.findById(req.params.id, (err, data) => {
        res.json(data);
    })
})

router.delete('/product/:id', async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ 'message': 'Deleted' });
})

router.post('/product', (req, res) => {
    product = new Product({
        name: req.body.name,
        price: req.body.price,
        stock: req.body.stock,
        description: req.body.description,
        category: req.body.category,
        photo: req.body.photo
    })
    product.save(() => {
        res.json(product);
    })
})

router.put('/product/:id', async (req, res) => {
    await Product.findByIdAndUpdate(req.params.id, req.body);
    res.json({ 'message': 'Updated' })
})

module.exports = router