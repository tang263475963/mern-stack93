const mongoose = require('mongoose');
const Schema = mongoose.Schema;

productSchema = new Schema({
    name: String,
    price: String,
    stock: String,
    description: String,
    category: String,
    photo: String
})

module.exports = mongoose.model('Product', productSchema);