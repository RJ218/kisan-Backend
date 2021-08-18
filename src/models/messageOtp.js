var mongoose = require('mongoose');

const messageOtpSchema = new mongoose.Schema(
    {
        Otp:{
            type:String,
            required:[true, "Title is required"],
            index:true
        },
        UserPhoneNo:{
            type:String,
            required:[true, "Title is required"],
            index:true
        }
    },
    {
        timestamps: true
    }
)


module.exports = new mongoose.model('MessageOtpSchema', messageOtpSchema);