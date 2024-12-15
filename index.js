const { default: axios } = require("axios")
const app = require("./src/app")
const {conn} = require("./src/db")
const cron = require("node-cron")

cron.schedule("*/10 * * * *", async () => {
    console.log("Pasaron 10 minutos")
    await axios.get("https://startback.onrender.com")
    // console.log("Peticiones realizadas")
})

conn.sync({alter:true}).then(() => {
    console.log("Conectado a la base de datos")
    app.listen(3001, () => {
        console.log("Servidor en linea en el puerto 3001")
    })
})