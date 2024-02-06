//Url de la api para traer los datos 
URL_PRODUCTOS= "https://nexyapp-f3a65a020e2a.herokuapp.com/zoho/v1/console/Productos_Berry"

//Variable para almacenar la info de la api 
let cards = [] 

//constantes para guardar la info 
const input = document.querySelector('#buscar')
const dad = document.querySelector('.cards_dad')


//Cargado de la pagina 
window.addEventListener('DOMContentLoaded', async()=>{
    const data = await loadCards()
    cards = data
    renderCard(cards)
})
//Llamar a la api y traer los datos 
const loadCards = async()=>{
    const response = await fetch(URL_PRODUCTOS) 
    return await response.json() 
}


//Funcion para los filtros de busqueda y renderizar los productos 
input.addEventListener('keyup', (e)=>{
    const value = e.target.value 
    const newCard = cards.filter(card => card.Referencia.toLowerCase().includes(input.value.toLowerCase())) 
    renderCard(newCard)

    console.log(newCard) 

    if(newCard.length == 0){
        Swal.fire({
            icon: "error",
            title: "Lo sentimos",
            text: `En este momento no contamos con ${value}`, 
        });
    }
})
 

//Creacion de las cards dinamicas 

const createCards = cards => cards.map (card =>  
    
    ` 
    <div class="dad_cards" id="product">
        <div class="dad_card" data-id="${card.ID}" data-price="${card.Precio_detal}" data-referencia="${card.Referencia}" data-imagen="${card.Imagen_publica.url}">
            <div class="card__img">
                <img src="${card.Imagen_publica.url}" class="card-img-top" alt="...">
            </div>

            <div class="card_container"> 
                <div class="card__title">
                    <h5 class="card-title" id="title">${card.Referencia}</h5>
                </div>

                <div class="card__price" id="title"> 
                    <h6>$${new Intl.NumberFormat('es-CO').format(card.Precio_detal)}</h6> 

                    <div class="container-botones"> 
                        <button class="sumar">AGREGAR</button> 
                    </div> 
                </div> 
        
            </div>

        </div>
    </div>
    
    `).join(' ') 


    
//Renderizacion de las cards
const renderCard = (cards) =>{
    const itemCard = createCards(cards)
    dad.innerHTML = itemCard
}
