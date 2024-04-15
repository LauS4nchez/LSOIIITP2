import express from "express";
import * as db from "./db.js";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(cors({
    origin: true
}));

app.get("/productos", async (req, res)=>{
    try {
        let respuesta = await db.obtenerProductos();
        res.status(200).send(respuesta);
      } catch (e) {
        console.error(e.message);
        res.status(500).send(e)
      }
      
})
app.get("/resenas/:id_producto", async (req, res)=>{
    try {
        let respuesta = await db.obtenerResenasSegunProducto(req.params.id_producto);
        res.status(200).send(respuesta);
      } catch (e) {
        console.error(e.message);
        res.status(500).send(e)
      }
      
});
app.post("/resenas/crear", async (req, res)=>{
    try {
      console.log(req.body)
        let respuesta = await db.crearResena(req.body);
        let promedio = await db.actualizarPromedioProducto(req.body.id_producto);
        res.status(200).send(respuesta);
      } catch (e) {
        console.error(e.message);
        res.status(500).send(e)
      }
});

app.listen(8080, () => {
    console.log(`Ya está funcionando el servidor en el puerto 8080`);
  });