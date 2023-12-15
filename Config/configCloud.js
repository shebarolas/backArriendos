const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'doun83yp3',
    api_key: '753294444353945',
    api_secret: '2Itz6X3jXUK0cwOzIgTRdehH5M8'
});

module.exports = cloudinary;