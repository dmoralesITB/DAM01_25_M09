const { createServer } = require('node:http');

const hostname = '127.0.0.1';
const port = 3001;

// Datos simulados --> como si fuera lo que nos devuelve la BDD
let students = [
  { id: "A001", nombre: "Abril", curso: "1º DAW" },
  { id: "A002", nombre: "Marc", curso: "1º DAM" }
];

// Devuelve JSON
function sendJson(res, statusCode, data) {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(JSON.stringify(data));
}



const server = createServer((req, res) => {

  console.log(req.method, req.url);

  // GET /students
  if (req.method === "GET" && req.url === "/students") {
    return sendJson(res, 200, students);
  }

  // TODO 1: GET /students/:id
  //Buscamos la info de un alumno completo.
  if (req.method === "GET" && req.url.startsWith("/students/")) {

    // 1. Extraer id de la URL
    const id = req.url.split("/")[2];
    // 2. Buscar alumno en el array
    const alumno = students.find(s => s.id === id);
    // 3. Si no existe → 404
    if (!alumno) {
      return sendJson(res, 404, { message: "Alumno no encontrado" });
    }
    // 4. Si existe → devolver 200 + alumno
    return sendJson(res, 200, alumno);
  }

  // TODO 2: DELETE /students/:id
  if (req.method === "DELETE" && req.url.startsWith("/students/")) {

    // 1. Extraer id
    const id = req.url.split("/")[2];
    // 2. Comprobar si existe
    const index = students.findIndex(s => s.id === id);
    // 3. Eliminarlo del array
    students.splice(index, 1);
    // 4. Si no existe → 404
    if (index === -1) {
      return sendJson(res, 404, { message: "No se encontró el alumno para borrar" });
    }
    // 5. Si se elimina → 204 (sin body)
    res.statusCode = 204;
    return res.end();


  }
  // TODO 3: POST /students
  if (req.method === "POST" && req.url === "/students") {

    // 1. Leer el body con readBody() --> Es donde esta toda la info del nuevo alumno.
    readBody(req, (err, newAlumno) => {
      if (err) return sendJson(res, 400, { message: "Error al leer datos" });
      // 2. Validar que tenga id, nombre y curso
      if (!newAlumno.id || !newAlumno.nombre || !newAlumno.curso) {
        return sendJson(res, 400, { message: "Faltan datos obligatorios" });
      }
      // 3. Comprobar que el id no esté repetido
      const existe = students.some(s => s.id === newAlumno.id);
      if (existe) {
        return sendJson(res, 409, { message: "El ID ya existe" });
      }
      // 4. Añadir al array students
      students.push(newAlumno);
      // 5. Devolver 201 + alumno creado
      return sendJson(res, 201, newAlumno);
    });
    return;
  }

  // TODO 4: PUT /students/:id
  if (req.method === "PUT" && req.url.startsWith("/students/")) {

    // 1. Extraer id
    const id = req.url.split("/")[2];
    // 2. Buscar alumno
    const alumno = students.find(s => s.id === id);
    // 3. Si no existe → 404
    if (!alumno) {
      return sendJson(res, 404, { message: "Alumno no encontrado" });
    }
    // 4. Leer body con readBody() --> Ahora será otra callback!!!
    readBody(req, (err, dataActualizada) => {
      if (err) return sendJson(res, 400, { message: "Error en el JSON" });
      // 5. Actualizar campos enviados
      if (dataActualizada.nombre) alumno.nombre = dataActualizada.nombre;
      if (dataActualizada.curso) alumno.curso = dataActualizada.curso;
      // 6. Devolver 200 + alumno actualizado
      return sendJson(res, 200, alumno);
    });
    return;

  }



  // Si no coincide ningún endpoint
  sendJson(res, 404, { message: "Not Found" });

});


/* TODO: Crear función que lea el body y devuelva el JSON parseado
En Node puro, el body no viene empaquetado.
Llega en trozos.
Tenemos que montarlo nosotros.*/
function readBody(req, callback) {
  let body = "";

  req.on("data", chunk => {
    //Vamos obteniendo los trozos
    body += chunk;
  });

  req.on("end", () => {
    try {
      const alumnoNew = JSON.parse(body);
      //Aquí ya tenemos al alumno.
      callback(null, alumnoNew);
    } catch (err) {
      callback(err);
    }
  });
}

//TODO las funciones callback necesarias.

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});