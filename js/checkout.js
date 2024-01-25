//API para mandar la info 
url = "https://nexyapp-f3a65a020e2a.herokuapp.com/zoho/v1/console/Pedidos_1hora" 
//Variable para almacenar info de la api 
let chechkout = [] 

//Para almacenar la fecha actual
let fechaHoy = []
const obtenerFecha = ()=>{
    const fecha = new Date(); 
    const dia = String(fecha.getDate()).padStart(2, '0'); 
    const mes = String(fecha.getMonth() + 1).padStart(2 , '0'); 
    const anio = fecha.getFullYear(); 
    return `${anio}-${mes}-${dia}` 
}

fechaHoy = obtenerFecha() 

//Constantes para agregar al checkout cuando ya se tiene un registro del cliente 
const Nombre = document.querySelector('.nombre')
const Apellido = document.querySelector('.apellido')
const Tipo_documento = document.querySelector('.tipo-doc')
const Celular = document.querySelector('.celular')
const Correo = document.querySelector('.correo') 
const Departamento = document.querySelector('.departamento')
const Municipio = document.querySelector('.municipio')
const Direccion = document.querySelector('.direccion')

let ID = []
let subTotal = []
let ivaTotal = [] 
let Detalle = []
let DetalleTotal = [] 

let Total = 0 

let cedulaCheckout = []
let products = []

//Funcion para mostrar en el checkout 
const check = ()=>{
    if(chechkout.length === 1){
        chechkout.forEach(i =>{
            //Direccion del cliente 
            Direccion.innerText = `${i.Direccion}` 
            
            ID = i.ID 

            //Cedula 
            cedulaCheckout = i.Documento  

            //Guardar info de cada valor  

        });  
    }
    else{
        Direccion.innerText = ` ` 
    }
}; 


//Constante para almacenar la info del input 
const inputCedula = document.querySelector('.cedula')

let Doc= []

//Se agrego un evento a la constante 

inputCedula.addEventListener('keyup', (e)=>{
    //variable para obtener el valor 
    const cedula = e.target.value
    
    Doc = cedula 
    
    //console.log(Doc)  
    //API con parametro de busqueda en cedula 
    URL_API_Reporte_Clientes = `https://nexyapp-f3a65a020e2a.herokuapp.com/zoho/v1/console/Clientes_Report?max=1000&where=Documento=="${cedula}"`   

    //Funcion para traer la info 
    const initCheckout = ()=>{
        fetch(URL_API_Reporte_Clientes)
        .then(response => response.json())
        .then(data =>{
            chechkout = data; 
            //console.log(data)  
            
            //Funcion para mostrar en el checkout
            check(); 

        }) 
        .catch(error =>console.log(error))
        
    };     
    initCheckout(); 
}); 

//Condicion cuando no traiga info de la API 


const btnGuadarCheckout = document.querySelector('.form-submit')

//Declaraciones para los valores totales 
let IvaTotal = 0
let SubTOTAL = 0 
let id = []

btnCart.addEventListener('click', ()=>{
    carts.forEach(product =>{

        //console.log(product) 
        
        //Iva de cada producto 
        const iva = product.price *0.19 
        
        const ivatotal = iva * product.quantity
        
        ivaTotal = Math.floor(ivatotal)
        
        //Subtotal de los productos 
        const subtotal = product.price - ivatotal
        
        subTotal  = Math.ceil(subtotal) 

        const total =  product.price * product.quantity

        //Declaracion para el total de la factura 
        let Iva = 0

        DetalleTotal = total 

        Total = Total += total 

        Iva = Total * 0.19 

        IvaTotal = Math.ceil(Iva) 

        SubTOTAL = Total - IvaTotal 

        // console.log(IvaTotal) 

        //id de cada producto
        id = product.product_id

        //cambio  de precio (str) a (int)

        const precioProduct = product.price *1 

        let new_products = { 
            Producto: id,
            Precio: precioProduct,
            Total : DetalleTotal, 
            Cantidad : product.quantity, 
            IVA: 0, 
            Utilidad: 0,
            Cargo_por_venta: 0, 
            Asesor: "1889220000132110360"
        } 

        products.push(new_products); 
        //Declaracion a detalle de todo el objeto de productos 
        Detalle = products  

        // console.log(Total) 

    }) 

    if(chechkout.length == 1){
        const jsonCliente =  { 
            Fecha : fechaHoy, 
            Clientes: ID,
            Detalle: Detalle, 
            Estado: "Pendiente", 
            Total: Total,
            IVA_total: 0,
            Subtotal : Total 
        } 

        const factura = {
            Cliente : ID, 
            Zona: "1889220000130974457", 
            Tipo_Factura: "Credito", 
            Aseso: "1889220000132110360", 
            Financieras: "1889220000132718855", 
            Bodega: "1889220000131977652", 
            Redes2 : "No", 
            Fecha: fechaHoy, 
            Vendedor: "1889220000131684707", 
            Subtotal : Total, 
            Total: Total, 
            Iva_Total: 0, 
            RT_Pago_Digital: 0, 
            Otras_Deducciones: 0, 
            Observacion: " ", 
            Cargo_por_ventas: 0, 
            Rete_Fuente: 0, 
            Rete_ICA: 0, 
            Rete_IVA: 0, 
            Envio: 0, 
            Item: products
        }

        const envioCkeckout = {
            method : 'POST', 
            headers : {
                'Content-Type' : 'application/json'
            }, 
            body: JSON.stringify(factura)    
        }



        //API para mandar factura  
        const URL_API_FACTURACION = "https://nexyapp-f3a65a020e2a.herokuapp.com/zoho/v1/console/Remision" 
        
        fetch(URL_API_FACTURACION, envioCkeckout) 
        .then(response => response.json())
        .then(data =>{
            console.log('Respuesta', data)
            // Swal.fire({ 
            //     icon: "success",
            //     title: "Excelente",
            //     text: "Tu pedido fue recibido", 
            // }); 

            // const reiniciar = (()=>{
            //     location.reload();
            // })  

            // setTimeout(()=>{
            //     reiniciar() 
            // }, 4000)

        })  
    }else{
        // Swal.fire({ 
        //     icon: "error", 
        //     title: "Lo sentimos...",
        //     text: "No estas en nuestra base de datos",
        //     footer: '<a href="/HTML/registro.html">Registrate</a>' 
        // }); 
    }
    
})