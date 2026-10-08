import { crearTarjetaSabor } from "./componentes/tarjetaSabor.js";
import { mostrarResumenPedido } from "./componentes/resumenPedido.js";
import { crearFilaPedido } from "./componentes/filaPedido.js";

const API_URL = "http://localhost:3000/api";

const formPedido = document.getElementById("formPedido");
const clienteInput = document.getElementById("cliente");
const tamanioSelect = document.getElementById("tamanio");

const contenedorSabores = document.getElementById("contenedorSabores");
const resumenPedido = document.getElementById("resumenPedido");
const listaPedidos = document.getElementById("listaPedidos");
const mensaje = document.getElementById("mensaje");

let sabores = [];
let saboresSeleccionados = [];


async function cargarSabores() {
    try {
        const respuesta = await fetch(`${API_URL}/sabores`);

        if (!respuesta.ok) {
            throw new Error("No se pudieron cargar los sabores.");
        }

        sabores = await respuesta.json();

        contenedorSabores.innerHTML = "";

        sabores.forEach(sabor => {
            const tarjeta = crearTarjetaSabor(
                sabor,
                seleccionarSabor
            );

            contenedorSabores.appendChild(tarjeta);
        });

    } catch (error) {
        mostrarMensaje(error.message, "error");
    }
}


function seleccionarSabor(sabor) {

    const yaSeleccionado = saboresSeleccionados.some(
        seleccionado => seleccionado.IdSabor === sabor.IdSabor
    );

    if (yaSeleccionado) {
        return;
    }

    if (saboresSeleccionados.length >= 3) {
        mostrarMensaje(
            "Podés seleccionar como máximo 3 sabores.",
            "error"
        );

        return;
    }

    saboresSeleccionados.push(sabor);

    actualizarResumen();

    mostrarMensaje(
        `Se agregó ${sabor.Nombre}.`,
        "exito"
    );
}


function actualizarResumen() {
    mostrarResumenPedido(
        resumenPedido,
        clienteInput.value,
        tamanioSelect.value,
        saboresSeleccionados
    );
}


async function crearPedido(evento) {
    evento.preventDefault();

    if (saboresSeleccionados.length < 1) {
        mostrarMensaje(
            "Debés seleccionar al menos un sabor.",
            "error"
        );

        return;
    }

    try {

        const datos = {
            cliente: clienteInput.value.trim(),
            tamanio: tamanioSelect.value,
            sabores: saboresSeleccionados.map(
                sabor => sabor.IdSabor
            )
        };

        const respuesta = await fetch(`${API_URL}/pedidos`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(datos)
        });

        const resultado = await respuesta.json();

        if (!respuesta.ok) {
            throw new Error(resultado.mensaje);
        }

        mostrarMensaje(
            `Pedido #${resultado.idPedido} creado correctamente.`,
            "exito"
        );

        formPedido.reset();

        saboresSeleccionados = [];

        actualizarResumen();

        await cargarPedidos();

    } catch (error) {
        mostrarMensaje(error.message, "error");
    }
}


async function cargarPedidos() {
    try {

        const respuesta = await fetch(`${API_URL}/pedidos`);

        if (!respuesta.ok) {
            throw new Error("No se pudieron cargar los pedidos.");
        }

        const pedidos = await respuesta.json();

        listaPedidos.innerHTML = "";

        pedidos.forEach(pedido => {

            const fila = crearFilaPedido(
                pedido,
                avanzarPedido
            );

            listaPedidos.appendChild(fila);
        });

    } catch (error) {
        mostrarMensaje(error.message, "error");
    }
}


async function avanzarPedido(idPedido) {
    try {

        const respuesta = await fetch(
            `${API_URL}/pedidos/${idPedido}/avanzar`,
            {
                method: "PUT"
            }
        );

        const resultado = await respuesta.json();

        if (!respuesta.ok) {
            throw new Error(resultado.mensaje);
        }

        mostrarMensaje(
            "Estado del pedido actualizado.",
            "exito"
        );

        await cargarPedidos();

    } catch (error) {
        mostrarMensaje(error.message, "error");
    }
}


function mostrarMensaje(texto, tipo) {

    mensaje.textContent = texto;
    mensaje.className = tipo;

    setTimeout(() => {
        mensaje.textContent = "";
        mensaje.className = "";
    }, 3000);
}


clienteInput.addEventListener(
    "input",
    actualizarResumen
);

tamanioSelect.addEventListener(
    "change",
    actualizarResumen
);

formPedido.addEventListener(
    "submit",
    crearPedido
);


cargarSabores();
cargarPedidos();