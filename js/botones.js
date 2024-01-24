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
// btnPagar.addEventListener('click', ()=>{
//     containerCheckout.classList.toggle('hidden-ckeckout')
    
// }); 

// const btnClose = document.querySelector('#close-checkout')

// btnClose.addEventListener('click', ()=>{
//     containerCheckout.classList.toggle('hidden-ckeckout')
// })

//Mostrar y ocultar menu categoria 

// const btnFilterCategoria = document.querySelector('.icon-filter')
// const containerItems = document.querySelector('.main-wrapper')

//Botones para ocultar el filtro por categoria 
// const btnTodo = document.querySelector('#todo') 
// const btnAudi = document.querySelector('#audifonos') 
// const btnPower = document.querySelector('#powerbank') 
// const btnCarg = document.querySelector('#cargador')
// const btnCable = document.querySelector('#cables')
// const btnBocinas = document.querySelector('#bocina') 


// const body = document.querySelector('body')

// // body.addEventListener('click', ()=>{
//     containerCheckout.classList.toggle('hidden-checkout')
// })

//Habilitar y deshabilitar el boton de paggar cuando el carrito no tenga algo 
// const carrito = document.querySelector('.cart') 

// carrito.addEventListener('click', ()=>{
//     if(precio.length == 0 ||precio == 0){
//        btnPagar.disabled = true
//     }
//     else{
//         btnPagar.disabled = false 
//     }
// }) 


