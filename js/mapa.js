// let map; 
// let geocoder; 

// document.querySelector('.btn_mapa').addEventListener('submit', (event)=>{
//     event.preventDefault(); 
// }) 

// const mapa = document.querySelector('.btn_mapa'); 

// let direccion_value = document.querySelector('#direccion');  
// let muni_value = document.querySelector('#municipio'); 
// let depa_value = document.querySelector('#departamento'); 

// let marcador; 

// let latitud = []; 
// let longitud = []; 

// const capturarNuevasCoordenadas = () => {
//     if (marcador) {
//         const nuevaLatitud = marcador.getPosition().lat();
//         const nuevaLongitud = marcador.getPosition().lng();

//         latitud = nuevaLatitud; 
//         longitud = nuevaLongitud; 
//     }
    
// };


// function initMap() {
//     map = new google.maps.Map(document.getElementById("map"), {
//       center: { lat: 4.9815673, lng: -75.1703632 }, // Coordenadas iniciales del mapa
//       zoom: 6,
//     });
//     geocoder = new google.maps.Geocoder();

//     map.addListener("click", (event) => {
//         // Si ya existe un marcador, eliminarlo antes de agregar uno nuevo
//         if (marcador) {
//             marcador.setMap(null); // Eliminar el marcador anterior del mapa
//         }
    
//         // Crear un nuevo marcador en la posición del clic
//         marcador = new google.maps.Marker({
//             map,
//             position: event.latLng,
//             title: "Posición seleccionada"
//         });
    
//         // Centrar el mapa en la nueva posición del marcador
//         map.setCenter(event.latLng);
    
//         // Capturar las nuevas coordenadas
//         capturarNuevasCoordenadas();
//     });
     
// }; 

// const mostrarDireccion = () => {
//     const new_direccion = `${direccion_value.value}, ${muni_value.value}, ${depa_value.value}, Colombia`;
//     const geoCode = new google.maps.Geocoder();

//     geoCode.geocode({ address: new_direccion }, function (results, status) {
//         if (status == "OK") {
//             const latLng = results[0].geometry.location;
//             map.setCenter(latLng);
//             new google.maps.Marker({
//                 map,
//                 position: latLng,
//                 title: new_direccion
//             });

//             // Capturar las coordenadas
//             const lat= latLng.lat();
//             const long= latLng.lng();
            
//             latitud = lat; 
//             longitud = long; 
//         } else {
//             console.log('La dirección no se pudo encontrar debido a: ' + status)
//         }
//     });
// }

// let fecha = [];
// const actual = () => {
//   const fecha = new Date();
//   const dia = String(fecha.getDate()).padStart(2, "0");
//   const mes = String(fecha.getMonth() + 1).padStart(2, "0");
//   const anio = fecha.getFullYear();
//   return `${anio}-${mes}-${dia}`;
// };

// fecha = actual(); 


// mapa.addEventListener('click', ()=>{
//     mostrarDireccion(); 
//     initMap(); 
// })

// const btn_enviar = document.querySelector('.btn-registro'); 

// btn_enviar.addEventListener('click', ()=>{

//     const cedula =  document.querySelector('#cedula').value 
//     const nombre = document.querySelector('#nombre').value
//     const apellido = document.querySelector('#apellido').value 

//     const cliente = `${cedula} - ${nombre} ${apellido}`; 

//     console.log(cliente); 

//     const url_coordenadas = `https://nexyapp-f3a65a020e2a.herokuapp.com/zoho/v1/console/direccion_envio`

//     const data = {
//         Clientes: cliente, 
//         Fecha: fecha, 
//         Estado:"Activo", 
//         Longitud: longitud, 
//         Latitud: latitud, 
//         Direccion: `${direccion_value.value}, ${muni_value.value}, ${depa_value.value}` 
//     }

//     const new_direccion = {
//         method : 'POST', 
//         headers : {
//             "Content-Type": "application/json",
//         }, 
//         body: JSON.stringify(data)
//     }

//     fetch(url_coordenadas, new_direccion)
//     .then(res => res.json())
//     .then(data => console.log(data))
//     .catch(err =>{
//         console.error(err) 
//     })
// })


// const hidden_map= document.querySelector('.map')

// mapa.addEventListener('click', ()=>{
//     hidden_map.classList.toggle('hidden-map')
// })