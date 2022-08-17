const { Router } = require('express');
const router = Router();

// Controllers
const rideController = require('./controllers/rideController');
const insightController = require('./controllers/insightController');

// CRUD Routes
router.get('/', rideController.home);
router.get('/rides/:rideId', rideController.findOne);
router.get('/rides', rideController.findAllRides);
router.get('/visitors/:visitorId', rideController.findByVisitor);

router.post('/rides', rideController.addNewRide); // event and visitor id necessary in body request
router.put('/rides/:rideId', rideController.editRide); // eventName and/or visitorId necessary in body request
router.delete('/rides/:rideId', rideController.deleteRide); // eventName and/or visitorId necessary in body request

// Insights routes
router.get('/insights/visitor', insightController.groupByVisitor);
router.get('/insights/event', insightController.groupByEvent);
router.get('/insights/popular', insightController.getPopularEvents);
router.get('/insights/:year/:month', insightController.getVisitsPerYearAndMonth);

module.exports = router;