const express = require('express');
const adminController = require('./adminController');
const {routeProtect} = require('./secureRoute');
const router = express.Router();

router.get('/admin-settings',adminController.get_AdminSetting);

router.get('/admin-profile',adminController.get_AdminProfile);

router.get('/message',adminController.get_AdminMessage);

router.get('/booking-details',adminController.get_BookingDdetails);

router.get('/report',adminController.get_Report);

router.get('/admin-dashboard',adminController.get_Dashboard);

router.get('/message-new',adminController.get_NewMessage);

router.get('/message-sent',adminController.get_SentMessage);

router.get('/message-inbox',adminController.get_InboxMessage);

router.get('/buses',adminController.get_Buses);

router.post('/buses',adminController.post_Buses);

router.get('/buses/:id',adminController.get_BusesById);

router.get('/schedule',adminController.get_Schedule);

router.get('/passengerBookings/:id',adminController.get_passengerBookingsById);

router.get('/editPassenger/:edit',adminController.edit_passenger);

router.get('/schedule/:id',adminController.get_scheduleById);

router.post('/schedule/:name/:id',adminController.edit_scheduleById);

router.post('/schedule/:id',adminController.post_scheduleById);

router.get('/admin_signin',adminController.get_AdminSignin);

router.post('/admin_signin',adminController.post_AdminSignin);

router.get('/out',adminController.get_Logout);




module.exports = router;
