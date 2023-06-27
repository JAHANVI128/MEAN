const CategoryModel = require("../model/categoryModel")

module.exports.addCategory = function(req,res){

    let category = new CategoryModel({
        categoryName:req.body.categoryName
    })

    category.save().then((data) => {
        res.json({
            "msg":"Category Saved",
            "data":data,
            "rcode":200
        })
    }).catch((err) => {
        res.json({
            "msg":"Something Want Wrong",
            "data":err,
            "rcode":-9
        })
    })
}

function getAllCategory(req,res){
    res.json({
        "msg":"Category Ret.",
        "data":categories,
        "rcode":200
    })
}

function deleteCategory(req,res){
    
}