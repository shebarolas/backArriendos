const {Schema, model} = require('mongoose');

const UsersSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: { 
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: { type: Boolean, default: false},
    prop: {
        type: Schema.Types.ObjectId,
        ref: 'prop'
    }

}, {timestamps: true});


module.exports = model('users', UsersSchema);