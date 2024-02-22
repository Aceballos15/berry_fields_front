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

    const newCard = car.filter(card => card.Referencia.trim().toLowerCase().includes(input.value.trim().toLowerCase())) 
    renderCard(newCard) 

    if(newCard.length == 0){
        Swal.fire({
            icon: "error",
            title: "Lo sentimos",
            text: `En este momento no contamos con ${value}`, 
            confirmButtonColor: "#172E58"
        });
    }
})

input.addEventListener('input', (e)=>{
    const value = e.target.value 

    const newCard = cards.filter(card => card.Referencia.trim().toLowerCase().includes(input.value.trim().toLowerCase()))
    renderCard(newCard) 

    if(newCard.length == 0){
        Swal.fire({
            icon: "error",
            title: "Lo sentimos",
            text: `En este momento no contamos con ${value}`, 
            confirmButtonColor: "#172E58"
        });
    }
})
 

// Creacion de las cards dinamicas 
const createCards = cards => {
    // Ordenar el array de productos, colocando primero los que tienen la propiedad 'Promosion' establecida como "Si"
    cards.sort((a, b) => {
        if (a.Promosion === "Si" && b.Promosion !== "Si") {
            return -1; // Colocar 'a' antes que 'b'
        } else if (a.Promosion !== "Si" && b.Promosion === "Si") {
            return 1; // Colocar 'b' antes que 'a'
        } else {
            return 0; // Mantener el orden actual
        }
    });

    // Generar el HTML de las tarjetas
    const html = cards.map(card => {
        let cardHtml = `
        <div class="dad_cards" id="product">
            <div class="dad_card" data-id="${card.ID}" data-price="${card.Precio_detal}" data-referencia="${card.Referencia}" data-imagen="${card.Imagen_publica.url}" data-promosion="${card.Promosion}">
                <div class="card__img">
                    <img src="${card.Imagen_publica.url}" class="card-img-top" alt="...">
        `;
        if (card.Promosion === "Si") {
            cardHtml += `
                <div class="cont-promocion">
                    <div class="cont-recursos">
                        <img src="/IMG/Recurso 3.svg" alt="">
                        <span>Promo</span>
                    </div>
                </div>
            `;
        }
        cardHtml += `
                </div>      
                <div class="card_container"> 
                    <div class="card__title">
                        <h5 class="card-title" id="title">${card.Referencia}</h5>
                    </div>
                    <div class="card__price" id="title"> 
                        <h6>$${new Intl.NumberFormat('es-CO').format(card.Precio_detal)}</h6> 
                        <div class="prom">
                            <div class="container-botones"> 
                                <button class="sumar">AGREGAR</button> 
                            </div> 
                        </div>
                    </div>
                </div>
                <span class="contador__dinamico"></span>
            </div>
        </div>
        `;
        return cardHtml;
    }).join('');

    return html;
};

// Renderizacion de las cards
const renderCard = (cards) => {
    const itemCard = createCards(cards);
    dad.innerHTML = itemCard;
};
