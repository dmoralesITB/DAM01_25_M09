let contenedor = document.getElementById('contenedor');

// for para aplicar hasta el numero 9
for (let ascii_code=65; ascii_code<=90; ascii_code++) {
    let tecla = document.createElement('div');
    tecla.className = "tecla";
    tecla.textContent = String(i);

    if (i % 2 === 0) {
        tecla.style.backgroundColor = "lightblue";
    }
    if (i % 3 === 0) {
        tecla.style.backgroundColor = "blue";
    }
    contenedor.appendChild(tecla);
}

// // for para aplicar letras
// for (let ascii_code = 65; ascii_code <= 90; ascii_code++) {
//     let letra = String.fromCharCode(ascii_code);
//     let tecla = document.createElement('div');
//     tecla.className = "tecla";
//     tecla.textContent = letra;
//     tecla.style.backgroundColor = "lightgreen";
    
//     contenedor.appendChild(tecla);
// }
