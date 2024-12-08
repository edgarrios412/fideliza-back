const { User, Notification, Negocio, UserNegocioPoints } = require("../db");
const jwt = require("jsonwebtoken");
const { createToken, decodeToken } = require("../helpers/jwt");
const {
  encryptPassword,
  verifyPassword,
} = require("../helpers/encryptPassword");
const { sendPushNotification } = require("../helpers/sendPushNotification");

module.exports = {
  newUser: async (data) => {
    const user = await User.findOne({ where: { phone: data.phone } });
    if (user) {
      passwordEncripted = encryptPassword(data.password);
      user.name = data.name;
      user.lastname = data.lastname;
      user.code = data.code;
      user.password = passwordEncripted;
      user.save();
      return "Usuario editado";
    }
    passwordEncripted = encryptPassword(data.password);
    await User.create({ ...data, password: passwordEncripted });
    return "Usuario creado";
  },
  authUser: async (data) => {
    const user = await User.findOne({
      where: {
        phone: data.phone,
      },
      include: [
        { model: Notification, include: [{ model: Negocio }] },
        { model: Negocio, through: ["puntos"] },
      ],
    });
    if (!user) throw new Error("El usuario no existe");
    if (!verifyPassword(data.password, user.password))
      throw new Error("Las credenciales no son correctas");
    user.pushToken = data.pushToken;
    user.save();
    const totalPoints = await UserNegocioPoints.sum("puntos", {
      where: { userId: user.id },
    });
    const token = createToken({ id: user.id });
    return { user, totalPoints, token };
  },
  verifyUser: async (data) => {
    const token = await decodeToken(data.token);
    if (token.message) return { valid: false, message: token.message };
    const user = await User.findByPk(token.id, {
      include: [
        { model: Notification, include: [{ model: Negocio }] },
        { model: Negocio, through: ["puntos"] },
      ],
    });
    const totalPoints = await UserNegocioPoints.sum("puntos", {
      where: { userId: user.id },
    });
    console.log(token);
    return { valid: true, user, totalPoints };
  },
  putUser: async (data) => {
    let user;
    if (data.newpass) {
      user = await User.findOne({
        where: {
          id: data.id,
          password: data.oldpass,
        },
      });
    } else {
      user = await User.findOne({
        where: {
          id: data.id,
          // password:data.oldpass
        },
      });
    }
    if (user) {
      user.password = data.newpass;
      user.image = data.image;
      user.save();
      return "Contraseña actualizada";
    }
    return "Contraseña anterior invalida";
  },
  getUsers: async () => {
    const users = await User.findAll();
    return users;
  },
  deleteUser: async (id) => {
    const user = await User.findOne({ where: { id: id } });
    await user.destroy();
    return "Usuario eliminado";
  },
  sendPushNotificationByUser: async (data) => {
    if (data.userId == null) {
      const usuarios = await User.findAll();
      let exitoso = 0;
      let error = 0;
      for (let i = 0; i < usuarios.length; i++) {
        // Si está cerca enviar una push notification para avisar
        if (usuarios[i].pushToken) {
          exitoso++;
          sendPushNotification({
            pushToken: usuarios[i].pushToken,
            title: data.title,
            message: data.message,
          });
        } else error++;
      }
      return { exitoso, error };
    } else {
      const usuario = await User.findByPk(data.userId);
      if (usuario.pushToken) {
        sendPushNotification({
          pushToken: usuario.pushToken,
          title: data.title,
          message: data.message,
        });
        return "Notificación enviada exitosamente";
      } else return "Usuario sin push token";
    }
  },
  sendPushNotificationByNegocio: async (data) => {
    const usuariosEnNegocio = await UserNegocioPoints.findAll({
      where: {
        negocioId: data.negocioId,
      },
    });
    const usuarios = [];
    for (let i = 0; i < usuariosEnNegocio.length; i++) {
      const usuario = await User.findByPk(usuariosEnNegocio[i].userId);
      usuarios.push(usuario);
    }
    let exitoso = 0;
    let error = 0;
    for (let i = 0; i < usuarios.length; i++) {
      if (usuarios[i].pushToken) {
        exitoso++;
        sendPushNotification({
          pushToken: usuarios[i].pushToken,
          title: data.title,
          message: data.message,
        });
      } else error++;
    }
    return { exitoso, error };
  },
  updateNotications: async (userId) => {{
    const notificaciones = await Notification.findAll({
      where:{
        userId: userId
      }
    })
    for(let i = 0; i < notificaciones.length; i++){
      notificaciones[i].see = true
      notificaciones[i].save()
    }
  }}
};
