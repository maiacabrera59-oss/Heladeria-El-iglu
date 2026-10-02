const pedidosService = require("../services/PedidosService");

const obtenerPedidos = async (req, res) => {
    const pedidos = await pedidosService.listarPedidos();

    res.json(pedidos);
};

const crearPedido = async (req, res) => {
    const { tamaño, sabores } = req.body;

    const pedido = await pedidosService.crearPedido(tamaño, sabores);

    res.status(201).json(pedido);
};

const avanzarPedido = async (req, res) => {
    const { id } = req.params;

    const pedido = await pedidosService.avanzarPedido(id);

    res.json(pedido);
};

module.exports = {
    obtenerPedidos,
    crearPedido,
    avanzarPedido
};