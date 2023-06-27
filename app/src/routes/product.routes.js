const express = require("express")
const productController = require("../controller/productController")
const productControllerDb = require("../controller/productControllerDb")

const route = express.Router()

route.post("/addproduct2",productController.addProduct)
route.get("/product",productController.getAllProducts)
route.get("/product/:productId",productControllerDb.getProductById)
route.delete("/product/:productId",productController.deleteProductById)
route.post("/products/filter",productControllerDb.filterProducts)
route.put("/product",productControllerDb.updateProduct)

module.exports = route