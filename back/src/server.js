const express = require("express");
const cors = require("cors");

const saboresRoutes = require("./routes/SaboresRoutes");
const pedidosRoutes = require("./routes/PedidosRoutes");


const app = express();

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
    res.send("API Heladeria funcionando");
});

app.use("/api", saboresRoutes);
app.use("/api", pedidosRoutes);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor funcionando en http://localhost:${PORT}`);
});