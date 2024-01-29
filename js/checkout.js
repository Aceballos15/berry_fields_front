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
    const anio = fecha.getFullYear()
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
// const Municipio = document.querySelector('.municipio')
// const Direccion = document.querySelector('#direccion')

let ID = []
let Direccion = []
let Cedula =[] 
let subTotal = []
let ivaTotal = [] 
let Detalle = []
let DetalleTotal = [] 

let Total = 0 

let cedulaCheckout = []
let products = []

let totalWompi = 0 


const btnCheck = document.querySelector('.submit-check')  

// btnCheck.addEventListener('click', ()=>{
//     containerCheckout.classList.toggle('hidden-ckeckout') 
// })

// //Funcion para mostrar en el checkout 
const check = ()=>{
   
    if(chechkout.length === 1){        
        chechkout.forEach(i =>{ 
            ID = i.ID 
            //Cedula 
            cedulaCheckout = i.Documento  
            
            let containerCedula = document.querySelector('.container-direccion')
        
            let direccion = document.createElement('div') 
            direccion.classList.add('input-direccion') 
        
            direccion.innerHTML =`
            <div class="direccion"> 
                <label for="direccion" >Direccion: </label>
                <input type="text" class="inputCheck" id="direccion"  placeholder="" value="${i.Direccion}"> 
                <span class="lineaInput"></span>
            </div> 
            `
            containerCedula.appendChild(direccion) 
           
            
            const inputDireccion = document.querySelector('#direccion')

            const cedula = document.querySelector('#cedula')

            Cedula = cedula.value 

            Direccion = inputDireccion.value

        });  
        
    }
}; 



//Constante para almacenar la info del input 
const inputCedula = document.querySelector('#cedula')

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