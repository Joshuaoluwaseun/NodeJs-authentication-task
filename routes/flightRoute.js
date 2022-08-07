const express = require('express');

const router = express.Router();
const controller = require('../controllers/flightControlers');

router.get('/', controller.getFlight)

    .get('/:id', controller.getOneFlight)

    .post('/', controller.postFlight)

    .put('/:id', controller.updateFlight)

    .delete('/:id', controller.deleteFlight)

module.exports = router;

