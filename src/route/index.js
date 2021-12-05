const express = require("express");
const router = express.Router();
const { render } = require("ejs");
const conexion = require("../conexion");

router.get("/", (req, res) => {
  try {
    res.render("index.html");
  } catch (error) {}
});

router.post("/saveUsers", async (req, res) => {
  try {
    const {
      CodigoBarra,
      nombre,
      PrecioCompra,
      PrecioVenta,
      stock,
      Categoria,
      marca,
      descripcion,
      PrecioMinimo,
      utilidad,
      FechaVencimiento,
    } = req.body;
    let newUser = {
      CodigoBarra: CodigoBarra,
      nombre: nombre,
      precioCompra: PrecioCompra,
      monedaCompra: "",
      PrecioVenta: PrecioVenta,
      monedaVenta: "",
      stock: stock,
      Categoria: Categoria,
      marca: marca,
      descripcion: descripcion,
      PrecioMinimo: PrecioMinimo,
      utilidad: utilidad,
      fechaVencimiento: FechaVencimiento,
    };
    await conexion.query("INSERT INTO productos set ?", [newUser]);
    res.send("Productos guardados con exito");
  } catch (error) {
    console.log(error);
  }
});

router.post("/actualizarProducto", async (req, res) => {
  try {
    const {
      CodigoBarra,
      nombre,
      PrecioCompra,
      PrecioVenta,
      stock,
      Categoria,
      marca,
      descripcion,
      PrecioMinimo,
      utilidad,
      FechaVencimiento,
      id
    } = req.body;
    await conexion.query(
      `UPDATE productos SET codigoBarra = ?, nombre = ?, precioCompra = ?,monedaCompra = ?, precioVenta = ?,monedaVenta = ?, stock = ?, categoria = ?, marca = ?, descripcion = ?, precioMinimo = ?,utilidad = ?, fechaVencimiento = ? WHERE id = ?`,
      [
        CodigoBarra,
        nombre,
        PrecioCompra,
        "",
        PrecioVenta,
        "",
        stock,
        Categoria,
        marca,
        descripcion,
        PrecioMinimo,
        utilidad,
        FechaVencimiento,
        id
      ]
    );
    res.send("Productos actulizado con exito");
  } catch (error) {
    console.log(error);
  }
});

router.post("/editarProducto", async (req, res) => {
  try {
    const { producto } = req.body;
    let infoProducto = await conexion.query(
      "SELECT * FROM productos WHERE id = ?",
      [producto]
    );
    res.send(infoProducto);
  } catch (error) {
    console.log(error);
  }
});

router.get("/mostrarProductos", async (req, res) => {
  try {
    const productos = await conexion.query(
      "SELECT * FROM productos ORDER BY id DESC LIMIT 20"
    );
    res.send(productos);
  } catch (error) {
    console.log(error);
  }
});

router.post("/buscar", async (req, res) => {
  try {
    const { codigo } = req.body;
    const producto = await conexion.query(
      "SELECT * FROM productos WHERE codigoBarra = ?",
      [codigo]
    );
    res.send(producto);
  } catch (error) {
    console.log(error);
  }
});

router.post('/eliminarProducto',async(req,res)=>{
  try {
    const {producto} = req.body;
    await conexion.query("DELETE FROM productos WHERE id = ?",[producto]);
  } catch (error) {
    console.log(error)
  }
  res.send("producto eliminado con exito.");
});

module.exports = router;
