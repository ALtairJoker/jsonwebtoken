const {
  agregarUsuarioBD,
  loginBD,
  obtenerUsuarioLogueadoBD,
} = require("./consultas_usuarios");

const agregarUsuario = async (email, password, rol, lenguage) => {
  if (email != "" && password != "" && rol != "" && lenguage != "") {
    try {
      await agregarUsuarioBD(email, password, rol, lenguage);
    } catch (error) {
      return false;
    }
  } else {
    return false;
  }
  return true;
};

const login = async (email, password) => {
  if (email != "" && password != "") {
    try {
      const resultado = await loginBD(email, password);
      if (!resultado) {
        return false;
      }
    } catch (error) {
      return false;
    }
  } else {
    return false;
  }
  return true;
};

const obtenerUsuarioLogueado = async (email) => {
  const resultado = await obtenerUsuarioLogueadoBD(email);
  return resultado;
};

module.exports = { agregarUsuario, login, obtenerUsuarioLogueado };
