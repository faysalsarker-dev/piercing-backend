const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  name: { type: String, required: false },
  price: { type: String, required: false },
  link: { type: String, required: false } 
});

const CategorySchema = new mongoose.Schema({
  category: { type: String, required: true },
  items: [ItemSchema] 
});

const PriceList = mongoose.model('PriceList', CategorySchema);

module.exports = PriceList;
