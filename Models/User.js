const {Schema, model} = require('mongoose');

const UserSchema = new Schema({

    name: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    }
    ,
    email: { 
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: Number,
        required: true
    }
    ,
    password: {
        type: String,
        required: true
    },
    isAdmin: { type: Boolean, default: false}

}, {timestamps: true});


module.exports = model('User', UserSchema);