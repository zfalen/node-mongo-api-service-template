const mongoose = require('mongoose');
const { Schema } = mongoose;

// define the schema for our user model
const quotableSchema = Schema({
  quote: { type: String, required: true },
  author: { type: String, required: true },
  source: String,
  context: String,
  interpretation: String,
  theme: { type: String, required: true },
  added: { type: Date, default: Date.now }
});


// create the model and expose it to our app
module.exports = mongoose.model('Quotable', quotableSchema);
