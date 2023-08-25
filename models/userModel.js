const mongoose = require('mongoose')
const validator = require('validator')

const UserSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"A user must have a name"]
    },
    email:{
        type:String,
        required:[true,"Email is Required"],
        unique:true,
        lowercase:true,
        validate:[validator.isEmail,'Please Provide a Valid Email !']
    },
    password:{
        type: String,
        required: [true, 'A strong Password Is a Must'],
        minlength:8,
        select:false
    },
    confirmPassword:{
        type: String,
        required: [true, 'Please Confirm the Password'],
        //This validator will only work on SAVE and CERATE and that is why we will need to update the user Using the save method
        validate:{
            validator:function(el){
                return el===this.password;
            },
            message:"Passwords are Not the Same !"
        },
        select:false
    },
    role:{
        type: String,
        enum: ['buyer','seller'],
        default: 'buyer',
        select:false
    }
})

const User = mongoose.model('User',UserSchema);

module.exports = User