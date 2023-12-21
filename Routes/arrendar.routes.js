const { agendar, datosUser, obtenerCasa } = require('../Controllers/arrendar.controller');
const { verifyToken, verifyAdmin } = require('../Utils/validateJWT');

const router = require('express').Router();


router.post('/agendar', verifyToken, agendar);
router.get('/getArrendatarios/:id', verifyAdmin, datosUser);
router.get('/obtenerArriendos/:id', verifyToken, obtenerCasa);

module.exports = router;