const saboresService = require("../services/SaboresService");

const obtenerSabores = async (req, res) => {
    const sabores = await saboresService.listarSabores();

    res.json(sabores);
};

module.exports = {
    obtenerSabores
};