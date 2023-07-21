const jwt = require("jsonwebtoken")
const {SEC_KEY} = process.env

module.exports = function(req,res,next){
    console.log("in Auth Middleware");

    jwt.verify(req.headers.token,SEC_KEY,function(err,decoded){
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