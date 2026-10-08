export function crearFilaPedido(pedido, avanzarPedido) {

    const fila = document.createElement("div");

    fila.classList.add("fila-pedido");

    fila.innerHTML = `
        <div>
            <strong>Pedido #${pedido.IdPedido}</strong>
            <p>Cliente: ${pedido.Cliente}</p>
            <p>Tamaño: ${pedido.Tamanio}</p>
            <p>Estado: <strong>${pedido.Estado}</strong></p>
            <p>Precio: $${Number(pedido.PrecioTotal).toLocaleString("es-AR")}</p>
        </div>

        ${pedido.Estado !== "Retirado"
            ? `<button type="button">Avanzar estado</button>`
            : `<span class="retirado">Retirado</span>`
        }
    `;

    if (pedido.Estado !== "Retirado") {

        const boton = fila.querySelector("button");

        boton.addEventListener("click", () => {
            avanzarPedido(pedido.IdPedido);
        });

    }

    return fila;
}