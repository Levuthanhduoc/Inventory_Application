const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CustomerSchema =new Schema({
    cart:{ type: Schema.Types.ObjectId,ref:"Meat"},
    createdAt: { type: Date, expires: 3600000, default: Date.now },
})

module.exports = mongoose.model("Customer",CustomerSchema);