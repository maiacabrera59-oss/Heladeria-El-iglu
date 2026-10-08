export function crearTarjetaSabor(sabor, seleccionarSabor) {
    const tarjeta = document.createElement("div");

    tarjeta.classList.add("tarjeta-sabor");

    if (!sabor.Disponible) {
        tarjeta.classList.add("no-disponible");
    }

    tarjeta.innerHTML = `
        <h3>${sabor.Nombre}</h3>

        ${sabor.Disponible
            ? `<button type="button">Seleccionar</button>`
            : `<span>No disponible</span>`
        }
    `;

    if (sabor.Disponible) {
        const boton = tarjeta.querySelector("button");

        boton.addEventListener("click", () => {
            seleccionarSabor(sabor);
        });
    }

    return tarjeta;
}