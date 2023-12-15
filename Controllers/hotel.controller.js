const Arrendar = require('../Models/Arrendar');
const Hotel = require('../Models/Hotel');
const User = require('../Models/User');


const register = async (req, res) => {

    const {name, type, city, adress, desc, price, bano, habitaciones} = req.body;

    if(name == '' || type == '' || city == '' || adress == '' || desc == '' || price <= 0 || bano <=0 || habitaciones <=0){
        return res.status(400).json({
            message: 'Faltan datos'
        })
    }

    const hotel = new Hotel({
        ...req.body,
        photos: req.files.map(file => file.path),

    });

    console.log(hotel);

    try{
        console.log('asdasd');
        await hotel.save();
        res.status(200).json(hotel);
    }catch(e){
        res.status(500).json(e);
    }

}

const update = async (req, res) => {
    
    console.log(req.files);
    try {
        const hotelUpdate = await Hotel.findByIdAndUpdate(req.params.id, { ...req.body,  photos: req.files.map(file => file.path)}, {new : true });
        console.log(hotelUpdate);
        res.status(200).json(hotelUpdate);
    } catch (error) {
        res.status(500).json(error);
    }
}

const deletes = async (req, res) => {
    console.log(req.body);
    try {
         await Hotel.findByIdAndDelete( {_id: req.params.id} );
        res.status(200).json({
            message: 'Deleted'
        });
        
    } catch (error) {
        res.status(500).json(error);
    }
}



const getIdAdmin = async (req, res) => {
    console.log(req.params);
    try {
        const hotels = await Hotel.find({user: req.params.id});
       
        res.status(200).json(hotels);
    } catch (error) {
        res.status(500).json(error);
    }
}


const countCity = async (req, res, next) => {
    const cities = req.query.cities.split(",");
    // console.log(req.query);

    try {
        const list = await Promise.all(cities.map(city => {
            return Hotel.countDocuments({city: city})   
        }))
        return res.status(200).json(list);
    } catch (error) {
        return res.status(500).json({error: error});
    }

}
const countType = async (req, res) => {
    try {
        const houseCount = await Hotel.countDocuments({type: "House"});
        const aparmentCount = await Hotel.countDocuments({type: "Aparment"});
        const villasCount = await Hotel.countDocuments({type: "Others"})

        return res.status(200).json([
            { type: "House", count: houseCount},
            { type: "Aparment", count: aparmentCount},
            { type: "Others", count: villasCount}
        ])        
    } catch (error) {
        return res.status(500).json({error: error});
        
    }
}

const countByIdUser = async (req, res) => {
    try {
        const hotel = await Hotel.countDocuments({user: req.params.id});
        const hotel2 = await Hotel.countDocuments({user: req.params.id, featured: true});
        const count = (hotel2*100)/hotel;
        const count1 = count.toFixed(2);
        res.status(200).json({count: count1,
            total: hotel,
        });
    } catch (error) {
        res.status(500).json(error);
    }
}

const countMoney = async (req, res) => {
    try {
        const ress = await Hotel.find({user: req.params.id});
        const result = ress.map(item => item.price);
        const total = result.reduce((a,b) => a+b, 0);
        res.status(200).json(total);
    } catch (error) {
        res.status(500).json(error);
    }
}
const countMoneyHouse = async (req, res) => {
    try {
        const ress = await Hotel.find({user: req.params.id, featured:false});
        const result = ress.map(item => item.price);
        const total = result.reduce((a,b) => a+b, 0);

        res.status(200).json(total);
    } catch (error) {
        res.status(500).json(error);
    }
}
const getId = async (req, res) => {
    console.log(req.params);
    try {
        const hotels = await Hotel.findOne({_id: req.params.id}).populate('user').exec();
        
        res.status(200).json(hotels);
    } catch (error) {
        res.status(500).json(error);
    }
}
const getAll = async (req, res) => {

    const {min, max, ...other} = req.query;

    try {
        const hotel = await Hotel.find({...other, 
            price: { $gt: min | 0, $lt: max || 200000000000 }
        });
        const arrnedador = await Promise.all(
            hotel.map(async (hotel) => {
                const user = await User.findById({
                    _id: hotel.user
                    
                })
                if (user){
                    const {password, ...others} = user._doc;
                    return {...hotel._doc, user: others}
                }
                return {user };
            })
        );
        
      
        res.status(200).json(arrnedador);
    } catch (error) {
        res.status(500).json(error);
    }
}

const getIdArr = async (req, res) => {
    console.log(req.params.id);

    try {
        const hotels = await Hotel.find({user: req.params.id});
        const arrendatarios = await Promise.all(
            hotels.map(async (hotel) => {
                const arrendar = await Arrendar.findOne({
                    propId: hotel._id
                }).populate("userId").exec();

                if (arrendar) {
                    const {userId, ...others} = arrendar._doc;
                    return {...hotel._doc, arrendar: {
                        ...others,
                        user: userId
                    }}
                }

                return {...hotel._doc, arrendar };
            })
        )
        
        res.status(200).json(arrendatarios);
    } catch (error) {
        res.status(500).json(error);
    }
}



module.exports = {
    register,
    update,
    deletes,
    getId,
    getAll,
    countCity,
    countType,
    countByIdUser,
    countMoney,
    countMoneyHouse,
    getIdArr,
    getIdAdmin
}