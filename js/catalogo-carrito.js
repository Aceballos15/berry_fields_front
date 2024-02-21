//Url de la api 
URL_PRODUCTOS= "https://nexyapp-f3a65a020e2a.herokuapp.com/zoho/v1/console/Productos_Berry"  

//Variables de contenido 
let listProductsHTML = document.querySelector('.cards_dad') 
let listCartHTML = document.querySelector('.container-cart-products') 

const cantidad = document.querySelector('.contador-productos')
const total = document.querySelector('.precio-total') 

//Contenedores de listas y las cards del carrito (a su vez son variables universales para modificar)
 
let carts = []  

let listProducts = []


//Funcion para tomar el evento de suma y resta para los productos 
listProductsHTML.addEventListener('click', (event) => { 
    let positionClick = event.target;   
    if (positionClick.classList.contains("sumar")){ 

        alertify.success('Agregado con éxito al carrito')
        // Encuentra el elemento padre con la clase "card"
        const cardElement = positionClick.closest('.dad_card');
        if (cardElement) {
            // Obtén el product_id del atributo data-id del elemento encontrado
            const product_id = cardElement.dataset.id;
            const price = cardElement.dataset.price; 
            const referencia = cardElement.dataset.referencia; 
            const imagen = cardElement.dataset.imagen;
                        
            addToCart(product_id,price, referencia,imagen);  
        }
    } 
    
});


//Constante de info para añadir al carrito 
const addToCart = (product_id,price,referencia,imagen) =>{  
    let position = carts.findIndex((value) => value.product_id == product_id);  
    if(carts.length <= 0){
        carts = [{
            product_id : product_id, 
            quantity : 1, 
            price : price, 
            referencia : referencia,
            imagen : imagen, 
        }] 
    }else if (position < 0){
        carts.push({
            product_id : product_id, 
            quantity : 1, 
            price: price, 
            referencia: referencia, 
            imagen: imagen,
        })
    }else{
        carts[position].quantity = carts[position].quantity + 1; 
    }

    addCartToHTML(); 
    // Llamad de funcion para el local storage
    addCartToMemory(); 
}


//Funcion para el local storage 
const addCartToMemory = () =>{
    sessionStorage.setItem('cart', JSON.stringify(carts));
} 


//Almacenar la cantidad para cantidad
let Quantity = [] 

//Alamcenar el precio total 
let precio = []

//Variable para almacenar el total 
let totalValor = "";
//Funcion para añadir al carrito 
const addCartToHTML = (product_id = "") =>{
  
    let totalQuantity = 0; 
    let totalPrice = 0; 


    if (!carts.find(cart => cart.product_id === product_id )) { 
        listCartHTML.innerHTML = '';
    }else{
     
    }

    if(carts.length > 0){
        carts.forEach(cart =>{ 

            if (isNaN(cart.quantity)) {
                cart.quantity = 1;
            }

            totalQuantity = totalQuantity + cart.quantity; 
            price = cart.price * cart.quantity;

            //Convercion de numero a valor de moneda en el precio de las cards
            valor = new Intl.NumberFormat('es-CO').format(price) 

            //Suma de todos los productos 
            totalPrice += price ;  

            //Convercion de numero a valor de moneda de la suma de todos los productos  
            totalValor = new Intl.NumberFormat('es-CO').format(totalPrice) 

            signature = cart.product_id


            if (product_id === "") {

                //creacion de elementos para el carrito
                let newCart = document.createElement('div') 
                newCart.classList.add('container-cart-products')
                newCart.dataset.id = cart.product_id; 
              
                newCart.innerHTML = ` 
                
                <div class="cart-product" data-id="${cart.product_id}" > 
                    <div class="row-product">
                        <div class="info-cart-product hidden-product"> 
    
                            <div class="imagen-carrito">
                                <img src="${cart.imagen}" alt=""> 
                            </div> 

                            <p class="nombre-product">
                            ${cart.referencia} 
                            </p>
                            <span class="precio-product">
                                $${valor}  
                            </span>
    
                            <div class="quantity">
                                <div class="cantidad">
                                    <h6>Cantidad: </h6>
                                </div>
                                <button class="minus"> - </button>
                                <input type="text" value="${cart.quantity}" class="product-quantity">
                                <button class="plus"> + </button>
                            </div>
                           
    
                            <button class="container-icon-trash">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="icon-trash" viewBox="0 0 16 16">
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                            </svg>
                            </button> 
    
                        <div> 
                            
                        </div>
                    </div> 
                </div>    
                `;

                
                listCartHTML.appendChild(newCart) 
                
                
            }else{
                if (product_id === cart.product_id) {
                    listCartHTML.addEventListener('keyup', (e) => {

                        let input = e.target;
                        let quantity = input.closest('.quantity').previousElementSibling;

                        price = cart.price * cart.quantity;
                        valor = new Intl.NumberFormat('es-CO').format(price)

                        quantity.innerHTML = `$${valor}`;
                        
                    });
                }
                
            }        
         
            
        });  

    }
   addCartToMemory();

    total.innerText = `$${totalValor}`  
    cantidad.innerText = totalQuantity; 
    
    precio = totalPrice

    Quantity = totalQuantity 

}

//Capturar el valor del input (Nuevo codigo)
listCartHTML.addEventListener('click', (event) =>{
    let positionClick = event.target; 
    const cardElement = positionClick.closest('.cart-product');

    if(cardElement){
        
        if (positionClick.classList.contains('product-quantity')){
            
           //let products = document.querySelectorAll('.product-quantity');

                positionClick.addEventListener('keyup', (e) => {
                    const product_id = cardElement.dataset.id;
                    e.target.value = e.target.value.replace("-", "")
                    e.target.value = e.target.value.replace(/[^0-9]/g, '');
                    quantity = e.target.value

                    changeQuantitykeyboard(product_id, quantity);
                });
            
        }
    }
})

//Funcion para cambiar cantidad con el teclado (Nuevo codigo)
const changeQuantitykeyboard = (product_id, quantity) =>{
    let positionItemInCart = carts.findIndex((value)=> value.product_id == product_id); 
    if (positionItemInCart >= 0){
      

        carts[positionItemInCart].quantity = parseInt(quantity); 

        if(carts[positionItemInCart].quantity <= 0){
            carts[positionItemInCart].quantity = 1; 
            //carts.splice(positionItemInCart, 1) 
           totalValor = 0;
           product_id = "";
        }
        
    }
    //Añadir a la memoria y al carrito para refrescar  
    addCartToMemory(); 
    addCartToHTML(product_id); 
}



//Captura del id con los botones minus, plus y delete
listCartHTML.addEventListener('click', (event) =>{
    let positionClick = event.target; 
    const cardElement = positionClick.closest('.cart-product');

    if(cardElement){

        
        if (positionClick.classList.contains('minus')|| positionClick.classList.contains('plus')|| positionClick.classList.contains('icon-trash')){
            
            // const btnPagar = document.querySelector('.pagar')
            // Quantity == 1?btnPagar.disabled = true: btnPagar.disabled = false;   
            
            const product_id = cardElement.dataset.id; 
            let type = 'minus'
            if(positionClick.classList.contains('plus')){
                type = 'plus'; 
            }
            if(positionClick.classList.contains('icon-trash')){
                type = 'delete'
            }
            
            //funcion para cambiar cantidad
            changeQuantity(product_id, type)
        }
    }
})

//Funcion para cambiar cantidad 
const changeQuantity = (product_id, type) =>{
    let positionItemInCart = carts.findIndex((value)=> value.product_id == product_id); 
    if (positionItemInCart >= 0){
        //Evaluacion de type  y ejecucion de declaraciones 
        switch (type){
            case 'plus': 
                carts[positionItemInCart].quantity = parseInt(carts[positionItemInCart].quantity) + 1; 
                break; 
            //Funcion para eliminar del carrito 
            case 'delete': 
                carts[positionItemInCart].quantity = carts[positionItemInCart].quantity ==0;   
                let value = carts[positionItemInCart].quantity == 0; 
                if(value > 0){ 
                    carts[positionItemInCart],quantity = value; 
                    //Splice para quitar los elementos 
                    carts.splice(positionItemInCart, 1)
                    totalValor = 0;
                    
                }
                
            break; 
                //Funcion para disminuir cantidad del carrito 
            case 'minus': 
                let valueChange = carts[positionItemInCart].quantity -1; 
                if(valueChange >0){
                    carts[positionItemInCart].quantity = valueChange; 
                }
                else if(valueChange == 0 || isNaN(valueChange)){
                    carts[positionItemInCart].quantity = 0; 
                    carts.splice(positionItemInCart, 1) 
                   totalValor = 0;
                }
            break; 
        }
    }
    //Añadir a la memoria y al carrito para refrescar  
    addCartToMemory(); 
    addCartToHTML(); 
}

//Funcion para llamar a la api 
const initApp =() =>{
    fetch(URL_PRODUCTOS) 
    .then(response => response.json())
    .then(data =>{
        listProducts = data;  

        //obtener info de la memoria 

        if(sessionStorage.getItem('cart')){
            carts = JSON.parse(sessionStorage.getItem('cart')); 
            addCartToHTML(); 
        }
    })
    .catch(error => console.error(error));
}; 

initApp(); 