//Url de la api para traer los datos 
URL_PRODUCTOS= "https://zoho.accsolutions.tech/API/v1/Productos_Berry"

//Variable para almacenar la info de la api 
let cards = [] 

//constantes para guardar la info 
const input = document.querySelector('#buscar')
const dad = document.querySelector('.cards_dad')


//Cargado de la pagina 
window.addEventListener('DOMContentLoaded', async()=>{
    const data = await loadCards()
    cards = data.data
    renderCard(cards)
})
//Llamar a la api y traer los datos 
const loadCards = async () => {
    try {
        const response = await fetch(URL_PRODUCTOS);
        // Verificar si la respuesta fue exitosa
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al cargar los datos:', error);
        return null;  // O puedes manejar el error de otra manera
    }
};


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

    cards.sort((a, b) => {
        // Si a tiene promoción y b no, a debe ir antes
        if (a.Promosion === "Si" && b.Promosion !== "Si") {
            return -1;
        }
        // Si b tiene promoción y a no, b debe ir antes
        if (b.Promosion === "Si" && a.Promosion !== "Si") {
            return 1;
        }
        // En cualquier otro caso, no cambia el orden
        return 0;
    });

    // Generar el HTML de las tarjetas}
    const products = cards.map(card => {

        const nuevos_productos = card.Productos_Berry.length;
        
        const berry = card.Productos_Berry;
        
        let collection = [];

        let Producto_compuesto_L = card.Producto_Compuesto; 
        
        for (let contador = 0; contador < nuevos_productos; contador++) {
                
            let cardHtml = `
             <div class="dad_cards" id="product">
                 <div class="dad_card" data-id="${berry[contador].ID}" data-price="${berry[contador].Precio}" data-referencia="${berry[contador].Referencia}" data-imagen="${berry[contador].Imagen.url}" data-promocion="${berry[contador].Promocion}" data-gramos="${berry[contador].Cantidad}" data-product="${Producto_compuesto_L}" data-idcompuesto="${berry[contador].Productos.ID}"> 
            <div class="card__img">
                <img src="${berry[contador].Imagen.url}" class="card-img-top" alt="...">
            `;
            if (berry[contador].Promocion === "Si") {
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
                                <h5 class="card-title" id="title">${berry[contador].Referencia}</h5>
                            </div>
                            <div class="card__price" id="title">
                                <h6>$${new Intl.NumberFormat('es-CO').format(berry[contador].Precio)}</h6>
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
        
            collection.push(cardHtml);
        }

        return collection.join(''); // Unir todas las cadenas HTML en una sola cadena
    }).join(''); // Unir todas las tarjetas en una sola cadena

    return products;
};


// Renderizacion de las cards
const renderCard = (cards) => {
    const itemCard = createCards(cards);
    dad.innerHTML = itemCard;
};
