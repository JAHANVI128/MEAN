let users = []

function signup(req,res){
    
    let firstName = req.body.firstName
    let email = req.body.email
    let password = req.body.password

    let user ={
        "firstName":firstName,
        "email":email,
        "password":password
    }

    users.push(user)

    res.json({
        "msg":"SignUp Done",
        "data":user,
        "rcode":200
    })
}

function getAllUsers(req,res){
    res.json({
        "msg":"All Users Ret.",
        "data":users,
        "rcode":200
    })
}

module.exports.getAllUsers = getAllUsers
module.exports.signup = signup