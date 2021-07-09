// utilisation du framework Express qui est appelé dans notre server.js
const express = require('express');

const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const saucesRoutes = require('./routes/sauces')
const userRoutes = require('./routes/User')

const app = express();

// Connexion à la base de données MongoDBAtlas
mongoose.connect('mongodb+srv://hugoregnier:hugo21@cluster0.sumrx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

 
  // Ces headers permettent :
  // d'accéder à notre API depuis n'importe quelle origine ( '*' ) 
  // d'ajouter les headers mentionnés aux requêtes envoyées vers notre API (Origin , X-Requested-With , etc.) 
  // d'envoyer des requêtes avec les méthodes mentionnées ( GET ,POST , etc.).
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// Permet de lire en format JSON
app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, 'images')));


// l'argument de l'app.use sera  l'url visé par l'application front end
app.use('/api/sauces', saucesRoutes);
app.use('/api/auth', userRoutes);
  
  module.exports = app;