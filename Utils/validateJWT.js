const { request } = require('express');
const jwt = require('jsonwebtoken');

const verifyToken = (req = request, res, next) => {
    const bearer = req.headers.authorization;
    console.log(bearer);
    if (!bearer) return res.status(401).json({message: 'You are not authenticated'})

    const token = bearer.split(' ')[1];
    if(!token){
        return res.status(401).json({message: 'You are not authenticated'});
    }
    console.log(token); 
    jwt.verify(token, process.env.JWT, (err, user) => {
        if(err){
            return res.status(403).json({message: 'Invalid token'});
        }
        req.user = user;
        next();
    });

}

const verifyUser = (req = request, res, next) => {
    
    verifyToken(req, res, () => {
        console.log(req.user)
        if(req.user.id === req.params.id || req.user.isAdmin){
            next();
        }else{
            return res.status(403).json({message: 'You are not authorized!'});
        }
    });
}

const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        console.log(req.user)
        if(req.user.isAdmin){
            next();
        }else{
            return res.status(403).json({message: 'You are not admin'});
        }
    });
}

module.exports = {
    verifyToken,
    verifyUser,
    verifyAdmin
}