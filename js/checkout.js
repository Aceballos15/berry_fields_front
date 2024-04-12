//API para mandar la info 
let chechkout = [] 

//Busqueda por boton 
const btnValidar = document.querySelector('.validacion'); 

//Para almacenar la fecha actual
let fechaHoy = []
const ObtenerFecha = ()=>{
    const fecha = new Date(); 
    const dia = String(fecha.getDate()).padStart(2, '0'); 
    const mes = String(fecha.getMonth() + 1).padStart(2 , '0'); 
    const anio = fecha.getFullYear()
    return `${anio}-${mes}-${dia}` 
}

fechaHoy = ObtenerFecha() 

let ID = []
let Direccion = []
let Cedula =[] 
let Municipio = [] 
let Total = 0 

let cedulaCheckout = []

//Deshabilitar y habilitar la direccion y boton
const btnPedir = document.querySelector('.pagar') 

const inputDireccion = document.querySelector('#direccion')

const containerDireccion = document.querySelector('#direccion') 
const cedula = document.querySelector('#cedula')

//Funcion para mostrar en el checkout 
const check = async ()=>{
   
    if(chechkout.length === 1){        
        await chechkout.forEach(i =>{

            //ID del cliente y cedula 
            ID = i.ID 

            cedulaCheckout = i.Documento  
            
            
            Municipio = i.Municipio.Municipio
            
            const Departamento = i.Departamento1.Departamento

            const direccion_completa = `${i.Direccion}, ${Municipio}, ${Departamento}, Colombia`; 

            //Validacion de existencia de municipio 
            if(Municipio == undefined){

                containerDireccion.value = `${i.Direccion}, ${Departamento}` 

            }else{
                containerDireccion.value = `${i.Direccion}, ${Municipio}, ${Departamento} `
            }
            
            Cedula = cedula.value 
            
            Direccion = inputDireccion.value
            
            inputDireccion.addEventListener('keyup', (e)=>{ 
                valor = e.target.value
            
                Direccion =  valor
            })

            inputDireccion.disabled = false 

        });  
        
    }
    else{

        let containerCedula = document.querySelector('#direccion')

        containerCedula.value = ` ` 

        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Lo sentimos no estas en nuestra base de datos",
            confirmButtonColor: "#172E58", 
            confirmButtonText: "Registrate aquí"
            

        })//Evento al boton de la alerta y redireccion a el formulario de registro 
        .then(result =>{
            if(result.isConfirmed){
                window.location.href = "/HTML/registro.html" 
            }
        });

        containerCedula.disabled = true 
    }
}; 


//Fucion para buscar cedula 
const searchDirection = async (cedula)=>{

    URL_API_Reporte_Clientes = `https://nexyapp-f3a65a020e2a.herokuapp.com/zoho/v1/console/Clientes_Berry?where=Documento=="${cedula}"` 
    
    //Funcion para traer la info 
    const initCheckout = async ()=>{
        await fetch(URL_API_Reporte_Clientes)
        .then(response => response.json()) 
        .then(data =>{
            chechkout = data; 
            
            //Funcion para mostrar en el checkout
            check(); 
        }) 
        .catch(error =>console.error(error)) 
        
    };     

    initCheckout(); 

}

//Funcion para mostrar alerta 
const alerta = async ()=>{
    let containerCedula = document.querySelector('#direccion')

    containerCedula.value = `` 

    Swal.fire({
        icon: "error",
        title: "Hay algo mal",
        text: "Tu numero de documento debe de tener almenos 5 caracteres", 
        confirmButtonColor: "#172E58"
    });
    // btnPedir.disabled = true 
    inputDireccion.disabled = true 
}

//Constante para almacenar la info del input 
const inputCedula = document.querySelector('#cedula')

let Doc= [] 

//Busqueda por enter
inputCedula.addEventListener('keydown', (e)=>{
    const cedula = e.target.value 

    if(e.keyCode == 13){ 
        if(cedula.trim().length >= 5){ 
            Doc = cedula
            searchDirection(cedula);  
        }  
        else{
           alerta(); 
        }
    }
})


btnValidar.addEventListener('click', async ()=>{
    const cedula = inputCedula.value 
    
    if(cedula.trim().length >= 5){
        Doc = cedula
        await searchDirection(cedula) 
    }  
    else if(cedula.trim().length <5){
        await alerta(); 
    }

})