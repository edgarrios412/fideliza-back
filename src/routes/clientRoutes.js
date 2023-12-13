const {Router} = require("express")
const clientRoutes = Router()

clientRoutes.get("/:id", async (req,res) => {
        res.json("Obtener negocio")
})

module.exports = clientRoutes