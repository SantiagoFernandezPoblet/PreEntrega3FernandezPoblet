const productos = document.querySelector("#Productos");
const verCarrito = document.querySelector("#carrito");
const modalContainer = document.getElementById("modal-container");
const cantidadCarrito = document.getElementById("cantidadCarrito");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

window.addEventListener("DOMContentLoaded", () => {
    fetch("data/productos.json")
    .then(res => {
        return res.json();
    })
    .then(data => {
        productosHTML(data);
    })
    .catch((err) => {
        carritoJSON(err);
    })
});

function productosHTML(producto){
    const contenido = document.querySelector("#Productos");
    let html = "";
    producto.forEach(({item, aroma, img, precio, id}) => {
        html += `
        <div class="card" style="width: 18rem;">
            <img src="${img}" class="card-img-top" alt="...">
            <div class="card-body">
              <h2 id="nombreProducto" class="card-title">${item}</h2>
              <p id="aromaProducto" class="card-text">Aroma: ${aroma}</p>
              <p  class="card-text">Precio: $ <span id="precioProducto">${precio}</span> </p>
              <a href="#" id="botonProducto" class="btn btn-primary" data-id="${id}">Agregar al carrito</a>
            </div>
        </div>
        `
    });
    contenido.innerHTML = html;
}

function agregarAlCarrito(evt){
    evt.preventDefault();
    if(evt.target.classList.contains("btn")){
        const item = evt.target.parentElement;
        datosProducto(item);
        agregarProducto();
    }
}

function datosProducto(producto){
    const infoProducto = {
        nombre: producto.querySelector("#nombreProducto").textContent,
        aroma: producto.querySelector("#aromaProducto").textContent,
        precio: producto.querySelector("#precioProducto").textContent,
        id: producto.querySelector("#botonProducto").getAttribute("data-id"),
        cantidad: 1,
    }
    
    if(carrito.some(item => item.id === infoProducto.id)){
        const repetidos = carrito.map(prod => {
            if(prod.id === infoProducto.id){
                let cantidad = parseInt(prod.cantidad);
                cantidad++;
                prod.cantidad = cantidad;
                return prod;
            } else{
                return prod;
            }
        });
        carrito = [...repetidos];
    } else{
        carrito = [...carrito, infoProducto];
    }
    saveLocal();
}

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
    totalCarrito.innerHTML = `Total a pagar: $${total}`;
    modalContainer.append(totalCarrito);

    const botonesCarrito = document.createElement("div");
    botonesCarrito.className = "botonesCarrito";
    modalContainer.append(botonesCarrito);


    let comprarCarrito = document.createElement("a");
    comprarCarrito.className = "btn btn-secondary";
    comprarCarrito.innerText = "Comprar";
    botonesCarrito.append(comprarCarrito);

    let vaciarCarrito = document.createElement("a");
    vaciarCarrito.className = "btn btn-secondary";
    vaciarCarrito.innerText = "Vaciar carrito";
    botonesCarrito.append(vaciarCarrito);

    vaciarCarrito.addEventListener("click", () => {
        btnVaciarCarrito();
    });

    comprarCarrito.addEventListener("click", () => {
        btnComprarCarrito();
    });

};

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

const saveLocal = () => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
    carritoContador();
}

productos.addEventListener("click", agregarAlCarrito);

verCarrito.addEventListener("click", pintarCarrito);