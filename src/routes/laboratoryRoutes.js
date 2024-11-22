const {Router} = require("express")
const { createLaboratory, getLaboratories, getAppointments } = require("../controllers/laboratoryController")
const laboratoryRoutes = Router()


laboratoryRoutes.post("/", async (req,res) => {
    try{
    const response = await createLaboratory(req.body)
    res.json({msg:response})
    }
    catch(error){
        console.log(error)
    }
})

laboratoryRoutes.get("/", async (req,res) => {
    try{
    const laboratories = await getLaboratories()
    res.json(laboratories)
    }
    catch(error){
        console.log(error)
    }
})

laboratoryRoutes.get("/appointments/:id", async (req,res) => {
    try{
    const laboratories = await getAppointments(req.params.id)
    res.json(laboratories)
    }
    catch(error){
        console.log(error)
    }
})

laboratoryRoutes.get("/sendExam", async (req,res) => {
    try{
    const laboratories = await getAppointments(req.body)
    res.json(laboratories)
    }
    catch(error){
        console.log(error)
    }
})

module.exports = laboratoryRoutes