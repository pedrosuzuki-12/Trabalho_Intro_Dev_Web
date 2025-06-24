const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  image: String,
  stockBySize: { P: Number, M: Number, G: Number, GG: Number },
  sold: { type: Number, default: 0 },
  isFeatured: Boolean,
  playerMoments: [{ image: String, text: String }]
});

module.exports = mongoose.model('Product', productSchema);