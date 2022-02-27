const mongoose = require('mongoose');
const { Schema } = mongoose;
const CustomerOrders = new Schema({
    customerId: {
        type: String,
        required: true
    },
    customerName: {
        type: String,
        required: false,
        default: 'not available'
    },
    customerItemId: {
        type: String,
        required: true
    },
    customerItemIname: {
        type: String,
        required: true
    },
    customerItemQuantity: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: false,
        default: "wait for review"
    },
    date: {
        type: Date,
        default: Date.now
    },
})
module.exports = mongoose.model('customerOrders', CustomerOrders);