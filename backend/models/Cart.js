const mongoose = require('mongoose');
const { Schema } = mongoose;
const UserCart = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, // it works like forgien key, link user to their notes table
        ref: 'user2', //this is the schema name were we want to link this current schema
    },
    itemId: {
        type: String, // it works like forgien key, link user to their notes table
        required: true, //this is the schema name were we want to link this current schema
    },
    itemName: {
        type: String,
        required: true,

    },
    itemQuantity: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
});
module.exports = mongoose.model('usercart', UserCart);