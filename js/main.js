const tiendaHTML = document.getElementById("tienda");
const verCarrito = document.getElementById("carrito");
const modalContainer = document.getElementById("modal-container");
const cantidadCarrito = document.getElementById("cantidadCarrito");

const saveLocal = () => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

productos.forEach((producto)=> {
    let contenido = document.createElement("div");
    contenido.className = "productos";
    contenido.innerHTML = `
    <div class="card" style="width: 18rem;">
    <img src="${producto.img}" class="card-img-top">
    <div class="card-body">
    <h5 class="card-title">${producto.item}</h5>
    <p class="card-text"> Aroma: ${producto.aroma}</p>
    <p>$${producto.precio}</p>
    </div>
    `;

    tiendaHTML.append(contenido);

    let botonComprar = document.createElement("a");
    botonComprar.innerText = "Agregar al carrito";
    botonComprar.className = "btn btn-primary";
    contenido.append(botonComprar);

    botonComprar.addEventListener("click", ()=>{
        const repetidos = carrito.some((repetirProducto)=> repetirProducto.id == producto.id);
        if (repetidos){
            carrito.map((item)=> {
                item.id === producto.id && item.cantidad++;
            });
        }else {
            carrito.push({
                nombre: producto.item,
                precio: parseInt(producto.precio),
                id: producto.id,
                cantidad: producto.cantidad,
            });
        }
        carritoContador();
        saveLocal();
    });

});

const pintarCarrito = ()=>{
    modalContainer.innerHTML = "";
    modalContainer.style.display = "flex";
    const modalHeader = document.createElement("div");
    modalHeader.className= "modal-header";
    modalHeader.innerHTML = `
    <h1 class="modal-header-title">Carrito</h1>
    `;
    modalContainer.append(modalHeader);
    
    const modalButton = document.createElement("h1");
    modalButton.innerText = "✖️";
    modalButton.className = "modal-header-button";
    modalButton.addEventListener("click", ()=>{
        modalContainer.style.display = "none";
    });

    modalHeader.append(modalButton);

    carrito.forEach((item)=>{
        let carritoContent = document.createElement("div");
        carritoContent.className = "modal-content";
        carritoContent.innerHTML =`
            <h3> ${item.nombre}</h3>
            <p> Precio unitario: $${item.precio}</p>
            <p> Cantidad: ${item.cantidad}</p>
            <p> Total por producto: $${item.precio * item.cantidad}</p>
        `;

        modalContainer.append(carritoContent);

        let eliminar = document.createElement("span");
        eliminar.innerText = "❌";
        eliminar.classList = "eliminar-producto";
        carritoContent.append(eliminar);
        eliminar.addEventListener("click", eliminarProducto);
    });

    const total = carrito.reduce((X, el)=> X + el.precio * el.cantidad, 0);
    const totalCarrito = document.createElement("div");
    totalCarrito.className = "total-content";
    totalCarrito.innerHTML = `total a pagar: ${total}`;
    modalContainer.append(totalCarrito);
};

verCarrito.addEventListener("click", pintarCarrito);

const eliminarProducto = () => {
    const buscarID = carrito.find((item) => item.id);

    carrito = carrito.filter((carritoID)=> {
        return carritoID != buscarID;
    });
    carritoContador();
    saveLocal();
    pintarCarrito();
};

const carritoContador = () => {
    cantidadCarrito.style.display = "block";
    const carritoLength = carrito.length;
    localStorage.setItem("carritoLength", JSON.stringify(carritoLength));
    cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritoLength"));
}

carritoContador();