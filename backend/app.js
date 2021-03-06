const express = require('express');
const mongoose = require('mongoose');
const app = express();
const userRoutes = require('./routes/user');
const sauceRoutes = require("./routes/sauce");
const path = require('path');
require('dotenv').config();


const database = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@piquanteopenclassroom.rcawi.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;


mongoose.connect(database,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
  app.use(express.json());
  
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });



app.use("/api/sauces", sauceRoutes);
app.use(express.json());
app.use('/api/auth', userRoutes);
app.use("/images", express.static(path.join(__dirname, "images")));
module.exports = app;