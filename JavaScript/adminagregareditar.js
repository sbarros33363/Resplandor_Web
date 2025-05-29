// Obtener el formulario y la lista de productos
const productoForm = document.getElementById("producto-form");
const productosLista = document.getElementById("productos-table-body");

document.addEventListener("DOMContentLoaded", function() {
    mostrarProductos();
});

// Funcioon ara mostrar los productos en el dashboard
function mostrarProductos() {
    let productos = JSON.parse(localStorage.getItem("productos")) || [];
    productosLista.innerHTML = "";  // Limpiar lista antes de agregar nuevos productos

    productos.forEach((producto, index) => {
        let tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${producto.nombre}</td>
            <td>$${producto.precio}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="editarProducto(${index})">Editar</button>
                <button class="btn btn-danger btn-sm" onclick="eliminarProducto(${index})">Eliminar</button>
            </td>
        `;
        productosLista.appendChild(tr);
    });
}

// Función para agregar o editar un producto cuando el admin entre 
productoForm.addEventListener("submit", function(e) {
    e.preventDefault();

    let nombre = document.getElementById("nombre").value;
    let precio = document.getElementById("precio").value;
    let descripcion = document.getElementById("descripcion").value;
    let imagen = document.getElementById("imagen").value;

    let nuevoProducto = {
        nombre: nombre,
        precio: parseFloat(precio).toFixed(2),
        descripcion: descripcion,
        imagen: imagen
    };

    let productos = JSON.parse(localStorage.getItem("productos")) || [];
    productos.push(nuevoProducto);
    localStorage.setItem("productos", JSON.stringify(productos));

    productoForm.reset();
    mostrarProductos();
});

// Función para eliminar un producto
function eliminarProducto(index) {
    let productos = JSON.parse(localStorage.getItem("productos")) || [];
    productos.splice(index, 1);
    localStorage.setItem("productos", JSON.stringify(productos));
    mostrarProductos();
}

// Función para editar un producto
function editarProducto(index) {
    let productos = JSON.parse(localStorage.getItem("productos")) || [];
    let producto = productos[index];

    document.getElementById("nombre").value = producto.nombre;
    document.getElementById("precio").value = producto.precio;
    document.getElementById("descripcion").value = producto.descripcion;
    document.getElementById("imagen").value = producto.imagen;

    // Eliminar el producto original
    eliminarProducto(index);
}

