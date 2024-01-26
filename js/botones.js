//Mostrar carrito 
const btnCart = document.querySelector('.cart')  
const categoria = document.querySelector('.container-cart')  


//Funcion para mostrar el la casilla de buscar 
const btnBuscar = document.querySelector('.btn-buscar') 
const containerBuscador = document.querySelector('.filtro_input')
btnBuscar.addEventListener('click', ()=>{
    containerBuscador.classList.toggle('filtro_input')  
}); 


//Botones de el checkout 
const btnPagar = document.querySelector('.pagar')
const containerCheckout = document.querySelector('.dad-checkout')
const btnCerrar = document.querySelector('.boton-cerrar')



//Abrir checkout 
btnPagar.addEventListener('click', ()=>{
    containerCheckout.classList.toggle('hidden-ckeckout')
    
}); 

//Habilitar y deshabilitar el boton de paggar cuando el carrito no tenga algo 
const carrito = document.querySelector('.cart') 

carrito.addEventListener('click', ()=>{
    if(precio.length == 0 ||precio == 0){
       btnPagar.disabled = true
    }
    else{
        btnPagar.disabled = false 
    }
}) 


