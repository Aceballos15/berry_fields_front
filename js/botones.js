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
        title: "Información de envío",
        text: "Los envios en Medellín se realizan martes, jueves y viernes; en el Oriente Antioqueño y Alto de las Palmas el día Miércoles.", 
        confirmButtonColor: "#172E58"
    });
})

const btnLogo = document.querySelector('.logo')

btnLogo.addEventListener('click', ()=>{
    setTimeout(()=>{
        location.reload() 
    }, 1000)
})
