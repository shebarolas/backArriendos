const express = require('express');
const router = express.Router();
const imageController = require('../Controllers/images.controller');
const {upload} = require('../Config/multer');

// Ruta para subir una imagen
router.post('/upload', upload.array('image', 3), imageController.subirImagen);
router.get('/get', (req, res) => {
    res.send('Hola');

});

module.exports = router;