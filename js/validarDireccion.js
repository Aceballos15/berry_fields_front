// const validarDireccion = document.querySelector('.validacion')

// const valueAdress = document.querySelector('#direccion').value 

// const valueCedula = document.querySelector('#cedula')

// let value = [] 

// let dataCliente = [] 

// valueCedula.addEventListener('keyup', (e)=>{
//     value = e.target.value 
// })

// validarDireccion.addEventListener('click', async()=>{
    
//     const urlCliente = `https://nexyapp-f3a65a020e2a.herokuapp.com/zoho/v1/console/Clientes_Report?max=1000&where=Documento=="${value}"`  

//     fetch(urlCliente)
//     .then(res => res.json())
//     .then(data => {
//         dataCliente = data 
//     })

//     console.log(dataCliente) 

//     // let Direccion = []; 

//     // dataCliente.forEach(datos => {

//     //     Direccion = {
            
//     //         Direccion1: datos.Direccion, 
//     //         Departamento :datos.Departamento1.Departamento,
//     //         Municipio : datos.Municipio.Municipio,
//     //         Country : "Colombia" 
//     //     }

//     // })
    
//     // const urlIp = `https://nexyapp-f3a65a020e2a.herokuapp.com/zoho/v1/console/direccion_envio` 


//     // await fetch(urlIp, Direccion)
//     // .then(res => res.json())
//     // .then(data => {
//     //     console.log(data) 
//     // }) 

// })