const { agendar, datosUser } = require('../Controllers/arrendar.controller');
const { verifyToken, verifyAdmin } = require('../Utils/validateJWT');

const router = require('express').Router();


router.post('/agendar', verifyToken, agendar);
router.get('/getArrendatarios/:id', verifyAdmin, datosUser);

module.exports = router;