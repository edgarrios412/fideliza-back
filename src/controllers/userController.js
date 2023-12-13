const {User, Categoria, Procedimientos} = require("../db")
const jwt = require("jsonwebtoken")
const {client} = require("../../whatsapp")

module.exports = {
    newUser: async (data) => {
        const codigo = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
        await User.create({...data, code:codigo})
        client.sendMessage(`57${data.phone}@c.us`, `Tu codigo de Fideliza es ${codigo}`)
        return "Usuario creado"
    },
    verifyUser: async (data) => {
       const user = await User.findAll({
            where:{
                email:data.email,
                password: data.password
            }
        })
        // console.log(user.lenght)
        if(user.length){
            const token = jwt.sign({id:user[0].id, email:user[0].email, comisionado:user[0].comisionado, role:user[0].role,sede:user[0].sede, name:user[0].name,lastname:user[0].lastname, image:user[0].image}, "natalie")
            // console.log(user)
            // console.log(token)
            if(user.length) return {status:true, token:token, user:{id:user[0].id, comisionado:user[0].comisionado, email:user[0].email,sede:user[0].sede, role:user[0].role, name:user[0].name,lastname:user[0].lastname, image:user[0].image}}
        }
        return {status:false}
    },
    authUser: (data) => {
        const res = jwt.verify(data.token,"natalie")
        if(res) return {status:true, user:res}
        return false
    },
    putUser: async (data) => {
        const user = await User.findOne({
            where:{
                phone:data.phone
            }})
        if(user){
            if(data.password) user.password = data.password
            user.save()
            return "Contraseña actualizada"
        }
        return "Contraseña anterior invalida"
    },
    getUsers: async () => {
        const users = await User.findAll()
        return users
    },
    getUserById: async (id) => {
        const user = await User.findOne({where:{id:id}})
        return user
    },
    getUserByPhone: async (phone) => {
        const user = await User.findOne({where:{phone:phone}})
        return user
    },
}