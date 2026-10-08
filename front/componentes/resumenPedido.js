export function mostrarResumenPedido(contenedor, cliente, tamanio, sabores) {

    if (!tamanio && sabores.length === 0) {
        contenedor.innerHTML = "";
        return;
    }

    const precios = {
        Cuarto: 9800,
        Medio: 17800,
        Kilo: 30500
    };

    const precio = precios[tamanio] || 0;

    contenedor.innerHTML = `
        <div class="resumen">
            <h3>Resumen del pedido</h3>

            <p><strong>Cliente:</strong> ${cliente || "Sin indicar"}</p>

            <p><strong>Tamaño:</strong> ${tamanio || "Sin seleccionar"}</p>

            <p><strong>Sabores:</strong> ${sabores.length > 0
            ? sabores.map(sabor => sabor.Nombre).join(", ")
            : "Ninguno"
        }</p>

            <p><strong>Total:</strong> $${precio.toLocaleString("es-AR")}</p>
        </div>
    `;
}