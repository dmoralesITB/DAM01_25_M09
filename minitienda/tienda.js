// 1. Convertimos el JSON a Array
const productos = JSON.parse(productosJSON);

function init() {
    generarCatalogo();
}

// 2. Generar el catálogo (estilo bucle for)
function generarCatalogo() {
    const contenedor = document.getElementById("contenedor-productos");
    let cardsHTML = "";

    for (let i = 0; i < productos.length; i++) {
        let prod = productos[i];

        // Generar opciones de tallas
        let opcionesTallas = "";
        for (let j = 0; j < prod.tallas.length; j++) {
            opcionesTallas += `<option value="${prod.tallas[j]}">${prod.tallas[j]}</option>`;
        }

        // Construcción de la Card
        cardsHTML += `
            <article class="card">
                <img src="${Object.values(prod.imagenes)[0]}" alt="${prod.nombre}" class="card-imagen">
                <div class="card-contenido">
                    <h4 class="m04">${prod.nombre}</h4>
                    <p>${prod.descripcion}</p>
                    
                    <div class="lista-ejercicios">
                        <h5>Talla:</h5>
                        <select id="talla-${prod.id}" class="selector-tienda">
                            ${opcionesTallas}
                        </select>
                        
                        <h5>Cantidad:</h5>
                        <select id="cantidad-${prod.id}" class="selector-tienda" 
                                onchange="actualizarPrecioBoton('${prod.id}', ${prod.precioBase})">
                            <option value="1">1 unidad</option>
                            <option value="2">2 unidades</option>
                            <option value="3">3 unidades</option>
                            <option value="4">4 unidades</option>
                            <option value="5">5 unidades</option>
                        </select>
                    </div>

                    <a href="#" id="btn-${prod.id}" class="boton" onclick="agregarAlTicket('${prod.id}', '${prod.nombre}', ${prod.precioBase})">
                        Agregar (€${prod.precioBase.toFixed(2)})
                    </a>
                </div>
            </article>
        `;
    }
    contenedor.innerHTML = cardsHTML;
}

// 3. FUNCIÓN NUEVA: Actualiza el texto del botón en tiempo real
function actualizarPrecioBoton(id, precioBase) {
    const cantidad = document.getElementById(`cantidad-${id}`).value;
    const boton = document.getElementById(`btn-${id}`);
    const nuevoTotal = (precioBase * cantidad).toFixed(2);

    // Cambiamos el texto del botón para que el usuario vea el precio antes de clickar
    boton.textContent = `Agregar (€${nuevoTotal})`;
}

// 4. Función para confirmar la compra en el ticket
function agregarAlTicket(id, nombre, precioBase) {
    const talla = document.getElementById(`talla-${id}`).value;
    const cantidad = document.getElementById(`cantidad-${id}`).value;
    const total = (precioBase * cantidad).toFixed(2);

    const ticket = document.getElementById("detalle-ticket");
    ticket.innerHTML = `
        <h4>¡Producto Añadido!</h4>
        <p><strong>${nombre}</strong></p>
        <p>Talla: ${talla} | Cantidad: ${cantidad}</p>
        <p>Total: <strong>${total}€</strong></p>
    `;
}

init();