const {Schema, model} = require('mongoose');

const RoomslSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    roomNumbers: [{}]

}, {timestamps: true})

module.exports = model("Rooms", RoomslSchema);