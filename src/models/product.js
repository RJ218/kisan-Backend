var mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        Title:{
            type:String,
            required:[true, "Title is required"],
            index:true
        },
        Photo:{
            type:String,
            required:[true, 'photo link is required'],
            index:true
        },
        Description:{
            type:String,
            required:[true, 'description is required'],
            index:true
        },
        Price:{
            type:String,
            required:['true', 'price is required'],
            index:true
        }
        

    },
    {
        timestamps: true
    }
)


module.exports = new mongoose.model('Product', productSchema);