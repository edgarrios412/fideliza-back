const {Router} = require("express")
const userRoutes = require("./userRoutes")
const clientRoutes = require("./clientRoutes")
const { isAuthenticated } = require("../helpers/jwt")
const laboratoryRoutes = require("./laboratoryRoutes")
const indexRoutes = Router()

indexRoutes.use("/user", userRoutes)
indexRoutes.use("/laboratory", laboratoryRoutes)
indexRoutes.use("/client",isAuthenticated, clientRoutes)

module.exports = indexRoutes