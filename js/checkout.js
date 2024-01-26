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
const Direccion = document.querySelector('#direccion')

let ID = []
let subTotal = []
let ivaTotal = [] 
let Detalle = []
let DetalleTotal = [] 

let Total = 0 

let cedulaCheckout = []
let products = []

let totalWompi = 0 

const wompi = ()=>{

    const btnClose = document.querySelector('.btn-cierre-checkout')  

    
    let DATA = []
    
    carts.forEach(price =>{
        const precio = price.price * price.quantity
        
        totalWompi = totalWompi + precio; 
        
    })
    
    btnClose.addEventListener('click', ()=>{
        containerCheckout.classList.toggle('hidden-ckeckout') 

        totalWompi = 0
       
    })

    const total = {
        amount: totalWompi 
    }

    const post = {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(total) 
    }

    //console.log(post) 

    try{
        const URL_API = "https://f307-190-0-247-116.ngrok-free.app/api/Signature"
    
        fetch(URL_API, post)
        .then(response => response.json())
        .then(data =>{
            
            DATA = data; 

            DATA.forEach(datos =>{
                let pagar = document.querySelector('.container-btnWompi')  
                
                let pay = document.createElement('div')
                pay.classList.add('wompi') 
            
                pay.innerHTML= `
                
                <div>   
                    <form action="https://checkout.wompi.co/p/" method="GET"> 
                    <input type="hidden" name="public-key" class="key" value="${datos.public_key}" />  
                    <input type="hidden" name="currency" class="currency" value="${datos.currency}" />
                    <input type="hidden" name="amount-in-cents" class="amount" value="${datos.amount}" />
                    <input type="hidden" name="reference" class="reference" value="${datos.reference}" /> 
                    <input type="hidden" name="signature:integrity" class="signature" value="${datos.signature}"/>  
                    
                    <button class="btnWompi" id="pagar" type="submit"> PAGAR </button> 
                    
                    </form>
                <div> 
                `
                pagar.appendChild(pay) 
            })
            
        })
        .catch(error => console.log(error))
        
    }
    catch(error){
        console.error(error) 
    }

}

//Funcion para mostrar en el checkout 
const check = ()=>{
    setTimeout(()=>{
        if(chechkout.length === 1){
            chechkout.forEach(i =>{
                //Direccion del cliente 
                Direccion.innerText = `${i.Direccion}` 
                
                ID = i.ID 
    
                //Cedula 
                cedulaCheckout = i.Documento  
    
                //Guardar info de cada valor  
    
                wompi();         
    
            });  
        }
        else{
            
            try{
                Direccion.innerText = ` ` 
                Swal.fire({ 
                    icon: "error", 
                    title: "Lo sentimos...",
                    text: "No estas en nuestra base de datos",
                    footer: '<a href="/HTML/registro.html">Registrate</a>' 
                }); 

            }
            catch(error){
                console.error(error) 
            }

            
    
        }
    },3000)
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
