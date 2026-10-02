const { Router } = require("express");

const pedidosController = require("../controllers/PedidosController");

const router = Router();

router.get("/pedidos", pedidosController.obtenerPedidos);
router.post("/pedidos", pedidosController.crearPedido);
router.put("/pedidos/:id", pedidosController.avanzarPedido);

module.exports = router;