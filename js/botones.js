//Mostrar carrito 
const btnCart = document.querySelector('.cart')  
const categoria = document.querySelector('.container-cart')  


//Funcion para mostrar el la casilla de buscar 
const btnBuscar = document.querySelector('.btn-buscar') 
const containerBuscador = document.querySelector('.filtro_input')
btnBuscar.addEventListener('click', ()=>{
    containerBuscador.classList.toggle('filtro_active')  
}); 

