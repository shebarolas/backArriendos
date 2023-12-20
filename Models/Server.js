const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const {conectionDB} = require('../Database/config');
const hotelRoutes = require('../Routes/hotel.routes');
const userRoutes = require('../Routes/user.routes');
const arrRoutes = require('../Routes/arrendar.routes');
const uploadImg = require('../Routes/images.routes');
const payRoutes = require('../Routes/payment.routes');
const visitasRoutes = require('../Routes/visitas.routes');
const cookieParser = require('cookie-parser');

class Server {
    constructor(){
        this.app = express();
        this.pathHotel = "/api/v1/hotel";
        this.pathUser = "/api/v1/user";
        this.pasthArr = "/api/v1/arrendar";
        this.pathImg = "/api/v1/images";
        this.pathPay = "/api/v1/pay";
        this.pathVisitas = "/api/v1/visitas";
        this.middleware();
        this.routes();
        this.conectDB();
    }
    middleware(){
        this.app.use(cookieParser());
        this.app.use(bodyParser.json());
        this.app.use(cors({
            origin: 'http://localhost:5173',
            method: 'GET, POST, PUT, DELETE',
            credentials: "include"
        }));

    }
    routes(){
        this.app.use(this.pathHotel, hotelRoutes);
        this.app.use(this.pathUser, userRoutes);
        this.app.use(this.pasthArr, arrRoutes);
        this.app.use(this.pathImg, uploadImg);
        this.app.use(this.pathPay, payRoutes );
        this.app.use(this.pathVisitas, visitasRoutes);

    }

    async conectDB(){
        await conectionDB();
    }

    listen(){
        this.app.listen(9000, () => {
            console.log('listening on port 9000');
        });
    }
}

module.exports = Server;