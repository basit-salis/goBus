const express = require('express');
const authController = require('./authController');
const model = require('./model');
const {routeProtect} = require('./secureRoute');
const router = express.Router();

 //signin get router
router.get('/signin',authController.signin_get);

 //signin post router
 router.post('/signin',authController.signin_post);

//signup get handle
router.get("/signup",authController.signup_get);

//signup post handle
router.post("/signup",authController.signup_post);

//recover get handle
router.get("/recovery",authController.recover_get);

// logout get handle
router.get("/signout",authController.signout_get);

// get seats
router.get("/seats",model.get_seats);

router.get("/paymentSlip",(req,res)=>{
    console.log('data2',req);
   res.render('paymentSlip');
});

router.post("/paymentSlip",(req,res)=>{
   res.render('paymentSlip',{data});
});



module.exports = router;