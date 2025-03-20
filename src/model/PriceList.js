const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: String, required: true } 
});

const CategorySchema = new mongoose.Schema({
  category: { type: String, required: true },
  items: [ItemSchema] 
});

const PriceList = mongoose.model('PriceList', CategorySchema);

module.exports = PriceList;
