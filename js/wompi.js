let totalWompi = 0 


btnCart.addEventListener('click', ()=>{
    
    let DATA = []

    carts.forEach(price =>{
        const precio = price.price * price.quantity

        totalWompi = totalWompi + precio; 

    })

    const total = {
        amount: Total
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
        const URL_API = "https://da94-190-0-247-117.ngrok-free.app/api/Signature"
    
        fetch(URL_API, post)
        .then(response => response.json())
        .then(data =>{
            
            DATA = data; 

            DATA.forEach(datos =>{
               
                let pagar = document.querySelector('#container-pagar')  
                
                let pay = document.createElement('div')
                pay.classList.add('wompi') 
            
                pay.innerHTML= `
                
                <div class="pagar"> 
                    <form action="https://checkout.wompi.co/p/" method="GET"> 
                    <input type="hidden" name="public-key" class="key" value="${datos.key}" /> 
                    <input type="hidden" name="currency" class="currency" value="${datos.currency}" />
                    <input type="hidden" name="amount-in-cents" class="amount" value="${datos.amount}" />
                    <input type="hidden" name="reference" class="reference" value="${datos.reference}" /> 
                    <input type="hidden" name="signature:integrity" class="signature" value="${datos.signature}"/> 
                    
                    <button class="pagar" id="pagar" type="submit"> PAGAR </button> 
                    
                    </form>
                <div> 
                `
                pagar.appendChild(pay) 
            })
            
        })
        .catch(error => console.log(error))
        
    }
    catch(error){
        console.error(error) 
    }


}) 