const btnCarrito = document.querySelector('.pagar')  

let totalWompi = 0 

const descuento = document.querySelector('#descuento')

let value = []

descuento.addEventListener('keyup', (e)=>{
    value = e.target.value 
}) 

const bntDescuento = document.querySelector('.bntDescuento')

let Descuento = 0 
let Data = [] 
let IdDescuento = [] 

let porcentaje = 0; 

let Cantidad_Descuento = 0; 

bntDescuento.addEventListener('click',()=>{

    //Validacion de descuento 
    try{
        if(value.length > 1){

            const url__descuento = `https://nexyapp-f3a65a020e2a.herokuapp.com/zoho/v1/console/All_Descuentos_Berries?where=Estado%20%3D%3D%22Activo%22%26%26Codigo_Descuento%20%3D%3D%20%22${value}%22%26%26Cantidad_de_cupones%3E0`
        
            fetch(url__descuento)
            .then(res => res.json())
            .then(data =>{
                Data = data 
    
                //Aplicaion del descuento 
                if(Data.length === 1){ 
                    let precioCard = 0 
                    carts.forEach(price =>{
                        const precio = price.price * price.quantity
                        
                        precioCard = precioCard + precio  
                    })

                    let porcentajeAlerta = 0 
                    
                    Data.forEach(percent =>{
                        porcentaje = percent.Percent 
                        
                        const suma = precioCard * porcentaje / 100; 
                        
                        const totalPercent = precioCard - suma 
                        
                        Descuento = totalPercent 
    
                        totalWompi = totalPercent 
    
                        IdDescuento = percent.ID 

                        porcentajeAlerta = parseInt(porcentaje) 

                        Cantidad_Descuento = percent.Cantidad_de_cupones; 
                        
                        console.log(Cantidad_Descuento)   

                    })
                    Swal.fire({
                        icon: "success", 
                        title: "Perfecto",
                        text: `Has obtenido un descuento del ${porcentajeAlerta}% en tu compra`, 
                        confirmButtonColor: "#172E58" 
                    });

                    //Parseo de el monto 
                    const precioDescuento = new Intl.NumberFormat('es-CO').format(totalWompi)
                    const precio = document.querySelector('.precio-total'); 
                    precio.innerText = `$${precioDescuento}` 
                }
                else{
                    
                    Swal.fire({
                        icon: "error",
                        title: "Hay algo mal",
                        text: "Tu codigo de descuento ya fue usado o no existe", 
                        confirmButtonColor: "#172E58"
                    });
                     
                }

            })
        }
        else{ 
            Swal.fire({
                icon: "error",
                title: "Hay algo mal",
                text: "Para poder validar tu descuento debes de colocarlo",  
                confirmButtonColor: "#172E58"
            });
        }

    }
    catch(err){
        console.error('El codigo no existe o ya fue usado', err) 
    }
})
//Funcion para cuando se aplica un Descuento 
const funcionPostDescuento = ()=>{
    let DATA =[] 

    const total = {
        amount: totalWompi , 
        ID:ID , 
    }
    const TotalDescuento = {
        amount : Descuento, 
        ID: ID 
    }
    const PostDescuento = {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(TotalDescuento)   
    }
    const post = {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(total)  
    }
    
    const URL_API = "https://berryfieldsbackend-production.up.railway.app/api/Signature" 

    fetch(URL_API, PostDescuento)  
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
        
        let suma = 0
        let total = 0; 
        //Aplicaion del descuento a cada producto 
        carts.forEach(product =>{
        suma = product.price * porcentaje /100 
        total = product.price - suma
        const productDetail = {
            id : product.product_id, 
            price: total,   
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

const funcionPost =() =>{
    let DATA =[] 


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
                if(data){ 
                    const form = document.getElementById('formWompi').submit(); 
                }
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

const patch__Descuento = ()=>{
    const estadoDescuento = `https://nexyapp-f3a65a020e2a.herokuapp.com/zoho/v1/console/All_Descuentos_Berries/${IdDescuento}` 
    
        const descuento = Cantidad_Descuento - 1;
    
        const estado = {
            Cantidad_de_cupones : descuento 
        }
    
        const opciones = {
            method: 'PATCH', 
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify(estado) 
        }
    
        fetch(estadoDescuento, opciones)
        .then(res => res.json())
        .then(data =>{
            
    }) 
}

btnCarrito.addEventListener('click', ()=>{ 

    //Creacion de el precio para la card 
    if(Data.length == 0|| Data.length == undefined ||Data.length == null){  
        carts.forEach(price =>{
            const precio = price.price * price.quantity
        
            totalWompi = totalWompi + precio; 
        }) 
    }
    
    //validacion y alertas de la cedula y direccion 

    if(cedula.value.trim() == 0 || direccion.value.trim() == 0){
        Swal.fire({
            icon: "error",
            title: "Hay algo mal",
            text: "Antes de pagar debes de validar primero tu numero de documento y dirección de envío",
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
    else if(Data.length ===1){
        funcionPostDescuento();  
        patch__Descuento(); 
        
    }
    else{
        funcionPost();  
        
    }
})