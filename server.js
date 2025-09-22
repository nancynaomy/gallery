const express = require('express');
const path = require('path');
const app = express();

// Use environment PORT or 3000
const PORT = process.env.PORT || 3000;

// Serve static files from "public" folder
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

// Start server
app.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`);
});
