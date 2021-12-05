mostrar();
var idProducto;

let getData = (url) => {
  let form = document.getElementById("form");
  let datos = new FormData(form);

  let package = {
    CodigoBarra: datos.get("codBarra"),
    nombre: datos.get("nombre"),
    PrecioCompra: datos.get("precioCompra"),
    PrecioVenta: datos.get("precioVenta"),
    stock: datos.get("cantidad"),
    Categoria: datos.get("categoria"),
    marca: datos.get("marca"),
    descripcion: datos.get("descripcion"),
    PrecioMinimo: datos.get("precioMinimo"),
    utilidad: datos.get("utilidad"),
    FechaVencimiento: datos.get("Vencimiento"),
    id: idProducto,
  };

  fetch(`${url}`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(package),
  })
    .then((message) => message.text())
    .then((message) => {
      alert(message);
      form.reset();
      mostrar();
    })
    .catch((err) => console.log(err));
};

let save = () => {
  getData("/saveUsers");
};

function mostrar() {
  let template = "";
  fetch("/mostrarProductos")
    .then((productos) => productos.json())
    .then((productos) => {
      console.log(productos);
      productos.map((producto) => {
        template += `
                    <tr id='${producto.id}'>
                        <td>
                            <sapn class="icon-trash" style="color:red" btn="eliminarProducto"></span>
                            <sapn class="icon-pencil-neg" style="color:cyan;" btn="editarProducto"></span>
                        </td>
                        <td>${producto.codigoBarra}</td>
                        <td>${producto.nombre}</td>
                        <td>${producto.precioCompra}</td>
                        <td>${producto.monedaCompra}</td>
                        <td>${producto.precioVenta}</td>
                        <td>${producto.precioMinimo}</td>
                        <td>${producto.monedaVenta}</td>
                        <td>${moment(producto.fechaVencimiento).format(
                          "YYYY-MM-DD"
                        )}</td>
                        <td>${producto.stock}</td>
                        <td>${producto.categoria}</td>
                        <td>${producto.marca}</td>
                        <td>${producto.descripcion}</td>
                        <td>${producto.utilidad}</td>
                    </tr>
                `;
      });
      document.getElementById("table-productos").innerHTML = template;
    })
    .catch((err) => console.log(err));
}

let editar = (producto) => {
  fetch("/editarProducto", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ producto: producto }),
  })
    .then((producto) => producto.json())
    .then((producto) => {
      document.getElementById("CodigoBarraProducto").value =
        producto[0].codigoBarra;
      document.getElementById("nombreProducto").value = producto[0].nombre;
      document.getElementById("precioCompraProducto").value =
        producto[0].precioCompra;
      document.getElementById("monedaCompraProducto").value =
        producto[0].monedaCompra;
      document.getElementById("precioVentaProducto").value =
        producto[0].precioVenta;
      document.getElementById("monedaVentaProducto").value =
        producto[0].monedaVenta;
      document.getElementById("stockProducto").value = producto[0].stock;
      document.getElementById("marcaProducto").value = producto[0].marca;
      document.getElementById("categoriaProducto").value =
        producto[0].categoria;
      document.getElementById("descripcionProducto").value =
        producto[0].descripcion;
      document.getElementById("PrecioMinimoProducto").value =
        producto[0].precioMinimo;
      document.getElementById("utilidadProducto").value = producto[0].utilidad;
      document.getElementById("FechaVencimientoProducto").value = moment(
        producto[0].fechaVencimiento
      ).format("YYYY-MM-DD");
    })
    .catch((error) => {
      console.log(error);
    });
};

let eliminar = (producto)=>{
    fetch('/eliminarProducto',{
        headers : {
            'Content-Type' : 'application/json'
        },
        method : 'POST',
        body : JSON.stringify({producto:producto})
    }).then(message=>message.text())
    .then(message=>{
        alert(message)
        mostrar();
    })
    .catch((error=>{
        console.log(error)
    }))
}

let actualizar = () => {
  getData("/actualizarProducto");
};

document.getElementById("table-productos").addEventListener("click", (e) => {
  let btn = e.target.getAttribute("btn");
  if (btn !== null) {
    if (btn == "editarProducto") {
      idProducto = e.target.parentElement.parentElement.parentElement.getAttribute("id");
      if (idProducto != null) {
        editar(idProducto);
      }
    }else if(btn=="eliminarProducto"){
        idProducto = e.target.parentElement.parentElement.getAttribute("id");
        let confirmar = confirm("esta seguro que quiere eliminar este producto");
        if(confirmar){
            eliminar(idProducto);
        }else{
            
        }
    }
  }
});
