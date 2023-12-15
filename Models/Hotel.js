const {Schema, model} = require('mongoose');

const HotelSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    adress: {
        type: String,
        required: true
    },
    photos: {
        type: [String],
    },
    desc: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    bano:{
        type: Number,
        required: true
    },
    habitaciones:{
        type: Number,
        required: true
    },
    featured: {
        type: Boolean,
        default: false
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }

})

module.exports = model("Hotel", HotelSchema);