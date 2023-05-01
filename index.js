const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { api_secret, api_token_expired_time } = require("./config");
const {
  agregarUsuario,
  login,
  obtenerUsuarioLogueado,
} = require("./modules/controlador_usuarios");
const { verificarToken } = require("./modules/middleware");

const app = express();
app.listen(3000, console.log("server arriba"));

app.use(cors());
app.use(express.json());

app.post("/usuarios", async (req, res) => {
  const { email, password, rol, lenguage } = req.body;
  const result = agregarUsuario(email, password, rol, lenguage);
  if (result) {
    res.status(200).send("usuario agregado con exito");
  } else {
    res.status(500).send("ocurrio un error");
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const resultado = await login(email, password);
    if (resultado) {
      const token = jwt.sign({ email }, api_secret, {
        expiresIn: api_token_expired_time,
      });
      res.send(token);
    } else {
      res.status(500).send("ocurrio un error");
    }
  } catch (error) {
    res.status(error.code || 500).send(error.message || "ocurrio un error");
  }
});

app.get("/usuarios", verificarToken, async (req, res) => {
  try {
    const token = req.header("Authorization").split("Bearer ")[1];
    const { email } = jwt.decode(token);
    // llamada a base de datos
    const resultado = await obtenerUsuarioLogueado(email);
    res.json(resultado);
  } catch (error) {
    console.log(error);
    res.status(error.code || 500).send(error.message || "ocurrio un error");
  }
});
