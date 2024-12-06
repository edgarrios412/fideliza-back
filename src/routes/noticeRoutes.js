const {Router} = require("express")
const { getNotices, updateNotice, createNotice } = require("../controllers/noticeController")
const noticeRoutes = Router()

noticeRoutes.post("/", async (req,res) => {
    try{
    const response = await createNotice(req.body)
    res.json(response)
    }
    catch(error){
        console.log(error)
    }
})

noticeRoutes.get("/", async (req,res) => {
    try{
    const response = await getNotices()
    res.json(response)
    }
    catch(error){
        console.log(error)
    }
})

noticeRoutes.put("/", async (req,res) => {
    try{
    const response = await updateNotice(req.body)
    res.json(response)
    }
    catch(error){
        console.log(error)
    }
})

module.exports = noticeRoutes