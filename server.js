const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

// Define routes
const index = require('./routes/index');
const image = require('./routes/image');

// Get environment variables
const {
  MONGOUSER: username,
  MONGOPASSWORD: userpassword,
  MONGOHOST: mongocluster,
  MONGOPRODUCTIONDATABASE: prod_env,
  //PORT = 5000
} = process.env;

// Validate env variables
if (!username || !userpassword || !mongocluster || !prod_env) {
  console.error("Missing MongoDB environment variables.");
  process.exit(1);
}

// Construct URI
const mongoURI = `mongodb+srv://${username}:${userpassword}@${mongocluster}/${prod_env}?retryWrites=true&w=majority`;

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.error("MongoDB connection failed:", err));

// Initialize app
const app = express();

// View engine
app.set('view engine', 'ejs');

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // if needed

// Routes
app.use('/', index);
app.use('/image', image);

// Server
const PORT = process.env.PORT || 50000;
app.listen(PORT, () => {
    console.log(`Server is listening at http://localhost:${PORT}`);
  });

module.exports = app;
