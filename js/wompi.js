const btnCarrito = document.querySelector('.pagar')  

let totalWompi = 0 

btnCarrito.addEventListener('click', ()=>{ 

    const cedula = document.querySelector('#cedula')
    const direccion = document.querySelector('#direccion')

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
    
    //validacion y alertas de la cedula y direccion 

    if(cedula.value.trim() == 0 || direccion.value.trim() == 0){
        Swal.fire({
            icon: "error",
            title: "Hay algo mal",
            text: "Antes de pagar debes de validar primero tu numero de documento y dirección de envio",
            confirmButtonColor: "#172E58"
        }).then((result) =>{
            if(result.isConfirmed){
                cedula.focus(); 
            }
            else if(result.dismiss === Swal.DismissReason.cancel){
                cedula.focus(); 
            }
        });
    }  
    else if(totalWompi == 0){
        Swal.fire({
            icon: "error",
            title: "Hay algo mal",
            text: "Tu carrito debe de tener al menos uno de nuestros deliciosos productos", 
            confirmButtonColor: "#172E58"
        }); 
    } 
    else{
       
        const URL_API = "https://berryfieldsbackend-production.up.railway.app/api/Signature" 
    
        fetch(URL_API, post)
        .then(response => response.json() )
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
                let Products = [] 
                
            
                carts.forEach(product =>{
                   const productDetail = {
                        id : product.product_id, 
                        price: product.price,
                        name: product.referencia,
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
                    Direccion:Direccion, 
                    Descripcion: "Berry Fields", 
                    Estado : "PENDING",
                    Clientes: ID 
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
                    .then(response => response.json())
                    .then(data =>{
                        console.log(data)
                        const form = document.getElementById('formWompi').submit();
                    }
                    )
                }
                catch(error){
                    console.error(error)
                    console.error(error.message)
                }
               
    
            })
        })
        .catch(error => console.error(error)) 
    
        btnPedir.disabled = true 
    
        sessionStorage.clear(); 
    }


})