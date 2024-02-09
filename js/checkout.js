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


let ID = []
let Direccion = []
let Cedula =[] 


let Total = 0 

let cedulaCheckout = []


const btnPedir = document.querySelector('.pagar') 


//Funcion para mostrar en el checkout 
const check = ()=>{
   
    if(chechkout.length === 1){        
        chechkout.forEach(i =>{ 
            ID = i.ID 
            //Cedula 
            cedulaCheckout = i.Documento  
            
            let containerCedula = document.querySelector('#direccion')

            containerCedula.value = `${i.Direccion}` 
           
            const cedula = document.querySelector('#cedula')
            
            
            Cedula = cedula.value 
            
            const inputDireccion = document.querySelector('#direccion')

            Direccion = inputDireccion.value
            
            inputDireccion.addEventListener('keyup', (e)=>{ 
                valor = e.target.value
            
                Direccion =  valor
            })
            //Deshabilitar el boton de pedir 
            btnPedir.disabled = false
        });  


        
    }
    else{

        let containerCedula = document.querySelector('#direccion')

        containerCedula.value = ` ` 

        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Lo sentimos no estas en nuestra base de datos",
            footer: '<a href="/HTML/registro.html">Registrate aca</a>'
        });

        btnPedir.disabled = true
    }
}; 

//Fucion para buscar cedula 
const searchDirection = (cedula)=>{

    URL_API_Reporte_Clientes = `https://nexyapp-f3a65a020e2a.herokuapp.com/zoho/v1/console/Clientes_Report?max=1000&where=Documento=="${cedula}"`
    
    //Funcion para traer la info 
    const initCheckout = ()=>{
        fetch(URL_API_Reporte_Clientes)
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
const alerta = ()=>{
    let containerCedula = document.querySelector('#direccion')

    containerCedula.value = `` 

    Swal.fire({
        icon: "error",
        title: "Hay algo mal",
        text: "Tu documento debe de tener almenos 7 caracteres", 
    });
    btnPedir.disabled = true 
}

//Constante para almacenar la info del input 
const inputCedula = document.querySelector('#cedula')

let Doc= []

//Busqueda por enter
inputCedula.addEventListener('keydown', (e)=>{
    const cedula = e.target.value 


    if(e.keyCode == 13){ 
        if(cedula.trim().length >= 7){
            Doc = cedula
            searchDirection(cedula);  
        }  
        else{
           alerta(); 
        }
    }
})


//Busqueda por boton 
const btnValidar = document.querySelector('.validacion'); 

btnValidar.addEventListener('click', ()=>{
    const cedula = inputCedula.value 
    
    if(cedula.trim().length >= 7){
        Doc = cedula
        searchDirection(cedula) 
    }  
    else if(cedula.trim().length <7){
        alerta(); 
    }

})