const express = require('express');
const connection = require('../db-connect/db');
const router = express.Router();


//search item
module.exports.get_search = async (req, res) => {

    const querySearch = `SELECT * FROM bus_schedule`;
    connection.query(querySearch, (err, response) => {
        if (err) throw err;
        const data = [...response];
        res.send({
            Data: data
        });

    });
};

module.exports.get_seatsById = async (req, res) => {
    let ID = req.params.id;
    let _ID = ID.substring(1);
    // _ID  here is the trip id
    console.log(_ID);

    const querySeats = `SELECT seat_number FROM BUS_${_ID}_PASSENGER`;
    connection.query(querySeats, (err, response) => {
        if (err) throw err;
        const data = [...response];
        res.send({
            Data: data
        });

    });
};

//signin get handle
module.exports.get_paySlip = async (req, res) => {
    res.render(`paymentSlip`);
};

module.exports.get_paySlipById = async (req, res) => {
    let id = req.params.id;
    const _ID = id.substring(1);
    const busInfo = _ID.split('|');
    let trip_id = busInfo[0];
    let seats_No = busInfo[1];
    // _ID  here is the seats number

    // const queryPayment = `SELECT * FROM BUS_${_ID}_PASSENGER WHERE trip_id = 'qk'`;
    const queryPayment = `SELECT * FROM BUS_SCHEDULE WHERE trip_id = '${trip_id}'
    `;
    connection.query(queryPayment, (err, response) => {
        if (err) throw err;
        const data = [...response];
        res.render(`paymentSlip`, {
            Data: data,
            seats_No
        });

    });
};

module.exports.post_paySlipById = async (req, res) => {
    let id = req.params.id;
    const _ID = id.substring(1);
    console.log(id);
    const {
        from,
        to,
        Date,
        reporting_time,
        departure_time,
        ticket_id,
        passenger_name,
        passenger_address,
        seat_no,
        boarding_point,
        drop_point,
        age,
        passenger_email,
        passenger_phone,
        bus_id

    } = req.body;
    console.log(
        ticket_id,
        passenger_name,
        passenger_address,
        seat_no,
        boarding_point,
        drop_point,
        age,
        passenger_email,
        passenger_phone,
    )
    const query = `INSERT INTO bus_${bus_id}_passenger(ID, NAME, EMAIL, ADDRESS, BOARDING_POINT, DROP_POINT, SEAT_NUMBER, PHONE_NUMBER, AGE) 
    VALUES ('${ticket_id}','${passenger_name}','${passenger_email}','${passenger_address}','${boarding_point}','${drop_point}','${seat_no}','${passenger_phone}','${age}')`;

    connection.query(query, (err, response) => {
        if (err) throw err;
        console.log('inserted');
        res.redirect('/users/company');
    });
};