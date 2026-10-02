const { Router } = require("express");

const SaboresController = require("../controllers/SaboresController");

const router = Router();

router.get("/sabores", SaboresController.obtenerSabores);

module.exports = router;