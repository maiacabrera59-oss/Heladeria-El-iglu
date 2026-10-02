const { getConnection } = require("../config/db");
const sql = require("mssql");

async function listarPedidos() {
    const pool = await getConnection();

    const resultado = await pool.request()
        .execute("usp_ListarPedidos");

    return resultado.recordset;
}

async function crearPedido(cliente, tamanio, sabores) {
    const pool = await getConnection();

    const saboresTexto = sabores.join(",");

    const resultado = await pool.request()
        .input("Cliente", sql.NVarChar(80), cliente)
        .input("Tamanio", sql.NVarChar(10), tamanio)
        .input("Sabores", sql.NVarChar(50), saboresTexto)
        .output("IdPedido", sql.Int)
        .execute("usp_CrearPedido");

    return {
        idPedido: resultado.output.IdPedido
    };
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