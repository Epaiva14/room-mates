const mongoose = require('mongoose');

const shoppingListSchema = new mongoose.Schema({
    item: String,
    quantity: Number,
    roomDetail: { required: true, type: mongoose.Schema.Types.ObjectId, ref: 'RoomDetail' },
    creator: { required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

// create model
const ShoppingList = mongoose.model('ShoppingList', shoppingListSchema);

// export the model to be used
module.exports = ShoppingList;

