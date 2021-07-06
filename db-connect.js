// Here we are stablishing the connection with the database using mongoose and exporting 
// the module so it can be used by nodemon 

const mongoose = require("mongoose");
const db = mongoose.connect(process.env.DB, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

module.exports = db;