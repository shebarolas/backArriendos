const cloudinary = require('./configCloud'); // Importa la configuración de Cloudinary
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Configura el storage de Multer con Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'images', // Opcional - puedes cambiar el nombre de la carpeta
    format: async (req, file) => 'jpeg', // Opcional - define el formato de archivo permitido
    public_id: (req, file) => file.originalname// Opcional - define el nombre del archivo en Cloudinary
  }
});
const upload = multer({ storage: storage });

module.exports = {
    upload
}
