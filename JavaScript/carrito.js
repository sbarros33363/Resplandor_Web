document.addEventListener("DOMContentLoaded", function () {
    mostrarCarrito();
});

function mostrarCarrito() {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    let lista = document.getElementById("lista-carrito");
    let totalPrecio = document.getElementById("total-precio");
    lista.innerHTML = "";
    let total = 0;

    if (carrito.length === 0) {
        lista.innerHTML = "<p>El carrito está vacío.</p>";
        totalPrecio.textContent = "$0";
        return;
    }

    carrito.forEach((producto, index) => {
        let div = document.createElement("div");
        div.classList.add("card", "mb-3");

        let precioNumerico = parseFloat(producto.precio.replace("$", "").replace(",", "")) || 0;
        let subtotal = precioNumerico * producto.cantidad;
        total += subtotal;

        div.innerHTML = `
            <div class="card-body d-flex justify-content-between align-items-center">
                <img src="${producto.imagen}" width="50" class="me-3">
                <span>${producto.nombre} - $${subtotal.toFixed(2)}</span>
                <input type="number" class="form-control w-25" value="${producto.cantidad}" min="1" onchange="actualizarCantidad(${index}, this.value)">
                <button class="btn btn-danger btn-sm" onclick="eliminarDeCarrito(${index})">❌</button>
            </div>
        `;

        lista.appendChild(div);
    });

    totalPrecio.textContent = `$${total.toFixed(2)}`;
}

function vaciarCarrito() {
    localStorage.removeItem("carrito");
    mostrarCarrito();
}

function eliminarDeCarrito(index) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.splice(index, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
}

function actualizarCantidad(index, cantidad) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito[index].cantidad = parseInt(cantidad);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
}
