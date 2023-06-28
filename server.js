const express = require("express")
// const dbConfig = require("./app/src/config/dbConfig").getDbConnection()
// dbConfig.getDbConnection()
require("./app/src/config/dbConfig").getDbConnection()

const categoryRoutes = require("./app/src/routes/category.routes")
const productRoutes = require("./app/src/routes/product.routes")
const publicRoutes = require("./app/src/routes/public.routes")

const authMiddleware = require("./app/src/middleware/auth.middleware")
const app = express()

//middleware

app.use(express.urlencoded({
    extended:true
}))
app.use(express.json())

// private

app.use("/admin",authMiddleware,categoryRoutes)
app.use("/admin",authMiddleware,productRoutes)

//public
app.use("/public",publicRoutes)
app.listen(9999)
console.log("server started");