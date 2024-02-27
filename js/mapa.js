// let map; 
// let geocoder; 

// document.querySelector('.btn_mapa').addEventListener('submit', (event)=>{
//     event.preventDefault(); 
// }) 

// const mapa = document.querySelector('.btn_mapa'); 

// let direccion_value = document.querySelector('#direccion');  
// let muni_value = document.querySelector('#municipio'); 
// let depa_value = document.querySelector('#departamento'); 


// function initMap() {
//     map = new google.maps.Map(document.getElementById("map"), {
//       center: { lat: 4.9815673, lng: -75.1703632 }, // Coordenadas iniciales del mapa
//       zoom: 6,
//     });
//     geocoder = new google.maps.Geocoder();
    
//     // map.addEventListener("click", function(event) {
//     //     agregarMarcador(event.latLng);
//     // }); 
// }; 


// // function agregarMarcador(latLng) {
// //     // Eliminar marcadores previos
// //     mapMarkers = [];
// //     mapMarkers.forEach(marker => marker.setMap(null));
    
// //     // Crear marcador en la posición clicada
// //     const marker = new google.maps.Marker({
// //         position: latLng,
// //         map: map,
// //         draggable: true // Permite arrastrar el marcador para ajustar la ubicación
// //     });
    
// //     // Mostrar las coordenadas en el campo de entrada
// //     document.getElementById("latitud").value = latLng.lat();
// //     document.getElementById("longitud").value = latLng.lng();
    
// //     // Agregar marcador a la lista de marcadores
// //     mapMarkers.push(marker);
// // }


// const mostrarDireccion = ()=>{
//     const new_direccion = `${direccion_value.value}, ${muni_value.value}, ${depa_value.value}, Colombia`; 
//     const geoCode = new google.maps.Geocoder(); 

//     geoCode.geocode({address: new_direccion}, function (results, status){
//         if(status == "OK"){
//             const latLng = results[0].geometry.location; 
//             mapa.setCenter = (latLng); 
//             new google.maps.Marker({
//                 map, 
//                 position: latLng, 
//                 title: new_direccion
//             }); 
//         }else{
//             console.log('La direccion no se pudo encontrar debido a: ' + status)
//         }
//     })
// }

// mapa.addEventListener('click', ()=>{
//     mostrarDireccion(); 
// })

// direccion_value.addEventListener('blur', ()=>{
//     initMap()
// })

// const hidden_map= document.querySelector('.map')

// mapa.addEventListener('click', ()=>{
//     hidden_map.classList.toggle('hidden-map')
// })