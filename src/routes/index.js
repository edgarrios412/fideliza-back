const {Router} = require("express")
const userRoutes = require("./userRoutes")
const clientRoutes = require("./clientRoutes")
const { isAuthenticated } = require("../helpers/jwt")
const negocioRoutes = require("./negocioRoutes")
const noticeRoutes = require("./noticeRoutes")
const indexRoutes = Router()

indexRoutes.use("/user", userRoutes)
indexRoutes.use("/negocio", negocioRoutes)
indexRoutes.use("/notice", noticeRoutes)
indexRoutes.use("/client",isAuthenticated, clientRoutes)

module.exports = indexRoutes