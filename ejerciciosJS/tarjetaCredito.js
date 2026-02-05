class TarjetaCredito {
    #numero;
    #pin;
    #cvv;
    #deuda;

    constructor(titular, numero, cvv, fechaCaducidad, limiteCredito, pinInicial) {
        this.titular = titular;
        this.#numero = numero;
        this.#cvv = cvv;
        this.fechaCaducidad = fechaCaducidad;
        this.limiteCredito = limiteCredito;
        this.#pin = pinInicial;
        this.#deuda = 0;
        this.activa = false;
    }

    get deuda() {
        return this.#deuda;
    }

    get disponible() {
        return this.limiteCredito - this.#deuda;
    }


    set limite(nuevoLimite) {
        if (nuevoLimite < 0) {
            console.error("El límite no puede ser negativo.");
        } else {
            this.limiteCredito = nuevoLimite;
            console.log(`Límite actualizado a: ${this.limiteCredito}€`);
        }
    }



    activar() {
        this.activa = true
        console.log("La tarjeta ha sido activada")
    }

    anular() {
        this.activa = false
        console.log("la tarjeta esta desactivada o a sido Bloqueada")
    }
    pagar(importe) {
        if (!this.activa) {
            console.log("la tarjeta no esta activada")
            return;
        }
        if (this.#deuda + importe > this.limiteCredito) {
            console.log(`Pago rechazado: Límite de crédito excedido para ${this.titular}.`);
        } else {
            this.#deuda += importe;
            console.log(`Pago de ${importe}€ aceptado. Deuda actual: ${this.#deuda}€.`);
        }
    }
    cambiarPin(pinViejo, pinNuevo) {
        if (this.#pin === pinViejo) {
            this.#pin = pinNuevo;
            console.log("PIN actualizado correctamente.");
        } else {
            console.log("Error: El PIN antiguo es incorrecto.");
        }
    }

}


//Instanciamos 3 objetos
const tarjetaPepe = new TarjetaCredito("Pepe García", "4545-1212-3434-5656", "123", "12/28", 3000, "1234");
const tarjetaAlicia = new TarjetaCredito("Alicia Garcia", "5555-6666-7777-8888", "987", "05/27", 5000, "0000");
const tarjetaCarlos = new TarjetaCredito("Carlos Gómez", "4000-0000-1111-2222", "555", "10/26", 1000, "4321");

// Opeeraciones
console.log("--- Operaciones de Pepe ---");
tarjetaPepe.activar();
tarjetaPepe.pagar(150.50);
tarjetaPepe.cambiarPin("1234", "9999");

console.log("\n--- Operaciones de Alicia ---");
tarjetaAlicia.pagar(100); 
tarjetaAlicia.activar();
tarjetaAlicia.pagar(6000); 

console.log("\n--- Operaciones de Carlos ---");
tarjetaCarlos.activar();
tarjetaCarlos.pagar(900);
tarjetaCarlos.anular(); 


console.log("\n--- Resumen Final de Pepe ---");
console.log(`Deuda actual: ${tarjetaPepe.deuda}€`); 
console.log(`Saldo disponible: ${tarjetaPepe.disponible}€`);

