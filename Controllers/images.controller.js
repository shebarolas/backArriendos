// Controlador para subir una imagen a Cloudinary
const subirImagen = (req, res) => {
    console.log(req);
    try {
        return res.status(200).json({ message: 'Imagen subida a Cloudinary', file: req.files});
      } catch (error) {
        return res.status(500).json({ message: 'Error al subir la imagen a Cloudinary', error: error });
      }
}

module.exports = {
    subirImagen
}
