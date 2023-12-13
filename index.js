const app = require("./src/app")
const {conn} = require("./src/db")

conn.sync({force:true}).then(() => {
    app.listen(3002, () => {
        console.log("Servidor en linea en el puerto 3002")
    })
}, (error) => console.log(error))