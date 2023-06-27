const express = require("express")
// const dbConfig = require("./app/src/config/dbConfig").getDbConnection()
// dbConfig.getDbConnection()
require("./app/src/config/dbConfig").getDbConnection()

const categoryRoutes = require("./app/src/routes/category.routes")
const productRoutes = require("./app/src/routes/product.routes")

const app = express()

app.use("/admin",categoryRoutes)
app.use("/admin",productRoutes)

app.listen(9999)
console.log("server started");