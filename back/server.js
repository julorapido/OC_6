const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth.routes');
require('dotenv').config({path: './config/.env'});
require('./config/db');
const app = express();
const cors = require('cors');

const corsOptions = {
  origin: '*',
  credentials: true,
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'preflightContinue': false
}

app.use(cors({corsOptions}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.listen(process.env.PORT , () => {
  console.log(`Listening on port ${process.env.PORT}`);
})

app.get('/', function (req, res) {
  res.send('GET request to the homepage');
}); 

app.use('/api/auth', authRoutes);  