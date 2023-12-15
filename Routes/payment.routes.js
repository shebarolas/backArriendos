const { createSession } = require('../Controllers/payment.controller');

const router = require('express').Router();

router.post('/payment/:id', createSession);

module.exports = router;