const API_ROUTE = "http://localhost:8080";
// const options = {
//     method: 'POST',
//     headers: {
//     'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(update),
//     };
async function obtenerProductos() {
    try{
        const response = await fetch(`${API_ROUTE}/productos`, {
            method: 'GET', headers: {
                'Content-Type': 'application/json',
            },
        });
        if(response.status !== 200){
            throw new Error();
        }
        const data = await response.json();
        return data;
    }catch(e){
        console.log(e.message)
    }
   
}
async function mostrarProductos (){
    let productos = await obtenerProductos();
    let tabs = productos.map((producto) => '<button class="tablinks" onclick="openCity(event, ' + producto.id_producto + ' )">'+ producto.nombre_producto +'</button>');
    document.getElementById("datos").innerText = texto;
}
