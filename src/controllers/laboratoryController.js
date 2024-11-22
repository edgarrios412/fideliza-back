const { Laboratory, Appointment, User, Exam } = require("../db");

module.exports = {
  createLaboratory: async (data) => {
    await Laboratory.create(data);
    return "Laboratorio creado";
  },
  getLaboratories: async () => {
    const data = await Laboratory.findAll();
    return data;
  },
  getAppointments: async (id) => {
    const data = await Appointment.findAll({
      where: {
        laboratoryId: id,
      },
      include: [{ model: User }],
    });
    return data;
  },
  newExam: async (data) => {
    console.log(data)
    const exam = await Exam.create(data);
    return "Examen creado";
  },
};
