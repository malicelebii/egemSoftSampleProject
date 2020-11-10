const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
        type:String,
    },
    img: {
        type:String
    },
    price: {
        type:Number,
    },
    stock: {
        type:Number,
    },
    category: {
        type:String,
    },
    price_history: []
});

module.exports = mongoose.model('Product', productSchema);

