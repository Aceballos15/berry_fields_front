let totalWompi = 0 

const btnCarrito = document.querySelector('.pagar')  
const closeWompi = document.querySelector('.revisarPedido')
const containerWompi = document.querySelector('.container-wompi')

closeWompi.addEventListener('click', ()=>{
    containerWompi.classList.toggle('hidden-wompi') 
})

btnCarrito.addEventListener('click', ()=>{
    containerWompi.classList.toggle('hidden-wompi') 
})


btnCarrito.addEventListener('click', ()=>{
    
    
    let DATA = []
    
    carts.forEach(price =>{
        const precio = price.price * price.quantity
        
        totalWompi = totalWompi + precio; 
        
    })
    

    const total = {
        amount: totalWompi , 
        ID:ID 
    }

    const post = {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(total) 
    }

    //console.log(post) 

    try{
        const URL_API = "https://2f2d-190-0-247-117.ngrok-free.app/api/Signature" 
    
        fetch(URL_API, post)
        .then(response => response.json())
        .then(data =>{
            
            DATA = data; 

            DATA.forEach(datos =>{
                let wompi = document.querySelector('.btnWompi') 
                
                let pay = document.createElement('div')
                pay.classList.add('wompi') 
            
                pay.innerHTML= `
                
                <div>   
                    <form action="https://checkout.wompi.co/p/" method="GET"> 
                    <input type="hidden" name="public-key" class="key" value="${datos.public_key}" />  
                    <input type="hidden" name="currency" class="currency" value="${datos.currency}" />
                    <input type="hidden" name="amount-in-cents" class="amount" value="${datos.amount}" />
                    <input type="hidden" name="reference" class="reference" value="${datos.reference}" /> 
                    <input type="hidden" name="signature:integrity" class="signature" value="${datos.signature}"/>
                    
                    <button class="Wompi" id="Wompi" type="submit"> 
                        <img src="/IMG/close.svg" alt=""> 
                    </button> 
                    
                    </form>
                <div> 
                `
                wompi.appendChild(pay)

                let product =[] 
                let id = []
                let referencia = []
                let precio = 0
                let cantidad = 0 
                
                carts.forEach(products =>{
                    id = products.product_id
                    referencia = products.referencia
                    precio = products.price
                    cantidad = products.quantity

                    let newProducts = {
                        Referencia: datos.reference, 
                        Productos: {
                            detail :{
                                id: id, 
                                reference: referencia, 
                                price: precio, 
                                quantity: cantidad 
                            }
                        }
                    }
                    
                    product.push(newProducts); 
                })
                

                
                console.log(product)
                const producto = {
                    method:'POST', 
                    headers: {
                        'Content-Type': 'application/json'
                    },

                    body: JSON.stringify(product) 
                }

                try{
                    const URL_BERRY = "https://nexyapp-f3a65a020e2a.herokuapp.com/zoho/v1/console/verificar_pedido"
                    fetch(URL_BERRY,producto) 
                    .then(data =>{
                        console.log(data.status) 
                    }) 

                }
                catch(error){
                    console.error(error)
                    console.error(error.message)
                }

            })
        })
        .catch(error => console.log(error))
        
    }
    catch(error){
        console.error(error) 
    }

}) 