//1. Disponibilizar una ruta para crear un archivo a partir de los parámetros de la consulta recibida (2 Puntos).
const express = require("express");
const app = express();
const PORT = 3000;
const fs = require("fs");

//inicialización puerto
app.listen(3000, () => {
  console.log(
    `El servidor está inicializando en el puerto http://localhost:${PORT}`
  );
});

//Ruta index.html
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile("/index.html");
});

app.get("/crear", (req, res) => {
    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;
    const day = new Date().getDate();
    const fecha = `${day < 10 ? "0" + day : day}/${month < 10 ? "0" + month : month }/${year}`;
  const { archivo, contenido } = req.query;
  fs.writeFile(`${archivo}`, `${fecha}\n <br> ${contenido}`, () => {
    res.send(`¡Archivo ${archivo} creado con éxito!`);
  });
});

app.get("/leer", (req, res) => {
  const { archivo } = req.query;
  fs.readFile(`${archivo}`, "UTF8", (err, data) => {
    res.send(data);
  });
});

app.get("/renombrar", (req, res) => {
  const { nombre } = req.query;
  const { nuevoNombre } = req.query;
  fs.rename(`${nombre}`, `${nuevoNombre}`, (err, data) => {
    res.send(`Archivo ${nombre}renombrado a ${nuevoNombre}`);
  });
});

//eliminar
app.get("/eliminar", (req, res) => { 
    const{ archivo } = req.query
    fs.unlink(`${archivo}`, (err, data) => { 
        res.send(`Archivo ${archivo} eliminado con éxito`) 
    }) 
})

//fecha (fórmula de Waldo)
// function obtenerFechaFormateada() {
//     const fecha = new Date();
  
//     const dia = String(fecha.getDate()).padStart(2, "0");
//     const mes = String(fecha.getMonth() + 1).padStart(2, "0");
//     const year = fecha.getFullYear();
  
//     const fechaFormateada = `${dia}/${mes}/${year}`;
  
//     return fechaFormateada;
//   }

//o
