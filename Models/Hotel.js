const {Schema, model} = require('mongoose');

const HotelSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    tipo: {
        type: String,
        required: true
    },
    ciudad: {
        type: String,
        required: true
    },
    direccion: {
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
    valor: {
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
    visible: {
        type: Boolean,
        default: false
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }

})

module.exports = model("Hotel", HotelSchema);