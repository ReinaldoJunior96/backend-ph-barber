const express = require("express");
const cors = require("cors");

require('dotenv').config();
const app = express();



app.use(cors());
app.use(express.json());

const conn = require('./db/conn.js');

conn().then(() => {
  console.log("Conectado ao banco de dados com sucesso");
}).catch((err) => {
  console.error("Erro ao conectar ao banco de dados:", err);
});

const routes = require('./routes/router');
app.use("/api", routes);

app.listen(9876, () => {
  console.log('Servidor online!! na porta 9876');
});

//apenas para testar
//module.exports = app;
