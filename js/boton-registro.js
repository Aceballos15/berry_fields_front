const url = 'https://zoho.accsolutions.tech/API/v1/Clientes'  

let datos = []

document.querySelector('.btn-registro').addEventListener('submit', (event)=>{
    event.preventDefault(); 
})

let habilitar = false  

//Funcion para crear un nuevo cliente 
const cedulaNoRegistrada = ()=>{ 
    
    //Declaracion de variables para obtener el valor de cada input
    const valorNombre = document.querySelector('#nombre').value
    const valorApellido = document.querySelector('#apellido').value
    const valorTipoCedula = document.querySelector('#tipo-doc').value
    const valorCedula = document.querySelector('#cedula').value
    const valorCelular = document.querySelector('#celular').value
    const valorCorreo = document.querySelector('#correo').value
    const valorDepartamento = document.querySelector('#departamento').value
    const valorMunicipio = document.querySelector('#municipio').value 
    const valorDireccion = document.querySelector('#direccion').value
    const fechaNacimiento = document.querySelector('#fecha_nacimiento').value 
    const natu = natural.value 
    const juri = juridica.value  
    
    //Formatos JSON para enviar el post a la base de datos
    const celular = valorCelular.toString(); 
    //JSON para regimen de persona natural
    const objetoJSON = {
        // Added_User: addedUser,
        Nombre: valorNombre, 
        Primer_Apellido: valorApellido,  
        Tipo1: valorTipoCedula, 
        Documento: valorCedula, 
        Celular: celular, 
        Correo: valorCorreo,  
        Retenedor: "No", 
        Fecha_de_Nacimiento: fechaNacimiento, 
        Acepta_que_la_factura_sea_enviada_por_medios_electr_nicos : "Si",
        Departamento1: idDepartamento, 
        Municipio: idMunicipio, 
        Regimen: natu, 
        Estado: "Activo",
        Cupo: 0, 
        Tipo: "Detal", 
        Dias: 0, 
        location : {
            country2: "Colombia", 
            address_line_12: valorDireccion, 
            state_province2: valorDepartamento, 
            district_city2: valorMunicipio, 
            postal_Code2: "05001" 
        }
        
    }
    //JSON para regimen de persona juridica
    const objetoJSON2 = {
        // Added_User: addedUser, 
        Nombre: valorNombre, 
        Primer_Apellido: valorApellido,  
        Tipo1: valorTipoCedula, 
        Documento: valorCedula, 
        Celular: celular, 
        Correo: valorCorreo,  
        Retenedor: "No", 
        Fecha_de_Nacimiento: fechaNacimiento, 
        Acepta_que_la_factura_sea_enviada_por_medios_electr_nicos : "Si",
        Departamento1: idDepartamento, 
        Municipio: idMunicipio, 
        Regimen: juri, 
        Estado: "Activo",
        Cupo: 0, 
        Tipo: "Detal", 
        Dias: 0, 
        location : {
            country2: "Colombia ", 
            address_line_12: valorDireccion, 
            state_province2: valorDepartamento, 
            district_city2: valorMunicipio, 
            postal_Code2: "05001" 
        }
        
    }
    
    //Metodos de envio (En este caso post) 
    const personaNatural ={
        method: 'POST', 
        headers : {
            'Content-Type' : 'application/json', 
        }, 
        
        body: JSON.stringify(objetoJSON)
    }; 
    
    const personaJuridica ={
        method : 'POST', 
        headers: {
            'Content-Type': 'application/json' 
        }, 

        body: JSON.stringify(objetoJSON2)
    }; 
    //Condicionales para persona natural y juridica 
    if(natural.checked){ 
        try{
            fetch(url, personaNatural)
            .then(response => response.json())
            .then(data => {
                console.log('Respuesta', data.data)
                Swal.fire({
                    icon: "success", 
                    title: "LISTO",
                    text: "Ya estas creado en nuestra base de datos",
                    footer: '<a href="https://www.theberryfields.com/">Vuelve a tu compra</a>'   
                });

                // Funcion para volver a la pagina principal despues de el registro exitoso
                setTimeout(()=>{
                    window.location.href = "https://www.theberryfields.com/"
                }, 10000) 

            })
            .catch(error => {
                console.error('Fallo en la solicitud', error)
                Swal.fire({
                    icon: "error", 
                    title: "Error",
                    text: "Lo sentimos hay un fallo con tu inscripcion en nuestra base de datos",
                });
            })
        }
        catch(error){
            console.error('Error', error) 
        } 
    }

    if(juridica.checked){
        try{
            fetch(url, personaJuridica)
            .then(response => response.json()) 
            .then(data => {
                datos = data 
                console.log('Respuesta', data.data)

                Swal.fire({
                    icon: "success", 
                    title: "LISTO",
                    text: "Ya estas creado en nuestra base de datos",
                    footer: '<a href="https://www.theberryfields.com/">Vuelve a tu compra</a>'   
                });

                //Funcion para volver a la pagina principal despues de el registro exitoso 
                setTimeout(()=>{
                    window.location.href = "https://www.theberryfields.com/"
                }, 10000) 
            })
        
            .catch(error => {
                console.error('Fallo en la solicitud', error)
                Swal.fire({
                    icon: "error", 
                    title: "Error",
                    text: "Lo sentimos hay un fallo con tu inscripcion en nuestra base de datos",
                });
            })

        }catch(error){
            console.error('error', error) 
        }
    }

}

//Boton para validacion del del cliente 

boton.addEventListener('click', ()=>{ 

    URL_API_Reporte_Clientes = `https://zoho.accsolutions.tech/API/v1/Clientes_Report?where=Documento=="${Documento}"` 

    const validacionCedula = ()=>{
    fetch(URL_API_Reporte_Clientes)
    .then(response => response.json())
    .then(data =>{
        console.log(data.data);
        if (data.data.length === 0) {
            cedulaNoRegistrada() 
        }else{
            cedulaRegistrada()
        }
    })
    
    .catch(error =>{
        console.error('Fallo en la peticion', error) 
    })

    }
    validacionCedula() 
})

//Funcion cuando ya se esta registrado en la base de datos de clientes 
const cedulaRegistrada = ()=>{
    Swal.fire({
        icon: "error", 
        title: "Error",
        text: "Ya estas en nuestra base de datos",
        footer: '<a href="https://www.theberryfields.com/">Regresar al pedido</a>'  
    });
}

//Capturar el valor de la cedula para realizar la busqueda en la api de clientes 
let Documento = []

cedula.addEventListener('keyup', ((e)=>{ 
    const cedula = e.target.value
    Documento = cedula
})) 


let Municipios = [] 

let URL_MUNI = "https://zoho.accsolutions.tech/API/v1/Municipio1" 

//Traer municipios y departamentos 
const muniBusqueda = ()=>{
    fetch(URL_MUNI)
    .then(response => response.json())
    .then(data =>{
        Municipios = data.data
    })
}

muniBusqueda(); 

let Municipio = document.querySelector('.Mun') 

//busqueda del municipio 
Municipio.addEventListener('keyup', (e)=>{ 
    const value = e.target.value 

    Buscar = value 
    
    //Filtrado de municipios 
    const busqueda = Municipios.filter(muni => muni.Municipio.toLowerCase().includes(value.toLowerCase())) 

    //Contenedor de la busqueda de municipio 
    const containerMun = document.querySelector('.municipio')
    containerMun.classList.remove('hidden-mun')

    let NombreMun = []
    let Departamento = []

    //Guardado de municipio 
    busqueda.forEach(nombre =>{
        NombreMun = nombre.Municipio 
        Departamento = nombre.Departamento 
    })

    let inputMun = document.querySelector('.municipio')

    let newMun = document.createElement('div')  

    newMun.classList.add('nombreMuni') 

    inputMun.innerHTML = `
        <div class="NombreMun"> ${NombreMun} </div>  
    `
    const nombreMun = document.querySelector('.NombreMun') 
    
    //Asignacion de departamento y municipio 
    nombreMun.addEventListener('click', ()=>{

        const valorMun = document.querySelector('.Mun') 
        
        valorMun.value = `${NombreMun}` 

        const containerMun = document.querySelector('.municipio')

        containerMun.classList.add('hidden-mun')

        Buscar = NombreMun;  

        const valorDep = document.querySelector('#departamento')

        valorDep.value = `${Departamento}`
    
    });  
}); 

let Buscar = [] 

//Funcion para bsucar los municipios 
Municipio.addEventListener('keyup', (e)=>{ 
    
    Buscar = e.target.value 

    URL_REPORT_MUNICIPIOS = `https://zoho.accsolutions.tech/API/v1/Municipio1?where=Municipio.contains("${Buscar}")` 

    const busquedaMunicipios = ()=>{
        fetch(URL_REPORT_MUNICIPIOS)
        .then(response => response.json())
        .then(data => {
            mun = data.data; 
            recorrido(mun)
        })
        .catch(error =>{
            console.error(error) 
        })
    }
    busquedaMunicipios(); 

}) 

//Funcion para traer el id del municipio y asignarla al departamento  

let idMunicipio = []

let idDepartamento =[] 


const recorrido = (mun)=>{
    mun.forEach(municipio =>{

        idMunicipio = municipio.ID 

        idDepartamento = municipio.ID

    }) 
}