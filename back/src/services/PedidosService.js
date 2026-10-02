const { getConnection } = require("../config/db");

async function listarPedidos() {
    const pool = await getConnection();

    const resultado = await pool.request()
        .execute("usp_ListarPedidos");

    return resultado.recordset;
}

async function crearPedido(tamaño, sabores) {
    const pool = await getConnection();

    const saboresTexto = sabores.join(",");

    const resultado = await pool.request()
        .input("Tamaño", tamaño)
        .input("Sabores", saboresTexto)
        .execute("usp_CrearPedido");

    return resultado.recordset;
}

async function avanzarPedido(idPedido) {
    const pool = await getConnection();

    const resultado = await pool.request()
        .input("IdPedido", idPedido)
        .execute("usp_AvanzarPedido");

    return resultado.recordset;
}

module.exports = {
    listarPedidos,
    crearPedido,
    avanzarPedido
};