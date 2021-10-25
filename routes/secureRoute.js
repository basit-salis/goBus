
const jwt = require('jsonwebtoken');

const routeProtect = (req,res,next) =>{

    const token = req.cookies.jwt;

    if (token){
        jwt.verify( token, 'basit', (err, decondedToken)=>{
            if (err){
                console.log(err);
                res.render('home');
            } 
            else{
                 console.log(decondedToken);
                 next();
            }
           
        });

    }else{
        res.redirect('/');

    }
}

module.exports = routeProtect;