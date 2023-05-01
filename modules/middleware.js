const jwt = require("jsonwebtoken");
const { api_secret } = require("../config");

const verificarToken = (req, res, next) => {
  const token = req.header("Authorization").split("Bearer ")[1];
  if (!token)
    throw {
      code: 401,
      message: "Debes incluir token en el header",
    };
  const tokenValido = jwt.verify(token, api_secret);
  if (!tokenValido)
    throw {
      code: 401,
      message: "El token no es válido",
    };
  next();
};

module.exports = { verificarToken };
