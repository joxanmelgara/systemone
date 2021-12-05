document.getElementById('buscar').addEventListener('submit',(e)=>{
    e.preventDefault();
    let valor = document.getElementById('codigo').value;
    if(valor !== ""){
        fetch('/buscar',{
            headers : {
                'Content-Type' : 'application/json'
            },
            method : 'POST',
            body : JSON.stringify({codigo:valor})
        }).then(productos=>productos.json()).then(
            productos =>{
               calculo(productos[0])
            }
        ).catch(err=>console.log(err))
    }
})
let total = 0.00;
let id = [];
function calculo(params) {
    let row = document.createElement('tr');
    let col;
    let table = document.getElementById('cuerpoFactura');
    let importe = params.precioVenta;  
    
    total += importe ;
    id.push({id:params.id,nombre:params.nombre})
    col = `
                <td>${params.codigoBarra}</td>
                <td>${params.nombre}</td>
                <td>${params.precioVenta}</td>
                <td>1</td>
                <td>${params.precioVenta}</td>
    `;
    row.innerHTML = col;

    table.append(row);

    document.getElementById('totalFactura').innerHTML = total;
}
document.getElementById('guardar-factura').addEventListener('click',()=>{
    document.getElementById('cuerpoFactura').innerHTML = "";
    total = 0.00;
    document.getElementById('totalFactura').innerHTML = total;

    console.log("Los productos Guardados fueron los sig.")

    id.forEach(id=>{
        console.log(id)
    })

})