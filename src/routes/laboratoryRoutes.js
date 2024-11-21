const {Router} = require("express")
const { createLaboratory, getLaboratories } = require("../controllers/laboratoryController")
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

module.exports = laboratoryRoutes