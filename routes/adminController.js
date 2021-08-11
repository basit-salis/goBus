const express = require('express');
const router = express.Router();
const {
    routeProtect
} = require('./secureRoute');
const connection = require("../db-connect/db");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const Chart = require('chart.js');

// creating jwt
const createToken = (id) => {
    let maxAge = 60 * 60 * 24 * 2;
    return jwt.sign({
        id
    }, 'basit', {
        expiresIn: maxAge
    });
};

module.exports.get_AdminSetting = async (req, res) => {
        res.render('partials/admin-settings');
};
module.exports.get_AdminProfile = async (req, res) => {
        res.render('partials/admin-profile');
};
module.exports.get_AdminMessage = async (req, res) => {
        res.render('message');
};
module.exports.get_BookingDdetails = async (req, res) => {
        console.log(req.body);
        res.render('partials/booking-details');
};
module.exports.get_Report = async (req, res) => {
        res.render('partials/report');
};
module.exports.get_Dashboard = async (req, res) => {
        
        // update bus table
        const updateBus = () => {
            const fetchBus = `SELECT * FROM BUS_schedule`;
            connection.query(fetchBus, (err, response) => {
                if (err) throw err;
                const data = [...response];
                res.render('admin-dashboard',{ DATA: data});
            });
        };
        updateBus();
};
module.exports.get_NewMessage = async (req, res) => {
        console.log('dashboard get', req.body);
        res.render('partials/message-new');
};
module.exports.get_SentMessage = async (req, res) => {
        console.log('dashboard get', req.body);
        res.render('partials/message-sent');
};  
module.exports.get_InboxMessage = async (req, res) => {
        console.log('dashboard get', req.body);
        res.render('partials/message-inbox');
};
module.exports.get_Buses = async (req, res) => {
        // update bus table
        const updateBus = () => {
            const fetchBus = `SELECT * FROM BUS`;
            connection.query(fetchBus, (err, response) => {
                if (err) throw err;
                const data = JSON.stringify(response)
                res.render('partials/buses', {
                    Data: data
                });

            });
        };
        updateBus();

};
module.exports.post_Buses = async (req, res) => {
        console.log(req.body);
        const {
            bus__type,
            registration_number,
            plate_number,
            number_of_seats
        } = req.body;
        const insertNewBus = `INSERT INTO BUS (plate_number,bus_type,reg_number,number_of_seats)
    VALUES('${plate_number}','${bus__type}','${registration_number}','${number_of_seats}')`;
        connection.query(insertNewBus, (err, result) => {
            if (err) throw err;
            console.log('inserted new bus');
            updateBus();
        });
        const updateBus = () => {
            const fetchBus = `SELECT * FROM BUS`;
            connection.query(fetchBus, (err, response) => {
                if (err) throw err;
                const data = JSON.stringify(response);
                console.log('fetched', data);
                res.render('partials/buses', {
                    Data: data
                });

            });
        };


};
module.exports.get_BusesById = async (req, res) => {
        let busID = req.params.id;
    busID = busID.substring(1);
    // delete bus from database
    deleteItem('BUS','bus_id', busID);
    res.redirect('/admin/buses');
};
// delete item from database
const deleteItem = (table, db_column, comaparing_item) => {
    const msg = [];

    let delQuery = `DELETE FROM ${table} WHERE ${db_column} ="${comaparing_item}"`;
    connection.query(delQuery, (err, response) => {
        if (err) throw err;
        msg.push({
            message: 'bus deleted'
        });

    });

      // delete schedule bus from DB
      let deleteScheduleDB = `DROP TABLE BUS_${comaparing_item}_PASSENGER`;
      connection.query(deleteScheduleDB,(err,response)=>{
          if (err) throw err;
          console.log(`bus ${comaparing_item} deleted from DB`);
  
      });
};
module.exports.get_Schedule = async (req, res) => {
    console.log(req.body);

    // update bus table
    const updateBus = () => {
        let updateBusQuery = `SELECT * FROM BUS_SCHEDULE`;
        connection.query(updateBusQuery, (err, response) => {
            if (err) throw err;
            let busData = [...response];
            // console.log('from back', busData)
            res.render('partials/schedule', {
                DATA: busData
            });

        });
    };
    updateBus();

};
module.exports.get_Bus = async (req, res) => {
    res.render('partials/bus');
};
module.exports.get_scheduleById = async (req, res) => {
    let schedule_id = req.params.id;
    schedule_id =  schedule_id.substring(1);
    console.log('sch',schedule_id);
    // delete schedule bus 
    deleteItem('bus_schedule','trip_id',schedule_id);
  
    res.redirect('/admin/schedule');
};
module.exports.post_scheduleById = async (req, res) => {
    const trip = req.body.userID;
    // req.params.id = trip;
    let msg = [];

       // adding bus
       const addBus = () => {
        const {
            bus__type,
            bus__plate,
            bus__RegNumber,
            bus__NumSeats,
            bus__startPoint,
            bus__startTime,
            bus__dropPoint,
            bus__dropTime,
            bus__travelDate
        } = req.body;
        let trip_id = Math.random().toString(36).replace(/[^a-z]+/g,'').substr(2,10);
        // console.log(trip_id);
        var error = [];
        try {
            let sqlQuery = `INSERT INTO bus_schedule (trip_id,type, plate_number, RegNum, NumberSeats, start_point, start_time, drop_point, drop_time,travel_date)
        VALUES ('${trip_id}','${bus__type}','${bus__plate}',
        '${bus__RegNumber}','${bus__NumSeats}',
        '${bus__startPoint}','${bus__startTime}',
        '${bus__dropPoint}','${bus__dropTime}',
        '${bus__travelDate}')`;

            connection.query(sqlQuery, (err, response) => {
                if (err) throw err;
                console.log('inserted');
                
            });
            //create passenger table for a bus
            let createPassengerTable = `CREATE TABLE BUS_${trip_id}_PASSENGER
                (
                    ID INT(100) AUTO_INCREMENT  PRIMARY KEY,
                    NAME VARCHAR(100),
                    EMAIL VARCHAR(100),
                    ADDRESS VARCHAR(100),
                    BOARDING_POINT VARCHAR(100),
                    DROP_POINT VARCHAR(100),
                    SEAT_NUMBER VARCHAR(100),
                    PHONE_NUMBER VARCHAR(100),
                    AGE INT(10)
                    )`;
                connection.query(createPassengerTable,( err, response)=>{
                    if (err) throw err;
                    console.log('table created');
                    updateDOM();

                });


        } catch (error) {
            console.log({
                error
            });

            // res.render('admin-dashboard');
        }
    }
    // update bus at client side
    const updateDOM = () => {
        let updateBusQuery = `SELECT * FROM BUS_SCHEDULE`;
        connection.query(updateBusQuery, (err, response) => {
            res.redirect('/admin/schedule');
        });
    };

    // delete bus from database
    const deleteBus = () => {
        let delQuery = `DELETE FROM BUS_SCHEDULE WHERE trip_id = ${trip}`;
        connection.query(delQuery, (err, response) => {
            if (err) throw err;
            msg.push({
                message: 'bus deleted'
            });
            updateDOM();


        });
    };
    // check action to perform on bus
    if (trip) {
        deleteBus();
    } else {
        addBus();

    }


};
module.exports.get_AdminSignin = async (req, res) => {
    res.render('admin');
};
module.exports.post_AdminSignin = async (req, res) => {
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

};
module.exports.get_Logout = async (req, res) => {
    console.log('jwt removed');
    res.cookie('admin', '', {
        maxAge: 1
    });
    res.redirect('admin_signin');
};
