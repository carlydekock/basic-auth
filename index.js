'use strict';

require('dotenv').config();

const server = require('./src/server.js');
const mongoose = require('mongoose');
const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;

//connecting to running mongo db
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
}).then(() => {
  server.start(PORT);
});

