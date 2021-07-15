const express = require('express');
const router = express.Router();
const connection = require("../db-connect/db");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const Chart = require('chart.js')

// creating jwt
const createToken = (id) => {
    let maxAge = 60 * 60 * 24 * 2;
    return jwt.sign({
        id
    }, 'basit', {
        expiresIn: maxAge
    });
};

// nav item rendering
router.get('/admin-settings', (req, res) => {
    res.render('partials/admin-settings');
});

router.get('/admin-profile', (req, res) => {
    res.render('partials/admin-profile');
});

// admin sidenav item rendering

router.get('/message', (req, res) => {
    res.render('message');
});


router.get('/booking-details', (req, res) => {
    console.log(req.body);
    res.render('partials/booking-details')
});
router.get('/report', (req, res) => {
    res.render('partials/report')
});
router.get('/settings', (req, res) => {
    res.render('partials/settings')
});

router.get('/admin-dashboard', (req, res) => {
    console.log('dashboard get', req.body);
    res.render('admin-dashboard');
});

router.get('/message-new', (req, res) => {
    console.log('dashboard get', req.body);
    res.render('partials/message-new');
});
router.get('/message-sent', (req, res) => {
    console.log('dashboard get', req.body);
    res.render('partials/message-sent');
});
router.get('/message-inbox', (req, res) => {
    console.log('dashboard get', req.body);
    res.render('partials/message-inbox');
});


// add new bus
router.get('/buses', (req, res) => {
             // update bus at client side
     const updateDOM = ()=>{
        let updateBusQuery = `SELECT * FROM BUS`;
         connection.query(updateBusQuery, (err, response) => {
            if (err) throw err;
         let busData = [...response];
            console.log('from back',busData)
            res.render('partials/buses',{DATA:  busData});

                });
            };
        updateDOM();
});

router.post('/buses', (req, res) => {
    console.log('from buses', req.body);
    const {
        bus__type,
        bus__calo,
        bus__RegNumber,
        bus__NumSeats,
        bus__startPoint,
        bus__startTime,
        bus__dropPoint,
        bus__dropTime,
        bus__travelDate
    } = req.body;
    let trip_id = Math.random() * 10;
    console.log(trip_id);

    var error = [];
    try {
        let sqlQuery = `INSERT INTO BUS (trip_id,type, Cnumber, RegNum, NumberSeats, start_point, start_time, drop_point, drop_time,travel_date)
        VALUES ('${trip_id}','${bus__type}','${bus__calo}',
        '${bus__RegNumber}','${bus__NumSeats}',
        '${bus__startPoint}','${bus__startTime}',
        '${bus__dropPoint}','${bus__dropTime}',
        '${bus__travelDate}')`;

        connection.query(sqlQuery, (err, response) => {
            if (err) throw err;
            console.log('inserted');  
             
        });
                // update bus at client side
     const updateDOM = ()=>{
        let updateBusQuery = `SELECT * FROM BUS`;
         connection.query(updateBusQuery, (err, response) => {
            if (err) throw err;
        //  let busData = [...response];
            // console.log('from back',busData)
            res.redirect('admin-dashboard');

                });
            };
        updateDOM();
      
    } catch (error) {
        console.log({
            error
        });
        console.log('dashboard post', req.body);
        // res.render('admin-dashboard');
    }

});
router.post('/admin-dashboard', (req, res) => {

});

// admin signin
router.get('/admin_signin', (req, res) => {
    res.render('admin');
});

router.post('/admin_signin', async (req, res) => {
    const {
        password,
        username
    } = req.body;
    try {
        const hash = await bcrypt.hash(password, 10);
        var error = [];
        if (password && username) {
            let sql = `SELECT * FROM ADMIN WHERE  USERNAME = '${username}'`;
            connection.query(sql, async (err, response) => {
                if (err) throw err;
                if (response.length != 1) {
                    error.push({
                        message: 'user does not exist'
                    });
                    console.log(error);
                    res.render('admin');
                } else {
                    let adminPassword = response[0].password;
                    let compare = await bcrypt.compare(password, adminPassword);
                    if (compare) {
                        let _id = response[0].id;
                        const token = createToken(_id);
                        res.cookie('admin', token, {
                            httpOnly: true,
                            maxAge: 3 * 60 * 60 * 1000
                        });
                        console.log('success');
                        res.redirect('admin-dashboard');

                    } else {
                        error.push({
                            message: 'incorrect password'
                        });
                        console.log(error);
                        res.render('admin');
                    }


                }
            });
        }
    } catch (error) {
        console.log('user not found');

    }

});

router.get('/out', (req, res) => {
    console.log('jwt removed');
    res.cookie('admin', '', {
        maxAge: 1
    });
    res.redirect('admin_signin');
});

module.exports = router;