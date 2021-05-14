const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Product = require('./models/Products');

const app = express();

mongoose.connect('mongodb+srv://hugoregnier:hugo21@cluster0.sumrx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());

app.post('/api/products', (req, res, next) => {
    const product = new Product({
      ...req.body
    });
    product.save()
      .then(() => res.status(201).json({ product }))
      .catch(error => res.status(400).json({ error }));
  });
   
  app.get('/api/products/:id', (req, res, next) => {
    Product.findOne({ _id: req.params.id })
      .then(product => res.status(200).json({ product }))
      .catch(error => res.status(404).json({ error }));
  });
   
  app.put('/api/products/:id', (req, res, next) => {
    Product.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet modifié !'}))
      .catch(error => res.status(400).json({ error }));
  });
   
  app.delete('/api/products/:id', (req, res, next) => {
    Product.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Deleted !'}))
      .catch(error => res.status(400).json({ error }));
  });
   
  app.get('/api/products', (req, res, next) => {
      Product.find()
        .then(products => res.status(200).json({ products }))
        .catch(error => res.status(400).json({ error }));
  });
  
  module.exports = app;