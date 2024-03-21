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
  const { archivo, contenido } = req.query;
  fs.writeFile(`${archivo}.txt`, `${contenido}`, () => {
    res.send("Archivo creado con éxito!");
  });
});

app.get("/leer", (req, res) => {
  const { archivo } = req.query;
  fs.readFile(`${archivo}.txt`, "UTF8", (err, data) => {
    res.send(data);
  });
});

app.get("/renombrar", (req, res) => {
  const { nombre } = req.query;
  const { nuevoNombre } = req.query;
  fs.rename(`${nombre}.txt`, `${nuevoNombre}.txt`, (err, data) => {
    res.send(`Archivo ${nombre}.txt renombrado por ${nuevoNombre}`);
  });
});

//eliminar
app.get("/eliminar", (req, res) => { 
    const{ archivo } = req.query
    fs.unlink(`${archivo}.txt`, (err, data) => { 
        res.send(`Archivo ${archivo} eliminado con éxito`) 
    }) 
})
