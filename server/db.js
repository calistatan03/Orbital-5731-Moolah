// connects the backend to the mongodb database

const mongoose = require('mongoose');

const connection = () => {
  mongoose.connect(process.env.ATLAS_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((error) => {
    console.error('Database connection error:', error);
  });
};

module.exports = connection;
