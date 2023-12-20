const { agendar, obtenerVisitas, obtenerVisitasPorIdPropiedad, obtenerVisitasPorIdCliente } = require('../Controllers/visitas.controller');

const router = require('express').Router();

router.post('/agendar', agendar);
router.get('/obtener/:id', obtenerVisitasPorIdPropiedad);
router.get('/obtenerIdCliente/:id', obtenerVisitasPorIdCliente);

module.exports = router; 