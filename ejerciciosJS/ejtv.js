//crea un objeto llamado tvSamsung
const tvSamsung = {
    nombre: "TV Samsung 42'",
    categoria: "Televisores",
    unidades: 4,
    precio: 345.95,
    
    getImporte: function() {
        return this.unidades * this.precio;
    }
}

//Muestra los datos en pantalla (nombreAtributo: Valor)
console.log("nombre:" + tvSamsung.nombre)
console.log("categoria:" + tvSamsung.categoria)
console.log("unidades:" + tvSamsung.unidades)
console.log("precio:" + tvSamsung.precio)
console.log("El importe total es: " + tvSamsung.getImporte() + "€");


//Obtén el string que corresponde al JSON de tvSamsung.
let jsonTV = JSON.stringify(tvSamsung);
console.log(jsonTV);
// Resultado: {"nombre":"TV Samsung 42'","categoria":"Televisores","unidades":4,"precio":345.95}

//Añadir características iterativamente (el usuario indica el valor)
const caracteristicasExtra = ["resolucion", "soporte_pared"];
caracteristicasExtra.forEach(caracteristica => {
    // Verificamos si existe prompt (entorno navegador)
    if (typeof prompt !== 'undefined') {
        let valor = prompt(`Introduce el valor para la característica '${caracteristica}':`);
        tvSamsung[caracteristica] = valor || "No especificado";
    }
});

//Lista de propiedades que debería tener un televisor y comprobación (default value)
const propiedadesEstandar = ["marca", "modelo", "garantia", "entradas_hdmi", "nombre", "precio"];
propiedadesEstandar.forEach(prop => {
    if (!tvSamsung.hasOwnProperty(prop)) {
        tvSamsung[prop] = "default value";
    }
});

// Mostrar en una página HTML toda la información relativa a tvSamsung
if (typeof document !== 'undefined') {
    const contenedor = document.createElement('div');
    let htmlContenedor = "<h3>Ficha Técnica TV Samsung</h3><ul>";
    for (let key in tvSamsung) {
        if (typeof tvSamsung[key] !== 'function') {
            htmlContenedor += `<li><strong>${key}:</strong> ${tvSamsung[key]}</li>`;
        }
    }
    htmlContenedor += "</ul>";
    contenedor.innerHTML = htmlContenedor;
    document.body.appendChild(contenedor);
}