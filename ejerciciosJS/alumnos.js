const alumnosJSON = `[
    {
      "nombre": "Juan",
      "apellidos": "González Pérez",
      "fecha_de_nacimiento": "1999-05-15",
      "dni": "12345678A",
      "telefono": "123456789",
      "mail": "juan@example.com",
      "notam2": 7.5,
      "notam3": 8,
      "notam4": 6.5,
      "notam5": 9,
      "notam6": 7,
      "notam9": 8
    },
    {
      "nombre": "María",
      "apellidos": "López García",
      "fecha_de_nacimiento": "2000-08-25",
      "dni": "23456789B",
      "telefono": "987654321",
      "mail": "maria@example.com",
      "notam2": 8,
      "notam3": 7,
      "notam4": 8.5,
      "notam5": 9,
      "notam6": 6.5,
      "notam9": 7.5
    },
    {
      "nombre": "Pedro",
      "apellidos": "Martínez Ruiz",
      "fecha_de_nacimiento": "2001-03-10",
      "dni": "34567890C",
      "telefono": "654321987",
      "mail": "pedro@example.com",
      "notam2": 6,
      "notam3": 7,
      "notam4": 5.5,
      "notam5": 8,
      "notam6": 6,
      "notam9": 7
    },
    {
      "nombre": "Ana",
      "apellidos": "Sánchez Jiménez",
      "fecha_de_nacimiento": "1998-11-20",
      "dni": "45678901D",
      "telefono": "123456789",
      "mail": "ana@example.com",
      "notam2": 8,
      "notam3": 9,
      "notam4": 7,
      "notam5": 8.5,
      "notam6": 7.5,
      "notam9": 9
    },
    {
      "nombre": "David",
      "apellidos": "Pérez Fernández",
      "fecha_de_nacimiento": "2002-07-05",
      "dni": "56789012E",
      "telefono": "987654321",
      "mail": "david@example.com",
      "notam2": 7,
      "notam3": 8,
      "notam4": 6.5,
      "notam5": 8.5,
      "notam6": 7,
      "notam9": 8
    },
    {
      "nombre": "Laura",
      "apellidos": "González Martínez",
      "fecha_de_nacimiento": "2000-01-30",
      "dni": "12345678A",
      "telefono": "987654321",
      "mail": "laura@example.com",
      "notam2": 8.5,
      "notam3": 9,
      "notam4": 7,
      "notam5": 8,
      "notam6": 7.5,
      "notam9": 8.5
    },
    {
      "nombre": "Carlos",
      "apellidos": "Gómez López",
      "fecha_de_nacimiento": "2003-02-14",
      "dni": "67890123G",
      "telefono": "123456789",
      "mail": "carlos@example.com",
      "notam2": 7,
      "notam3": 8,
      "notam4": 6.5,
      "notam5": 8,
      "notam6": 7,
      "notam9": 8
    },
    {
      "nombre": "Elena",
      "apellidos": "Fernández García",
      "fecha_de_nacimiento": "1999-09-18",
      "dni": "23456789B",
      "telefono": "654321987",
      "mail": "elena@example.com",
      "notam2": 6.5,
      "notam3": 8,
      "notam4": 7.5,
      "notam5": 8.5,
      "notam6": 7,
      "notam9": 8
    },
    {
      "nombre": "Miguel",
      "apellidos": "Martínez López",
      "fecha_de_nacimiento": "2001-04-22",
      "dni": "78901234H",
      "telefono": "987654321",
      "mail": "miguel@example.com",
      "notam2": 7.5,
      "notam3": 7.5,
      "notam4": 6,
      "notam5": 8,
      "notam6": 6.5,
      "notam9": 7.5
    },
    {
      "nombre": "Sara",
      "apellidos": "Jiménez Sánchez",
      "fecha_de_nacimiento": "2002-10-11",
      "dni": "45678901D",
      "telefono": "123456789",
      "mail": "sara@example.com",
      "notam2": 8,
      "notam3": 8.5,
      "notam4": 7,
      "notam5": 9,
      "notam6": 7.5,
      "notam9": 8.5
    }
  ]`;


// Convertir el JSON String a un Array de Objetos
const alumnos = JSON.parse(alumnosJSON);

// Crear la tabla
function generarTabla() {
  const contenedor = document.getElementById("contenedor-tabla");

  let tablaHTML = `
        <table>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Apellidos</th>
                    <th>Fecha de Nacimiento</th>
                    <th>DNI</th>
                    <th>Teléfono</th>
                    <th>Mail</th>
                    <th>Nota M2</th>
                    <th>Nota M3</th>
                    <th>Nota M4</th>
                    <th>Nota M5</th>
                    <th>Nota M6</th>
                    <th>Nota M9</th>
                 </tr>
            </thead>
            <tbody>
    `;

  for (let i = 0; i < alumnos.length; i++) {
    let alumno = alumnos[i]; // Accedemos al alumno por su índice

    tablaHTML += `
            <tr>
                <td>${alumno.nombre}</td>
                <td>${alumno.apellidos}</td>
                <td>${alumno.fecha_de_nacimiento}</td>
                <td class="dni-cell">${alumno.dni}</td>
                <td>${alumno.telefono}</td>
                <td>${alumno.mail}</td>
                <td>${alumno.notam2}</td>
                <td>${alumno.notam3}</td>
                <td>${alumno.notam4}</td>
                <td>${alumno.notam5}</td>
                <td>${alumno.notam6}</td>
                <td>${alumno.notam9}</td>
                <td></td> </tr>
        `;
  }

  tablaHTML += `
            </tbody>
        </table>
    `;

  // Inyectar la tabla en el div
  contenedor.innerHTML = tablaHTML;
}

// Ejecutar la función
generarTabla();



