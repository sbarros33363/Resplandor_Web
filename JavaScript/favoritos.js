document.addEventListener("DOMContentLoaded", function () {
    mostrarFavoritos();
});

function mostrarFavoritos() {
    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    let listaFavoritos = document.getElementById("lista-favoritos");

    listaFavoritos.innerHTML = ""; // Limpiar antes de agregar

    if (favoritos.length === 0) {
        listaFavoritos.innerHTML = "<p>No hay productos en favoritos.</p>";
        return;
    }

    favoritos.forEach((producto, index) => {
        let div = document.createElement("div");
        div.classList.add("col");

        div.innerHTML = `
            <div class="card">
                <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                <div class="card-body">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class="card-text">${producto.precio}</p>
                    <button class="btn btn-danger" onclick="eliminarFavorito(${index})">❌ Quitar</button>
                </div>
            </div>
        `;

        listaFavoritos.appendChild(div);
    });
}

function eliminarFavorito(index) {
    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    favoritos.splice(index, 1);
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
    mostrarFavoritos();
}

function vaciarFavoritos() {
    localStorage.removeItem("favoritos");
    mostrarFavoritos();
}

