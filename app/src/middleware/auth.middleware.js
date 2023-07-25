const jwt = require("jsonwebtoken")
const {SEC_KEY} = process.env

module.exports = function(req,res,next){
    console.log("in Auth Middleware");

    let token = req.headers.token

    jwt.verify(token,SEC_KEY,function(err,decoded){
        if(err){
            console.log(err);
            res.json({
                "msg": "Please login before accessing the service",
                "rcode":-9,
                data:""
            })
        }else{
            console.log("Decoded: ",decoded);
            next();
        }
    })

    // token : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoSWQiOiI2NDY4YzkwMmUyZmQ5NjQ3NGIzNjY3NTYiLCJpYXQiOjE2OTAwMjA0NzB9.BIOEHyIE3M-EP5dj3_McV7L3KTjTV44AHAMmmKK2PqI
    
    // if(req.headers.token == undefined || req.headers.token != 123){
    //     console.log("auth : fail")
    //     // res.json({
    //     //     "msg": "Please login before accessing the service",
    //     //     "rcode":-9,
    //     //     data:""
    //     // })
    // }else{
    //     console.log("auth : success")
    //     next(); // go ahead
    // }
}