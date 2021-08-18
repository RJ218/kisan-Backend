var mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
    {
        ProductId:{
            type:mongoose.Types.ObjectId,
            ref:'Product'
        },
        UserId:{
            type:mongoose.Types.ObjectId,
            ref:'User'
        }
    },
    {
        timestamps: true
    }
)


module.exports = new mongoose.model('Order', orderSchema);