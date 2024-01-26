let totalWompi = 0 

// const wompi = ()=>{

//     const btnClose = document.querySelector('.btn-cierre-checkout')  

    
//     let DATA = []
    
//     carts.forEach(price =>{
//         const precio = price.price * price.quantity
        
//         totalWompi = totalWompi + precio; 
        
//     })
    
//     btnClose.addEventListener('click', ()=>{
//         containerCheckout.classList.toggle('hidden-ckeckout') 

//         totalWompi = 0
       
//     })

//     const total = {
//         amount: totalWompi 
//     }

//     const post = {
//         method: 'POST', 
//         headers: {
//             'Content-Type': 'application/json',
//             'Access-Control-Allow-Origin': '*'
//         },
//         body: JSON.stringify(total) 
//     }

//     //console.log(post) 

//     try{
//         const URL_API = "https://f307-190-0-247-116.ngrok-free.app/api/Signature"
    
//         fetch(URL_API, post)
//         .then(response => response.json())
//         .then(data =>{
            
//             DATA = data; 

//             DATA.forEach(datos =>{
//                 let pagar = document.querySelector('.container-btnWompi')  
                
//                 let pay = document.createElement('div')
//                 pay.classList.add('wompi') 
            
//                 pay.innerHTML= `
                
//                 <div>   
//                     <form action="https://checkout.wompi.co/p/" method="GET"> 
//                     <input type="hidden" name="public-key" class="key" value="${datos.public_key}" />  
//                     <input type="hidden" name="currency" class="currency" value="${datos.currency}" />
//                     <input type="hidden" name="amount-in-cents" class="amount" value="${datos.amount}" />
//                     <input type="hidden" name="reference" class="reference" value="${datos.reference}" /> 
//                     <input type="hidden" name="signature:integrity" class="signature" value="${datos.signature}"/>  
                    
//                     <button class="btnWompi" id="pagar" type="submit"> PAGAR </button>  
                    
//                     </form>
//                 <div> 
//                 `
//                 pagar.appendChild(pay) 
//             })
            
//         })
//         .catch(error => console.log(error))
        
//     }
//     catch(error){
//         console.error(error) 
//     }

// }