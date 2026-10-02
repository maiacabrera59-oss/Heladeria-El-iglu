const express = require("express");
const cors = require("cors");

const logger = require("./middlewares/Logger");
const { manejadorErrores, rutaNoEncontrada } = require("./middlewares/Errores");
const saboresRoutes = require("./routes/SaboresRoutes");
const pedidosRoutes = require("./routes/PedidosRoutes");


const app = express();

app.use(cors());
app.use(express.json());
app.use(logger);

app.get("/", (req, res) => {
    res.send("API Heladeria funcionando");
});

app.use("/api", saboresRoutes);
app.use("/api", pedidosRoutes);
app.use(rutaNoEncontrada);
app.use(manejadorErrores);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
    console.log("Logs en: back/logs/acceso.log y back/logs/errores.log");
});