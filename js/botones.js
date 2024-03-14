//Funcion para mostrar el la casilla de buscar 
const btnBuscar = document.querySelector('.btn-buscar') 
const containerBuscador = document.querySelector('.filtro_input')
btnBuscar.addEventListener('click', ()=>{
    containerBuscador.classList.toggle('filtro_active')  
}); 

const btn_envio = document.querySelector('.btn__envio'); 

btn_envio.addEventListener('click', ()=>{
    Swal.fire({
        icon: "info",
        title: "Información de envío",
        text: "Los envios en Medellín se realizan martes, jueves y viernes; en el Oriente Antioqueño y Alto de las Palmas el día Miércoles.", 
        confirmButtonColor: "#172E58"
    });
})

const btnLogo = document.querySelector('.logo')

btnLogo.addEventListener('click', ()=>{
    setTimeout(()=>{
        location.reload() 
    }, 1000)
})

const alerta = ()=>{
    Swal.fire({
        icon: "info",
        title: "Política de Tratamientos de Datos Personales",
        html: `
        <div>
            <h5>1. Objetivo</h5>
            <p>La presente política tiene como objetivo garantizar el derecho constitucional de todas las personas a conocer, actualizar, rectificar y suprimir la información que se haya recogido sobre ellas, en cumplimiento de la ley 1581 de 2012 y demás normas aplicables.</p> 
            <h5>2. Alcance:</h5>
            <p>Esta política se aplica a todas las personas, en especial a los administradores del manejo de datos personales, asi como a los encargados del tratamiento de datos personales.</p>

            <h5>3. Tratamiento y Finalidad:</h5>
            <p>Se establece el deber de acreditar la puesta a disposición de las políticas de tratamiento de información, así como el contenido mínimo del aviso de privacidad.</p>

            <h5>4. Deberes:</h5>
            <p>La entidad se compromete a garantizar la seguridad, transparencia y libertad en el tratamiento de los datos personales, bajo el consentimiento previo, expreso e informado del titular de la información.</p>

            <h5>5. Derechos de los titulares:</h5>
            <p>Los titulares de los datos personales tienen derecho a conocer, actualizar, rectificar y suprimir su información, así como a solicitar prueba de la autorización otorgada a la entidad para el tratamiento de sus datos.</p>

            <h5>6. Autorización de CHACAM TRADING SAS</h5>
            <p>En cumplimiento de la ley 1581 de 2012, la empresa CHACAM TRADING SAS NIT 900674991</p>
            <p>solicita la autorización para el tratamiento de datos personales, comprometiéndose a cumplir con los deberes y garantizar los derechos de los titulares de la información Este modelo de política de tratamiento de datos personales se basa en las disposiciones de la

            2012tione como finalidad garantizar el adecuado tratamiento y protección de los</p> 
        </div>

        `, 
        confirmButtonColor: "#172E58", 
        customClass:{
            container: 'custom-swal-container',
            popup: 'custom-swal-popup',
            title: 'custom-swal-title',
            content: 'custom-swal-content',
            confirmButton: 'custom-swal-confirm-button'
        }
    });
}

const politica = document.querySelector('.politica'); 

politica.addEventListener('click',()=>{
   alerta(); 
})

const politica_img = document.querySelector('.footer__politica'); 

politica_img.addEventListener('click', ()=>{
    alerta(); 
})