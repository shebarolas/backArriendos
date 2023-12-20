const { agendar, obtenerVisitas, obtenerVisitasPorIdPropiedad } = require('../Controllers/visitas.controller');

const router = require('express').Router();

router.post('/agendar', agendar);
router.get('/obtener/:id', obtenerVisitasPorIdPropiedad);

module.exports = router; 