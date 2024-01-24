btnCart.addEventListener('click', ()=>{
    let pagar = document.querySelector('#container-pagar')

    //obtener fecha 
    // Crear un nuevo objeto de fecha
    var fechaActual = new Date();

    // Obtener el año, mes, día, hora, minutos y segundos
    var año = fechaActual.getFullYear();
    var mes = fechaActual.getMonth() + 1; // Los meses en JavaScript van de 0 a 11, por lo que se suma 1.
    var dia = fechaActual.getDate();
    var hora = fechaActual.getHours();
    var minutos = fechaActual.getMinutes();
    var segundos = fechaActual.getSeconds();

    // Formatear la fecha y la hora según tus necesidades
    var fechaFormateada = año + '-' + (mes < 10 ? '0' : '') + mes + '-' + (dia < 10 ? '0' : '') + dia;
    var horaFormateada = (hora < 10 ? '0' : '') + hora + ':' + (minutos < 10 ? '0' : '') + minutos + ':' + (segundos < 10 ? '0' : '') + segundos;


    //datos obligatorios de wompi 
    const key = "pub_test_nhoUd3AyHBCMEbX7W3nq8SSAGr3g622b"; 
    const currency = "COP"; 
    const amount = Total ; 
    const reference = Total + fechaFormateada + horaFormateada; 

    console.log(Total) 

    let pay = document.createElement('div')
    pay.classList.add('wompi') 


    pay.innerHTML= `
    
    <div class="pagar"> 
        <form action="https://checkout.wompi.co/p/" method="GET"> 
        <input type="hidden" name="public-key" class="key" value="${key}" /> 
        <input type="hidden" name="currency" class="currency" value="${currency}" />
        <input type="hidden" name="amount-in-cents" class="amount" value="${amount}" />
        <input type="hidden" name="reference" class="reference" value="10400323502024-01-24T13:30:30Z" />
        <input type="hidden" name="signature:integrity" class="signature" value="4ea03960ddf927f72b718769a2191b5a175380fff4f8b8de3d592eafc2f5ee6e"/>

        <button class="pagar" id="pagar" type="submit"> PAGAR </button> 
        
        </form>
    <div> 
    `
    
    pagar.appendChild(pay) 
})