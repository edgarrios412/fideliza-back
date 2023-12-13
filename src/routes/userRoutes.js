const {Router} = require("express")
const userRoutes = Router()
const {newUser, verifyUser, authUser, putUser, getUsers, getUserById} = require("../controllers/userController")

userRoutes.get("/", async (req,res) => {
    try{
        const users = await getUsers()
        res.json(users)
    }
    catch(error){
        console.log(error)
    }
})

userRoutes.get("/id/:id", async (req,res) => {
    try{
        const users = await getUserById(req.params.id)
        res.json(users)
    }
    catch(error){
        console.log(error)
    }
})

userRoutes.post("/verify", async (req,res) => {
    try{
    const {status,user,token} = await verifyUser(req.body)
    res.json({status:status,user:user, token:token})
    }
    catch(error){
        console.log(error)
    }
})

userRoutes.post("/auth", (req,res) => {
    try{
    const {status, user} = authUser(req.body)
    res.json({status:status, user:user})
    }
    catch(error){
        console.log(error)
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

module.exports = userRoutes