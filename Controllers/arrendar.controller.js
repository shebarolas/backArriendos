const Arrendar = require('../Models/Arrendar');
const Hotel = require('../Models/Hotel');
const User = require('../Models/User');

const agendar = async (req, res) => {
   const {userId, id} = req.body;

   const existArr = await Arrendar.findOne({userId, propId: id});

   if(existArr){
     return res.status(400).json({msg: "Ha arrendado la propiedad"});
   }else{
    
    const existHotel = await Hotel.findOne({
        _id: id,
        featured: false
    });
    if(existHotel){
        return res.status(400).json({msg: "La propiedad esta arrendada"});
    }

    const arrendar = new Arrendar({
        userId,
        propId: id,
    });
    await arrendar.save();
    await Hotel.findByIdAndUpdate({_id: id}, {featured: false});
    return res.status(200).json({msg: "Propiedad arrendada", arr: arrendar});

    }
}

const datosUser = async (req, res) => {
    const {id} = req.params;
    console.log(id);
    
    const hotel = await Hotel.findOne({
        user: id
    });
    const {userId} = await Arrendar.findOne({
        propId: hotel._id
    });
    const user = await User.findById({
        _id: userId
    });
    console.log(user);
}

module.exports = {
    agendar,
    datosUser
}