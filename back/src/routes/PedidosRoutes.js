const { Router } = require("express");

const PedidosController = require("../controllers/PedidosController");
const asyncHandler = require("../middlewares/AsyncHandler");

const router = Router();

router.get("/pedidos", asyncHandler(PedidosController.obtenerPedidos));

router.post("/pedidos", asyncHandler(PedidosController.crearPedido));

router.put(
    "/pedidos/:id/avanzar",
    asyncHandler(PedidosController.avanzarPedido)
);

module.exports = router;