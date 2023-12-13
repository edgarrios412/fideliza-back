const app = require("./src/app")
const {conn} = require("./src/db")
const {client} = require("./whatsapp")

client.initialize();

conn.sync({force:true}).then(() => {
    app.listen(process.env.PORT, () => {
        console.log("Servidor en linea en el puerto 3002")
    })
}, (error) => console.log(error))