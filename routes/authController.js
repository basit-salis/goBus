const connection = require("../db-connect/db");
const bcrypt = require("bcrypt");
const passport = require('passport');
const {routeProtect} = require('./secureRoute');
const jwt = require('jsonwebtoken');
const { isEmail} = require("validator");

//handle error
const handleError = (errors) => {
     errors.map(err => {
        return err;
    //      handledError.push(err);
    });
};

// creating jwt
const createToken = (id) =>{
    let maxAge = 60 * 60 * 24 *2;
    return jwt.sign({id},'basit',{
        expiresIn: maxAge
    });
};


//signin get handle
module.exports.signin_get = async (req, res) => {
    res.render('signin');
};
//signup get handle
module.exports.signup_get = (req, res) => {
    res.render('signup');
};
//recovery get handle
module.exports.recover_get = (req, res) => {
    res.render('recovery');
};
//signin post handle
module.exports.signin_post = async (req, res) => {
   
    console.log('req::', req.body);
    const {
        password,
        email
    } = req.body;
    try {  
        var error = []; 
        if (email && password ){
            let sql = `SELECT * FROM USER WHERE EMAIL = '${email}'`;
            connection.query(sql, async(err,result)=>{
                if (err) throw err;
                if(result.length === 0){
                    error.push({message:'user does not exit'});
                    console.log(error);
                    res.render('signin',{error});
                }
                else{
                    let dbPass = result[0].PASSWORD;
                    let compare =  await bcrypt.compare(password,dbPass);
                    console.log('promise',compare);
                    if (compare){
                        console.log('success');
                        const _id = result[0].ID;
                        //create cookie
                        const token = createToken(_id);
                        res.cookie('jwt', token,{httpOnly: true, maxAge : 3 * 60 * 60 * 1000});

                        res.redirect('home');
                    }else{ 
                        error.push({message:'invalid password'});
                        console.log(error)
                        res.render('signin',{error});
                    }}
                })
            }
            else{
                res.render('signin');
            }
        } 
        catch (error) {
        res.send('error from catch');
    }
    finally{
        // let error = errors[0];
        console.log('done');
    }
    }

const validate = (username, mail, pass, repass) => {
    let errors = [];
    if (!username || !mail || !pass || !repass) {
        errors.push({
            message: 'fields cannot be empty'
        });
    } else {
        if (!isEmail(mail)) {
            errors.push({
                message: 'email format not correct'
            })
        }
        if (pass.length < 6) {
            errors.push({
                message: 'password cannot be less than 6'
            });
        }
        if (pass !== repass) {
            errors.push({
                message: 'passwords does not match'
            });
        }
    }
    return (errors);
}

//signup post handle
module.exports.signup_post = async (req, res) => {

    const {
        username,
        mail,
        pass,
        repass
    } = req.body;
    const hash = await bcrypt.hash(pass, 10);
    //check whether username and email exist in db before insertion;
    let email_In_DB = `SELECT * FROM USER WHERE EMAIL = '${mail}' AND USERNAME = '${username}'`;
    connection.query(email_In_DB, (err, result) => {
// console.log(result)
        if (err) throw err;
        if (result.length > 0) {
            console.log('email exist in db');
            let error = [{message: 'email already exist'}]
            res.render('signup', {error});
        } else {
            let error = validate(username, mail, pass, repass);
            // console.log('error',error);
            try {
                if (error.length == 0) {
                    let date = new Date();
                    console.log('time',date.getTime())
                    //hash signup password and inserting user data into db;
                    let sql = `INSERT INTO USER(USERNAME, EMAIL, PASSWORD) VALUES ('${username}','${mail}','${hash}')`;
                    connection.query(sql, err => {
                        if (err) throw err;
                        console.log("query inserted");                       
                    });

                    //get id to create token 
                    let tokenID = `SELECT * FROM USER WHERE EMAIL = '${mail}'`;
                    connection.query(tokenID, (err,result) =>{
                        if (err) throw err;
                       const _id = result[0].ID;
                       console.log(_id);
                       const token = createToken(_id);
                       res.cookie('jwt', token, {httpOnly : true, maxAge: 3 * 60 * 60 * 1000});
                       res.render('signin',{error});

                    });
                } else {
                    console.log(error);
                    let errr =  error[0];
                    res.render('signup', {error});
                }


            } finally {
                console.log('done');
            
            }

        }


    });


}

module.exports.signout_get = (req,res) =>{
    console.log('jwt removed');
    res.cookie('jwt','',{maxAge:1});
    res.redirect('/');
}

