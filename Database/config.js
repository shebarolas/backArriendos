const mongoose = require('mongoose');

const conectionDB  = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("connect to database");
    } catch (error) {
        console.log(error);
    }
}
module.exports = {
    conectionDB
}