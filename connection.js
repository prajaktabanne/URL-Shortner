const mongoose = require("mongoose");

const connectToMongoBD = (url) => {
  return mongoose.connect(url);
};

module.exports = connectToMongoBD;
