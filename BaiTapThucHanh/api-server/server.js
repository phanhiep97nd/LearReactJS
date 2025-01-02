// filepath: /e:/LearnReactJS/GitCaNhan/LearReactJS/BaiTapThucHanh/api-server/app.js
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const port = 5000;

const app = express();

app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(cors());

const itemRoutes = require('./routes/itemRoutes');
app.use('/car_info', itemRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});