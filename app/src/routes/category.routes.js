const express = require("express")
const categoryController = require("../controller/categoryController")
const categoryControllerDb = require("../controller/categoryControllerDb")
const router = express.Router()

router.post("/addcategory",categoryController.addCategory)
router.post("/getallcategory",categoryControllerDb.getAllCategory)

module.exports = router