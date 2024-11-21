const {Laboratory} = require("../db")

module.exports = {
    createLaboratory: async (data) => {
        await Laboratory.create(data)
        return "Laboratorio creado"
    },
    getLaboratories: async () => {
        const data = await Laboratory.findAll()
        return data
    },
}