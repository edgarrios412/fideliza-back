const { Sequelize } = require("sequelize");
const {
  Negocio,
  UserNegocioPoints,
  User,
  Product,
  Notification,
} = require("../db");
const { sendPushNotification } = require("../helpers/sendPushNotification");

// const usuario = User.findByPk(data.userId)
// sendPushNotification({
//   pushToken: usuario.pushToken,
//   title: "Resultado de examenes",
//   message: `${laboratorio.name} ha emitido los resultados de tus exámenes`,
// });
module.exports = {
  createNegocio: async (data) => {
    await Negocio.create(data);
    // TAREA: Calcular la distancia del negocio con las de los usuarios
    const usuarios = await User.findAll();
    for (let i = 0; i < usuarios.length; i++) {
      // Si está cerca enviar una push notification para avisar
      //IF: Está cerca y tiene push notification (usuarios[i].pushToken)
      if (usuarios[i].pushToken) {
        sendPushNotification({
          pushToken: usuarios[i].pushToken,
          title: "Nuevo negocio cerca",
          message: `${data.name} se ha registrado y está cerca de donde tú estás!`,
        });
      }
    }
    return "Negocio creado";
  },
  createProduct: async (data) => {
    await Product.create(data);
    return "Producto creado";
  },
  getNegocios: async (userId) => {
    console.log(userId);
    if (userId > 0) {
      // Consulta con userId para ordenar los negocios por puntos del usuario
      const compras = await User.findByPk(userId, {
        include: [
          {
            model: Negocio,
            through: ["puntos"],
            include: [{ model: Product }],
          },
        ],
        attributes: [],
      });
      const negocios = await Negocio.findAll({ include: [{ model: Product }] });
      const negociosMap = new Map(compras.negocios.map((n) => [n.id, n]));
      negocios.forEach((negocio) => {
        if (!negociosMap.has(negocio.id)) {
          negociosMap.set(negocio.id, negocio);
        }
      });

      // Convertimos el mapa a un array de negocios
      const negociosUnicos = Array.from(negociosMap.values());

      const negociosOrdenados = negociosUnicos.sort((a, b) => {
        // Si uno de los negocios no tiene 'userNegocioPoints', tratamos los puntos como 0
        const puntosA = a.userNegocioPoints ? a.userNegocioPoints.puntos : 0;
        const puntosB = b.userNegocioPoints ? b.userNegocioPoints.puntos : 0;

        return puntosB - puntosA; // Orden descendente
      });

      return negociosOrdenados;
    } else {
      const data = await Negocio.findAll({ include: [{ model: Product }] });
      return data;
    }
  },
  getUserNegocio: async (negocioId) => {
      const usuariosEnNegocio = await UserNegocioPoints.findAll({
        where: {
          negocioId: negocioId,
        },
      });
      const usuarios = [];
      for (let i = 0; i < usuariosEnNegocio.length; i++) {
        const usuario = await User.findByPk(usuariosEnNegocio[i].userId);
        usuarios.push(usuario);
      }
      return usuarios
  },
  editImgNegocio: async (data) => {
    const negocio = await Negocio.findByPk(data.negocioId)
    negocio.image = data.url;
    negocio.save()
    return "Exitoso"
  },
  getNegocioById: async (id) => {
    const negocio = await Negocio.findByPk(id,{ include: [{ model: Product }] })
    return negocio
  },
  getNegociosByUserPhone: async (userPhone) => {
    const usuario = await User.findOne({
      where:{
        phone:userPhone
      }
    })
    if(!usuario) throw new Error("Usuario no encontrado")
    const compras = await User.findByPk(usuario.id, {
      include: [
        {
          model: Negocio,
          through: ["puntos"],
          include: [{ model: Product }],
        },
      ],
      attributes: [],
    });
    const negocios = await Negocio.findAll({ include: [{ model: Product }] });
    const negociosMap = new Map(compras.negocios.map((n) => [n.id, n]));
    negocios.forEach((negocio) => {
      if (!negociosMap.has(negocio.id)) {
        negociosMap.set(negocio.id, negocio);
      }
    });

    // Convertimos el mapa a un array de negocios
    const negociosUnicos = Array.from(negociosMap.values());

    const negociosOrdenados = negociosUnicos.sort((a, b) => {
      // Si uno de los negocios no tiene 'userNegocioPoints', tratamos los puntos como 0
      const puntosA = a.userNegocioPoints ? a.userNegocioPoints.puntos : 0;
      const puntosB = b.userNegocioPoints ? b.userNegocioPoints.puntos : 0;

      return puntosB - puntosA; // Orden descendente
    });

    return negociosOrdenados;
  },
  sendPoints: async (data) => {
    let user;
    user = await User.findOne({ where: { phone: data.phone } });
    if (!user) {
      user = await User.create({ phone: data.phone });
    }
    console.log(user.id);
    const puntos = await UserNegocioPoints.findOne({
      where: {
        userId: user.id,
        negocioId: data.negocioId,
      },
    });
    const negocio = await Negocio.findByPk(data.negocioId);
    if (!puntos) {
      await Notification.create({
        type: "notification",
        title: "Has recibido puntos",
        message: `${negocio.name} te ha enviado ${data.puntos} puntos por tu compra`,
        userId: user.id,
        negocioId: data.negocioId,
      });

      if (user.pushToken) {
        sendPushNotification({
          pushToken: user.pushToken,
          title: "Has recibido puntos",
          message: `${negocio.name} te ha enviado ${data.puntos} puntos por tu compra`,
        });
      }
      await UserNegocioPoints.create({ ...data, userId: user.id });
      return "Registro creado";
    }

    const nuevosPuntos = puntos.puntos + data.puntos;
    puntos.puntos = nuevosPuntos;
    puntos.save();
    await Notification.create({
      type: "notification",
      title: "Has recibido puntos",
      message: `${negocio.name} te ha enviado ${data.puntos} puntos por tu compra, tu nuevo saldo es ${nuevosPuntos} puntos`,
      userId: user.id,
      negocioId: data.negocioId,
    });

    if (user.pushToken) {
      sendPushNotification({
        pushToken: user.pushToken,
        title: "Has recibido puntos",
        message: `${negocio.name} te ha enviado ${data.puntos} puntos por tu compra, tu nuevo saldo es ${nuevosPuntos} puntos`,
      });
    }

    return nuevosPuntos;
  },
};
