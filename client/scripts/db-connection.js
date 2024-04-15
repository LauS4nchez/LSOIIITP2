const API_ROUTE = "http://localhost:8080";

async function crearResena(resena) {
    try {
        const response = await fetch(`${API_ROUTE}/resenas/crear`, {
            method: 'POST',
            body: JSON.stringify(resena),
            headers: {
                'Content-Type': 'application/json',
            },
            

        });
        if (response.status !== 200) {
            throw new Error();
        }
        const data = await response.json();
        return data;
    } catch (e) {
        console.log(e.message)
    }
}
async function obtenerProductos() {
    try {
        const response = await fetch(`${API_ROUTE}/productos`, {
            method: 'GET', headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status !== 200) {
            throw new Error();
        }
        const data = await response.json();
        return data;
    } catch (e) {
        console.log(e.message)
    }

}
async function obtenerResenasSegunProducto(id_producto) {
    try {
        const response = await fetch(`${API_ROUTE}/resenas/${id_producto}`, {
            method: 'GET', headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status !== 200) {
            throw new Error();
        }
        const data = await response.json();
        return data;
    } catch (e) {
        console.log(e.message)
    }

}
async function mostrarProductos() {
    let productos = await obtenerProductos();
    let tabs = [];
    let array_datos = []; // Array para almacenar los datos de los productos
    for (let i = 0; i < productos.length; i++) {
        let resenas = await obtenerResenasSegunProducto(productos[i].id_producto);
        // Crear botones de pestaña
        let button = document.createElement('button');
        button.className = 'tablinks';
        button.textContent = productos[i].nombre_producto;
        button.onclick = function () {
            abrirProducto(event, productos[i].id_producto);
        };
        tabs.push(button);

        // Crear divs para datos de productos
        let dato = document.createElement('div');
        dato.className = 'tabcontent';
        dato.id = productos[i].id_producto;

        // Crear la tabla
        let tabla = document.createElement('table');
        tabla.border = 1
        tabla.style = "margin: auto; width:100%; collapsed: collapse;";


        // Crear el título de la tabla
        let titulo = document.createElement('caption');
        titulo.innerText = 'Reseñas';
        titulo.style = 'font-weight: 800; font-size: 32px';
        tabla.appendChild(titulo);

        // Crear la cabecera de la tabla
        let cabecera = document.createElement('thead');
        let filaCabecera = document.createElement('tr');

        // Crear cuatro celdas de cabecera (una para cada atributo en cabecerasAux)
        let cabecerasAux = ['Video', 'Comentario', 'Calificación', 'Usuario'];
        for (let i = 0; i < cabecerasAux.length; i++) {
            let celdaCabecera = document.createElement('th');
            celdaCabecera.textContent = cabecerasAux[i];
            filaCabecera.appendChild(celdaCabecera);
        }

        // Agregar la fila de cabecera a la cabecera de la tabla
        cabecera.appendChild(filaCabecera);
        tabla.appendChild(cabecera);

        // Agregar la fila de cabecera a la cabecera de la tabla
        cabecera.appendChild(filaCabecera);
        tabla.appendChild(cabecera);

        // Crear el cuerpo de la tabla
        let cuerpoTabla = document.createElement('tbody');

        // Crear cinco filas en el cuerpo de la tabla
        for (let i3 = 0; i3 < resenas.length; i3++) {
            let fila = document.createElement('tr');

            // Crear una celda con el video solo en la primera fila
            if (i3 === 0) {
                let frame = document.createElement('iframe');
                frame.className = 'video';
                frame.src = productos[i].video_producto;
                frame.title = productos[i].nombre_producto;
                frame.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
                frame.referrerpolicy = "strict-origin-when-cross-origin";
                let celdaVideo = document.createElement('td');
                celdaVideo.rowSpan = resenas.length; // La celda de video ocupará 5 filas
                celdaVideo.appendChild(frame);
                fila.appendChild(celdaVideo);
            }

            // Crear tres celdas en cada fila
            for (let j = 0; j < 3; j++) {
                let celda = document.createElement('td');
                celda.style = "text-align: center; margin-left: 5px; margin-right: 5px; max-width: 200px; word-wrap: break-word;";
                switch (j) {
                    case 0:
                        celda.innerText = resenas[i3].comentario_resena;
                        break;
                    case 1:
                        celda.innerText = resenas[i3].valor_resena;
                        break;
                    case 2:
                        celda.innerText = resenas[i3].nombre_usuario;
                        break;
                }
                fila.appendChild(celda);
            }


            // Agregar la fila al cuerpo de la tabla
            cuerpoTabla.appendChild(fila);
        }

        // Agregar el cuerpo de la tabla a la tabla
        tabla.appendChild(cuerpoTabla);




        if (resenas.length < 1) {
            let sin_resenas = document.createElement('div');
            sin_resenas.style = 'display:flex; justify-content: space-between; align-items:center;'
            let frame = document.createElement('iframe');
            frame.className = 'video-sin-resenas';
            frame.src = productos[i].video_producto;
            frame.title = productos[i].nombre_producto;
            frame.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
            frame.referrerpolicy = "strict-origin-when-cross-origin";
            let texto_sin = document.createElement('h2');
            texto_sin.innerText = 'Sin reseñas';
            texto_sin.style = 'margin-right: 20em;'
            sin_resenas.appendChild(frame)
            sin_resenas.appendChild(texto_sin)
            dato.appendChild(sin_resenas)
        } else {
            dato.appendChild(tabla)
        }
        let promedio = document.createElement("h3");
        promedio.innerText = "Promedio de valoraciones: " + productos[i].promedio_resenas + "/10";
        dato.appendChild(promedio)
        array_datos.push(dato); // Agregar div al array de datos

    }

    // Agregar botones de pestaña al contenedor de pestañas
    let container = document.getElementById("tabs");
    tabs.forEach(tab => {
        container.appendChild(tab);
    });

    // Agregar datos de productos al contenedor de datos
    let container_datos = document.getElementById("datos-tabs");
    array_datos.forEach(dato => {
        container_datos.appendChild(dato);
    });

    abrirProducto(null, productos[0].id_producto)
}

