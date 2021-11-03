const mongoose = require('mongoose');
const { Schema } = mongoose;
const StoreSchema = new Schema({
    itemName: {
        type: String,
        required: true
            // type: mongoose.Schema.Types.ObjectId, // it works like forgien key, link user to their notes table
            // ref: 'user', //this is the schema name were we want to link this current schema
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
module.exports = mongoose.model('storeItems', StoreSchema);