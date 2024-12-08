const {Router} = require("express")
const userRoutes = Router()
const {newUser, verifyUser, authUser, putUser, getUsers, deleteUser, newAppointment, sendPushNotificationByUser, sendPushNotificationByNegocio, updateNotications} = require("../controllers/userController")

userRoutes.get("/", async (req,res) => {
    try{
        const users = await getUsers()
        res.json(users)

    }
    catch(error){
        console.log(error)
    }
})

userRoutes.post("/verify", async (req,res) => {
    try{
    const token = await verifyUser(req.body)
    res.json(token)
    }
    catch(error){
        console.log(error)
    }
})

userRoutes.post("/appointment", async (req,res) => {
    try{
    const data = await newAppointment(req.body)
    res.json(data)
    }
    catch(error){
        console.log(error)
    }
})

userRoutes.post("/auth", async (req,res) => {
    try{
    const data = await authUser(req.body)
    res.json(data)
    }
    catch(error){
        res.status(403).json(error.message)
    }
})

userRoutes.post("/", async (req,res) => {
    try{
        const user = await newUser(req.body)
        res.json({users:user})
    }
    catch(error){
        console.log(error)
    }
})

userRoutes.put("/", async (req,res) => {
    try{
    const edit = await putUser(req.body)
    res.json({users:edit})
    }
    catch(error){
        console.log(error)
    }
})

userRoutes.delete("/:id", async (req,res) => {
    try{
    const user = await deleteUser(req.params.id)
    res.json({status:user})
    }
    catch(error){
        console.log(error)
    }
})

userRoutes.post("/admin/sendPushNotificationByUser", async (req,res) => {
    try{
        const response = await sendPushNotificationByUser(req.body)
        res.json(response)
    }
    catch(error){
        console.log(error)
    }
})

userRoutes.post("/admin/sendPushNotificationByNegocio", async (req,res) => {
    try{
        const response = await sendPushNotificationByNegocio(req.body)
        res.json(response)
    }
    catch(error){
        console.log(error)
    }
})

userRoutes.post("/updateNotifications/:userId", async (req,res) => {
    try{
        const response = await updateNotications(req.params.userId)
        res.json(response)
    }
    catch(error){
        console.log(error)
    }
})


module.exports = userRoutes