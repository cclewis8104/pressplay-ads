const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Express is working!');
});

app.listen(3001, () => {
  console.log('Test server running on http://localhost:3001');
});