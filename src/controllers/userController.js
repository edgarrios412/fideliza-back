const { User } = require("../db");
const jwt = require("jsonwebtoken");
const { createToken, decodeToken } = require("../helpers/jwt");
const {
  encryptPassword,
  verifyPassword,
} = require("../helpers/encryptPassword");

module.exports = {
  newUser: async (data) => {
    passwordEncripted = encryptPassword(data.password);
    await User.create({ ...data, password: passwordEncripted });
    return "Usuario creado";
  },
  authUser: async (data) => {
    const user = await User.findOne({
      where: {
        email: data.email
      },
    });
    if (!user) throw new Error("El usuario no existe");
    if (!verifyPassword(data.password, user.password))
      throw new Error("Las credenciales no son correctas");
    user.pushToken = data.pushToken
    user.save()
    const token = createToken({ id: user.id });
    return {user, token};
  },
  verifyUser: async(data) => {
    const token = await decodeToken(data.token)
    console.log(token)
    return token
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
};
