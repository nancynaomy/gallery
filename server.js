const express = require('express');
const path = require('path');

// Define routes
let index = require('./routes/index');
let image = require('./routes/image');

// connecting the database
// connecting the database
let mongodb_url = 'mongodb://localhost:27017/';
let dbName = 'darkroom';

mongoose.connect(`${mongodb_url}${dbName} `)
.then(() => {
    console.log('✅ Database connected successfully');
})
.catch((err) => {
    console.error('❌ Database connection error:', err);
});


// test if the database has connected successfully
let db = mongoose.connection;

db.once('open', () => {
    console.log('Database connected successfully');
});

db.on('error', (err) => {
    console.error('Database connection error:', err);
});


// Initializing the app
 milestone2
const app = express();



 HEAD
// Serve static files from "public" folder
// View Engine
app.set('view engine', 'ejs');app.set('view engine', 'ejs');



// Set up the public folder;
milestone2
app.use(express.static(path.join(__dirname, 'public')));

// Landing page route
app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Gallery</title>
      </head>
      <body>
        <h1 style="font-size:50px; color:red;">MILESTONE 2</h1>
        <h1 style="font-size:50px; color:blue;">MILESTONE 3</h1>
        <h1 style="font-size:50px; color:green;">MILESTONE 4</h1>
      </body>
    </html>
  `);
});

HEAD
// Start server
app.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`);
});

app.use('/', index);
app.use('/image', image);



 
const PORT = process.env.PORT || 5001;

app.listen(PORT,() =>{
    console.log(`Server is listening at http://localhost:${PORT}`)
});
module.exports=app;
 milestone2
