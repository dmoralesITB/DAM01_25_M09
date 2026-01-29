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