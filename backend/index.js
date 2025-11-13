const express = require('express');
const app = express();
const port = 5000;
const mongoDB = require('./db');
const cors = require('cors');

// ✅ Use cors middleware to allow frontend to call backend
app.use(cors({
  origin: 'http://localhost:3000'
}));

// ✅ Middleware to parse JSON
app.use(express.json());

// ✅ Connect to MongoDB
mongoDB();

// ✅ Basic route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// ✅ Use routes
app.use('/api', require('./Routes/CreateUser'));
app.use('/api', require('./Routes/DisplayData'));
app.use('/api', require('./Routes/OrderData'));

// ✅ Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
