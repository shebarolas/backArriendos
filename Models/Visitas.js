const {Schema, model} = require('mongoose');

const VisitasSchema = new Schema({
    fecha: {type: Date, required: true},
    idCliente: {type: Schema.Types.ObjectId, ref: "User"},
    idPropiedad: {type: Schema.Types.ObjectId, ref: "Hotel"},
}, {timestamps: true});


module.exports = model('visitas', VisitasSchema);