function btnComprarCarrito(){
    Swal.fire({
        title: "¿Desea realizar la compra?",
        showCancelButton: true,
        confirmButtonText: "Comprar",
        cancelButtonText: "Cancelar",
    }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("Compra realizada con exito!", "", "success");
          carrito = [];
          carritoContador();
          saveLocal();
          pintarCarrito();
        }
    });
}

function btnVaciarCarrito(){
    Swal.fire({
        title: "¿Desea eliminar los productos del carrito?",
        showCancelButton: true,
        confirmButtonText: "Eliminar productos",
        cancelButtonText: "Cancelar",
    }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("Productos eliminados con exito!", "", "success");
          carrito = [];
          carritoContador();
          saveLocal();
          pintarCarrito();
        }
    });
}

function carritoJSON(){
    Swal.fire({
        icon: "error",
        title: "ERROR",
        text: "Hubo un error, por favor recargue la página. Si el error persiste comuniquese con nosotros via email.",
      });
}

function agregarProducto(){
    Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Producto agregado al carrito.",
        showConfirmButton: false,
        timer: 700,
        height: 200,
        width: 300,
    });
}
