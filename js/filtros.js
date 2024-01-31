//filtros de busqued

//Url de la api para traer los datos 
URL_PRODUCTOS= "https://nexyapp-f3a65a020e2a.herokuapp.com/zoho/v1/console/Productos_Berry"

//Variable para almacenar la info de la api 
let cards = [] 

//constantes para guardar la info 
const input = document.querySelector('#buscar')
const dad = document.querySelector('.cards_dad')


//Cargado de la pagina 
window.addEventListener('DOMContentLoaded', async()=>{
    const data =await loadCards()
    cards = data
    renderCard(cards) 
})
//Llamar a la api y traer los datos 
const loadCards = async()=>{
    const response = await fetch(URL_PRODUCTOS) 
    return await response.json() 
}


//Funcion para los filtros de busqueda 
input.addEventListener('keyup', ()=>{
    const newCard = cards.filter(card => card.Referencia.toLowerCase().includes(input.value.toLowerCase()))
    renderCard(newCard) 
})
 

//Creacion de las cards dinamicas 

const createCards = cards => cards.map (card =>  
    
    ` <div id= "product" class="dad-card"> 
    <div class="card" style="width: 18rem; height: 20rem;" data-id="${card.ID}" data-price="${card.Precio_detal}" data-referencia="${card.Referencia}" data-imagen="${card.Imagen_publica.url}"> 
        <div class="card-body"> 
            <img src="${card.Imagen_publica.url}" class="card-img-top" alt="...">  
            <h5 class="card-title" id="title">${card.Referencia}</h5>   
            <p  class="card-text">${card.Caracteristicas} </p>  
            <h6>$${new Intl.NumberFormat('es-CO').format(card.Precio_detal)}</h6> 
            <div class="container-botones">
                <button class="sumar"> Agregar </button>                                
            </div> 
        </div>                                          
    </div> 
    </div>  `).join(' ') 


    
//Renderizacion de las cards
const renderCard = (cards) =>{
    const itemCard = createCards(cards)
    dad.innerHTML = itemCard
}
