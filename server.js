const express = require("express");

const {
  getDataUsuario,
  getDataTransferencia,
  insertarTransferencia,
  insertarUsuario,
  editarUsuario,
  eliminarUsuario,
} = require("./database/connection");
const app = express();
const port = 3002;

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

app.use(express.json()); //PARA ACCEDER A req.body

//ESTATICOS
app.use(express.static("public"));


//VISTA
app.get("/", async (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

//Obtener los datos de todos los usuarios
app.get("/usuarios", async (req, res) => {
  try {
    const result = await getDataUsuario();
    //console.log(result);
    res.json(result); //DEVUELVE JSON
  } catch (error) {
    console.error("Error al obtener getData", error);
    res
      .status(500)
      .json({ success: false, message: "Error interno al obtener getData" });
  }
});

//Completar los datos de una transferencia
app.get("/transferencias", async (req, res) => {
  try {
    const result = await getDataTransferencia();
    //console.log(result);
    res.json(result); //DEVUELVE JSON
  } catch (error) {
    console.error("Error al obtener datos de transferencias", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Error interno al obtener datos de transferencias",
      });
  }
});

//Eliminar a un usuario
app.delete("/usuario", async (req, res) => {
  try{
  const { id } = req.query;
  //console.log(id);
  const resultado = await eliminarUsuario(id);
  res.status(200).json({ success: true, message: "Usuario eliminado" });
  }catch{
    console.error("Error al eliminar Usuario:", error);
    res
      .status(500)
      .json({ success: false, message: "Error interno al eliminar Usuario" });

  }
})

//Crear usuario
app.post("/usuario", async (req, res) => {
  try {
    const datos = Object.values(req.body);
    const respuesta = await insertarUsuario(datos);
    res.json(respuesta);
  } catch (error){
    console.error("Error al insertar usuario:", error);
    res
      .status(500)
      .json({ success: false, message: "Error interno al insertar usuario" });
  }
});

//EDITAR
app.put("/usuario", async (req, res) => {
  try {
    const { id } = req.query;
    const { name, balance} = req.body;
    
    
    const datosCompletos = {
      nombre: name,
      balance: balance,
      id: id,
    }; 

    const resultado = await editarUsuario(datosCompletos);
    //console.log(resultado);
    res.status(200).json({ success: true, message: "Usuario editado" });
  } catch (error){
    console.error("Error al editar la canción:", error);
    res
      .status(500)
      .json({ success: false, message: "Error interno al editar usuario" });
  }
});

//Crear una transferencia
app.post("/transferencia", async (req, res) => {
  try {
    const { emisor, receptor, monto } = req.body;

    const datos = [
      parseInt(emisor),
      parseInt(receptor),
      parseFloat(monto)
    ];
    const respuesta = await insertarTransferencia(datos);
    res.json(respuesta);
    //console.log(respuesta);
    //console.log(datos);
  } catch (error){
    console.error("Error al insertar usuario:", error);
    res
      .status(500)
      .json({ success: false, message: "Error interno al insertar usuario" });
  }
});
