// 1. Función para conectar y obtener el listado inicial (4 Pokémon)
async function conectarAPI() {
    const contenedor = document.getElementById("pokemon-container");
    contenedor.innerHTML = ""; // Limpiar pantalla al cargar

    try {
        // Pedimos los primeros 4 pokemons
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=4");

        if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);

        const data = await response.json();

        // Recorremos el array de resultados
        for (const pokemon of data.results) {
            // Usamos la URL que nos da la API para cada pokemon
            await obtenerDetalles(pokemon.url);
        }

    } catch (error) {
        console.error("Error en conectarAPI:", error);
        contenedor.innerHTML = `<p style="color:red">Error al cargar la lista: ${error.message}</p>`;
    }
}

// 2. Función para obtener detalles (Imagen, ID, Tipos)
async function obtenerDetalles(urlOId) {
    const contenedor = document.getElementById("pokemon-container");

    // Si urlOId es un nombre, montamos la URL. Si ya es una URL, la usamos.
    const url = urlOId.startsWith("http")
        ? urlOId
        : `https://pokeapi.co/api/v2/pokemon/${urlOId.toLowerCase().trim()}`;

    try {
        const res = await fetch(url); // fetch directo a la URL

        if (!res.ok) throw new Error("Pokémon no encontrado");

        const pokemon = await res.json();
        pintaPokemon(pokemon);

    } catch (error) {
        console.error("Error en obtenerDetalles:", error);
        // Si es una búsqueda fallida, avisamos al usuario
        if (contenedor.innerHTML === "") {
            contenedor.innerHTML = `<p style="color:red">No se encontró el Pokémon.</p>`;
        }
    }
}

// 3. Función para "pintar" la tarjeta en el HTML
function pintaPokemon(p) {
    const contenedor = document.getElementById("pokemon-container");

    // Extraemos los tipos (pueden ser varios)
    const tipos = p.types.map(t => t.type.name).join(", ");

    const card = `
        <div style="border: 1px solid #ddd; border-radius: 10px; padding: 15px; margin: 10px; display: inline-block; text-align: center; width: 180px; box-shadow: 2px 2px 5px #eee;">
            <p style="color: #666; font-weight: bold;">#${p.id}</p>
            <img src="${p.sprites.front_default}" alt="${p.name}" style="width: 100px;">
            <h3 style="text-transform: capitalize;">${p.name}</h3>
            <p><strong>Tipo:</strong> ${tipos}</p>
        </div>
    `;
    contenedor.innerHTML += card;
}

// 4. Función para buscar por el input
function buscarPokemon() {
    const input = document.getElementById("busqueda");
    const nombre = input.value;

    if (nombre) {
        document.getElementById("pokemon-container").innerHTML = ""; // Limpiar antes de buscar
        obtenerDetalles(nombre);
    } else {
        alert("Por favor, escribe un nombre.");
    }
}