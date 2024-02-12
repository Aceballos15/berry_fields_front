//Funcion para mostrar el la casilla de buscar 
const btnBuscar = document.querySelector('.btn-buscar') 
const containerBuscador = document.querySelector('.filtro_input')
btnBuscar.addEventListener('click', ()=>{
    containerBuscador.classList.toggle('filtro_active')  
}); 

const btn_envio = document.querySelector('.btn__envio'); 

btn_envio.addEventListener('click', ()=>{
    Swal.fire({
        icon: "info",
        title: "Informacion de envio",
        text: "Los envios a Medellin se realizan los martes, jueves y viernes y para el Oriente el día miercoles", 
        confirmButtonColor: "#172E58"
    });
})