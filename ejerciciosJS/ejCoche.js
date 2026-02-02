const coche = {
    marca: "Toyota",
    modelo: "Corolla",
    año: 2020,
    encendido: false,

    arrancar: function () {
        this.encendido = true;
        console.log("El coche ha arrancado");
    },
    detener: function () {
        this.encendido = false;
        console.log("El coche se ha apagado");
    },

    recorrer: function (km) {
        if (this.encendido) {
            this.kilometraje += km; // Sumamos los km al total
            console.log(`Has recorrido ${km} km. El kilometraje total ahora es de ${this.kilometraje} km.`);
        } else {
            console.log("No puedes recorrer si el coche está apagado.");
        }
    }
}




coche.kilometraje = 0;
    coche.arrancar();
    console.log("¿Está encendido?: " + coche.encendido);
    coche.detener();
    console.log("¿Está encendido?: " + coche.encendido);
    console.log("kilometraje del coche: " + coche.kilometraje + " km");
    coche.arrancar();
    coche.recorrer(120);
    console.log(coche);
    coche.recorrer(50);
