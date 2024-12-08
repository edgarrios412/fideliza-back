const {Router} = require("express")
const { createNegocio, getNegocios, sendPoints, createProduct, getNegociosByUserPhone, getNegocioById } = require("../controllers/negocioController")
const negocioRoutes = Router()


negocioRoutes.post("/", async (req,res) => {
    try{
    const response = await createNegocio(req.body)
    res.json({msg:response})
    }
    catch(error){
        console.log(error)
    }
})

negocioRoutes.get("/:id", async (req,res) => {
    try{
    const negocios = await getNegocios(req.params.id)
    res.json(negocios)
    }
    catch(error){
        console.log(error)
    }
})

negocioRoutes.get("/byId/:id", async (req,res) => {
    try{
    const negocio = await getNegocioById(req.params.id)
    res.json(negocio)
    }
    catch(error){
        console.log(error)
    }
})

negocioRoutes.get("/byUserPhone/:userPhone", async (req,res) => {
    try{
    const negocios = await getNegociosByUserPhone(req.params.userPhone)
    res.json(negocios)
    }
    catch(error){
        console.log(error.message)
        res.status(400).json(error.message)
    }
})

// negocioRoutes.get("/appointments/:id", async (req,res) => {
//     try{
//     const laboratories = await getAppointments(req.params.id)
//     res.json(laboratories)
//     }
//     catch(error){
//         console.log(error)
//     }
// })

negocioRoutes.post("/sendPoints", async (req,res) => {
    try{
    const response = await sendPoints(req.body)
    res.json(response)
    }
    catch(error){
        console.log(error)
    }
})

negocioRoutes.post("/product", async (req,res) => {
    try{
    const response = await createProduct(req.body)
    res.json(response)
    }
    catch(error){
        console.log(error)
    }
})

module.exports = negocioRoutes