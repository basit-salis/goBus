require('dotenv').config();
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
// const mysql = require('mysql');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const routeProtect = require('./routes/secureRoute')


const app = express();

// SQL DB CONNECTION
const mydb = require('./db-connect/db');


//view engine ejs
app.use(expressLayouts);
app.set('view engine', 'ejs');

//session
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
}));

//bodyparser
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());

//static dir
app.use('/assets',express.static(__dirname + '/assets'));

// Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/admin', require('./routes/admin'));
app.use('/users/home',routeProtect,(req,res)=>{res.render('home')});
app.use('/users/company',routeProtect,(req,res)=>{res.render('company')});

const PORT = process.env.port || 5000;

app.listen(PORT, () =>{
  console.log(`Server started on ${PORT}`);
});


