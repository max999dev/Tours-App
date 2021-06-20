const express = require('express');
const viewController = require('../controllers/viewsController');

const router = express.Router();

// router.get('/', viewController.getAll);

router.get('/', viewController.getOverview);

router.get('/hotel', viewController.getHotel);

module.exports = router;
