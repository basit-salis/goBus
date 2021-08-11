const express = require('express');
const  connection = require('../db-connect/db');
const router = express.Router();


//search item
module.exports.get_search = async (req, res) => {
 
    const querySearch = `SELECT * FROM bus_schedule`;
    connection.query(querySearch, (err,response )=>{
        if (err) throw err;
        const data =[...response];
        res.send({Data: data});

    });
};

module.exports.get_seatsById = async (req, res) => {
    let ID =  req.params.id;
    let _ID =  ID.substring(1);
    console.log(_ID);

    const querySeats = `SELECT seat_number FROM BUS_${_ID}_PASSENGER`;
    connection.query(querySeats, (err,response )=>{
        if (err) throw err;
        const data =[...response];
        res.send(
            {
                Data: data
        });

    });
};

//signin get handle
module.exports.get_paySlip= async (req, res) => {
    res.render(`paymentSlip`);
};

module.exports.get_paySlipById = async (req, res) => {
    let seatNum = req.params.id;
    seat = seatNum.substring(1);
    const queryPayment = `SELECT * FROM BUS_${_ID}_PASSENGER WHERE trip_id = 'qk'`;
    connection.query(queryPayment, (err,response )=>{
        if (err) throw err;
        const data =[...response];
        res.render(`paymentSlip`,{ 
            Data: data,
            seat 
        });

    });
};
