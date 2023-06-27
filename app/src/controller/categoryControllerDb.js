const CategoryModel = require("../model/categoryModel")

module.exports.addCategory = function (req, res) {

    console.log(req.body);

    let categoryName = req.body.categoryName

    let category = new CategoryModel({
        "categoryName": categoryName
    });

    category.save();

    res.json({
        "msg": "Category Added",
        "data": category,
        "rcode": 200
    })
}

module.exports.getAllCategory = function (req, res) {

    CategoryModel.find().then((data) => {
        res.json({
            "msg": "Category List",
            "data": data,
            "rcode": 200
        })
    }).catch((err) => {
        res.json({
            "msg": "Something want wrong",
            "data": err,
            "rcode": -9
        })
    })

}