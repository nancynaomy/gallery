var config = {}

// Update to have your correct username and password
config.mongoURI = {
    production: 'mongodb+srv://naomiMANO:Sharleen123.@gallery.wc344.mongodb.net/darkroom?retryWrites=true&w=majority',
    development: 'mongodb+srv://naomiMANO:Sharleen123.@gallery.wc344.mongodb.net/darkroom-dev?retryWrites=true&w=majority',
    test: 'mongodb+srv://naomiMANO:Sharleen123.@gallery.wc344.mongodb.net/darkroom-test?retryWrites=true&w=majority',
    // example: server.js (or config)
const mongoose = require('mongoose');

const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/gallery';
mongoose.connect(mongoUri, { useNewUrlParser:true, useUnifiedTopology:true })
  .then(()=> console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

}
module.exports = config;
