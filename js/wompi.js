const btnCarrito = document.querySelector('.pagar')  
const closeWompi = document.querySelector('.revisarPedido')
const containerWompi = document.querySelector('.container-wompi')

btnCarrito.addEventListener('click', ()=>{
    containerWompi.classList.toggle('hidden-wompi') 
})

let totalWompi = 0 

window.addEventListener('DOMContentLoaded', ()=>{
    totalWompi = 0; 
})

btnCarrito.addEventListener('click', ()=>{ 

    let DATA = []
    
    carts.forEach(price =>{
        const precio = price.price * price.quantity
        
        totalWompi = totalWompi + precio; 
    })
    
    const total = {
        amount: totalWompi , 
        ID:ID , 
    }


    const post = {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(total) 
    }

   
    const URL_API = "https://app-berry-fields.onrender.com/api/Signature" 

    fetch(URL_API, post)
    .then(response => response.json())
    .then(data =>{
        
        DATA = data; 

        DATA.forEach(datos =>{
            let wompi = document.querySelector('.btnWompi')
            
            let pay = document.createElement('div')
            pay.classList.add('wompi') 
        
            wompi.innerHTML= `
            
            <div>   
                <form id="formWompi" action="https://checkout.wompi.co/p/" method="GET"> 
                <input type="hidden" name="public-key" class="key" value="${datos.public_key}" />  
                <input type="hidden" name="currency" class="currency" value="${datos.currency}" />
                <input type="hidden" name="amount-in-cents" class="amount" value="${datos.amount}" />
                <input type="hidden" name="reference" class="reference" value="${datos.reference}" /> 
                <input type="hidden" name="signature:integrity" class="signature" value="${datos.signature}"/>
                <input type="hidden" name="redirect-url" value="https://www.theberryfields.com/"/>

                </form>
            <div> 
            `
            const form = document.getElementById('formWompi').submit();  
                
            let Products = [] 
            
        
            carts.forEach(product =>{
               const productDetail = {
                    id : product.product_id, 
                    price: product.price,
                    name: product.reference, 
                    quantity:product.quantity
               }

               Products.push(productDetail) 

            })

            const mapSend = { 
                Referencia: datos.reference, 
                Productos : Products,
                Fecha: fechaHoy, 
                Total: totalWompi, 
                ID1: ID,
                Direccion:Direccion 
            }
            
            const producto = {
                method:'POST', 
                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify(mapSend)  
            }

            try{
                const URL_BERRY = "https://nexyapp-f3a65a020e2a.herokuapp.com/zoho/v1/console/verificar_pedido"
                fetch(URL_BERRY,producto) 
                .then(data =>{
                    console.log(data.status)}) 

            }
            catch(error){
                console.error(error)
                console.error(error.message)
            }
           

        })
    })
    .catch(error => console.error(error)) 

    btnPedir.disabled = true 

}) 