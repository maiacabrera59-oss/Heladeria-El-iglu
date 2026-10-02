const { Router } = require("express");

const SaboresController = require("../controllers/SaboresController");
const asyncHandler = require("../middlewares/AsyncHandler");

const router = Router();

router.get("/sabores", asyncHandler(SaboresController.obtenerSabores));

module.exports = router;