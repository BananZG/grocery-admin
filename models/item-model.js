const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    imageUrl: String,
    desc: String,
    price: Number,
});

const Item = mongoose.model('item', itemSchema);

module.exports = Item;