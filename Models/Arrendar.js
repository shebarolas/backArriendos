const {Schema, model} = require('mongoose');

const ArrendarSchema = new Schema({

    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    propId: { 
        type: Schema.Types.ObjectId,
        ref: "Hotel"
    }

}, {timestamps: true});


module.exports = model('arrendar', ArrendarSchema);