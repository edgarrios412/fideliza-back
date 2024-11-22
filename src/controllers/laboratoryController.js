const { Laboratory, Appointment, User, Exam } = require("../db");
const { sendPushNotification } = require("../helpers/sendPushNotification");

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
    const usuario = User.findByPk(data.userId)
    const laboratorio = Laboratory.findByPk(data.laboratoryId)
    const exam = await Exam.create(data);
    sendPushNotification({
      pushToken: usuario.pushToken,
      title: "Resultado de examenes",
      message: `${laboratorio.name} ha emitido los resultados de tus exámenes`,
    });
    return "Examen creado";
  },
};
