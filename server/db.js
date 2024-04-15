import mysql from "mysql2"
const pool = mysql
    .createPool({
        host: "localhost",
        user: "root",
        password: "",
        database: "blog_caidas",
        port: "3306",
    })
    .promise();

export async function obtenerProductos() {
    try {
        const [respuesta] = await pool.query(
            "SELECT * FROM productos;"
        );
        return respuesta;
    } catch (e) {
        throw new Error(e);
    }
}

export async function obtenerResenasSegunProducto(id_producto) {
    try {
        const [respuesta] = await pool.query(
            "SELECT * FROM resenas WHERE id_producto = ?;", [id_producto]
        );
        return respuesta;
    } catch (e) {
        throw new Error(e);
    }
}

export async function crearResena(resena) {
    try {
        const respuesta = await pool.query(
            "INSERT INTO resenas (id_producto, comentario_resena, valor_resena, nombre_usuario) VALUES (?,?,?,?)",
            [resena.id_producto, resena.comentario_resena, resena.valor_resena, resena.nombre_resena]
        );
        return respuesta.insertId;
    } catch (e) {
        throw new Error(e);
    }
}

export async function actualizarPromedioProducto(id_producto) {
    try {
        const [datos_resenas] = await pool.query("SELECT COUNT(id_resena) AS cantidad, SUM(valor_resena) AS total_valor  FROM resenas WHERE id_producto = ?;", [id_producto]);
        let cantidad = datos_resenas[0].cantidad;
        let total_valor = datos_resenas[0].total_valor;
        let promedio = total_valor / cantidad;
        await pool.query(
            "UPDATE productos SET promedio_resenas = ? WHERE id_producto = ?",
            [promedio, id_producto]
        );
        return id_producto;
    } catch (e) {
        throw new Error(e);
    }
}