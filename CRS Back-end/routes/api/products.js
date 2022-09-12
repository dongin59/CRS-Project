const express = require('express');
const uuid = require('uuid');
const router = express.Router();
const products = require("../../Products");

// Gets All Products
router.get('/', (req, res) => res.json(products));

// Get Single Product
router.get('/:id', (req, res) => {
    const found = products.some(product => product.id === parseInt(req.params.id));

    if (found) {
        res.json(products.filter(product => product.id === parseInt(req.params.id)));
    } else {
        res.status(400).json({ msg: `No product with the id of ${req.params.id}` });
    }
});

// Create Product
router.post('/', (req, res) => {
    const newProduct = {
        id: uuid.v4(),
        name: req.body.name,
        cost: req.body.cost,
        stock: req.body.stock
    }

    if (!newProduct.name || !newProduct.cost || !newProduct.stock) {
        return res.status(400).json({ msg: 'Please include a name, cost, and stock' });
    }

    products.push(newProduct);
    res.json(products);
    // res.redirect('/');
});

// Update Product
router.put('/:id', (req, res) => {
    const found = products.some(product => product.id === parseInt(req.params.id));

    if (found) {
        const updProduct = req.body;

        products.forEach(product => {
            if (product.id === parseInt(req.params.id)) {
                product.name = updProduct.name ? updProduct.name : product.name;
                product.cost = updProduct.cost ? updProduct.cost : product.cost;
                product.stock = updProduct.stock ? updProduct.stock : product.stock;
                res.json({ msg: 'Product updated', product });
            }
        });
    } else {
        res.status(400).json({ msg: `No product with the id of ${req.params.id}` });
    }
});

// Delete Single Product
router.delete('/:id', (req, res) => {
    const found = products.some(product => product.id === parseInt(req.params.id));

    if (found) {
        res.json({ 
            msg: `Product with the id of ${req.params.id} deleted`, 
            products: products.filter(product => product.id !== parseInt(req.params.id))
        });
    } else {
        res.status(400).json({ msg: `No product with the id of ${req.params.id}` });
    }
});

module.exports = router;