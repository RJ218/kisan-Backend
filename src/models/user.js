var mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        Email:{
            type:String,
            required:[true, "Email is required"],
            index:true
        },
        Password:{
            type:String,
            required:[true, 'Password is required'],
            index:true
        },
        Token:{
            type:String,
            required:[true, 'token is required'],
            index:true
        },
        PhoneNo:{
            type:String,
            required:[true, 'phone no is required'],
            index:true
        }

    },
    {
        timestamps: true
    }
)


module.exports = new mongoose.model('User', userSchema);