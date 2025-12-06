const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const mongoDB = require('./db');
const cors = require('cors');

app.use(cors({
  origin:true,
  credentials: true
}));

app.use(express.json());

mongoDB();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api', require('./Routes/CreateUser'));
app.use('/api', require('./Routes/DisplayData'));
app.use('/api', require('./Routes/OrderData'));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
