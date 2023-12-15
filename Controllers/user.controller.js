const User = require("../Models/User")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res, next) => {
    const {name, lastname, email, phone, password, isAdmin} = req.body;
    
    if(!name || !lastname || !email || !phone || !password){
        return res.status(400).json({message: 'Please enter all fields'});
    }

    const emailExist = await User.findOne({email: email});

    if(emailExist){
        return res.status(500).json({message: "Email already exists"});
    }else{
        try {
            const newUser = new User({
                name,
                lastname,
                email,
                phone,
                password,
                isAdmin

            });
            const salt = bcrypt.genSaltSync();
            newUser.password = bcrypt.hashSync(password, salt);    
            await newUser.save();
            return res.status(200).json({message: "User Create"});
        } catch (error) {
            return res.status(500).json(error);
        }
    }

   
}

const login = async(req, res) => {

    const {email, password} = req.body;

    if(!email || !password){
        return res.status(400).json({message: 'Please enter all fields'});
    }

    const emailExists = await User.findOne({email});


    if(emailExists){
        const passOk = bcrypt.compareSync(password, emailExists.password);
        if(passOk){
            const token = jwt.sign({
                id: emailExists._id, isAdmin: emailExists.isAdmin
            }, process.env.JWT);

            const {password,...other} = emailExists._doc;
            return res.status(200).json({
                access_token: token,
                user: {...other}
            }); 
        }else{
            return res.status(401).json({message: 'Password is incorrect or usermane'});
            
        }
    }else{
        return res.status(401).json({message: 'Email does not exist'});
    }

}

const getSession = async (req, res) => {
    try {
        const bearer = req.headers.authorization;
        const token = bearer.split(' ')[1];
        if(!token){
            return res.status(401).json({message: 'You are not authenticated'});
        }
    
        const {id, isAdmin} = jwt.verify(token, process.env.JWT);
    
        const user = await User.findById({_id: id});
    
        return res.status(200).json(user);
    } catch (error) {
        return res.status(400).json({message: error});
    }
  

}

const update = async(req, res) => {
    try {
        const user = await User.findOnefindByIdAndUpdate(req.params.id, { $set: req.body}, {new : true });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json(error);
    }
}
const updateToken = async(req, res) => {
    console.log(req.params.id);
    console.log("hola");

    try {
        const user = await User.findByIdAndUpdate(req.params.id, { isAdmin: true}, {new : true });
        const token = jwt.sign({
            id: user._id, isAdmin: user.isAdmin
        }, process.env.JWT);

        const {password,...other} = user._doc;
        return res.status(200).json({
            access_token: token,
            users: {...other}
        });
    } catch (error) {
        res.status(500).json(error);
    }
}

const deletes = async(req, res) => {
    try {
        await User.findByIdAndDelete( req.params.id );
        res.status(200).json({
            message: 'Deleted'
        });
        
    } catch (error) {
        res.status(500).json(error);
    }
}
const getId = async(req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json(error);
    }
}
const getAll = async(req, res) => {
    try {
        const user = await User.find();
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json(error);
    }

}

module.exports = {
    register,
    login,
    update,
    deletes,
    getId,
    getAll,
    getSession,
    updateToken
}