const btnCarrito = document.querySelector(".pagar");

let totalWompi = 0;

const descuento = document.querySelector("#descuento");

let value = [];

descuento.addEventListener("keyup", (e) => {
  value = e.target.value;
  value = value.toLowerCase(); 
});

const bntDescuento = document.querySelector(".bntDescuento");

let Descuento = 0;
let Data = [];
let IdDescuento = [];

let porcentaje = 0;
let Referencia = [];

let Cantidad_Descuento = 0;

let cupon = [];

const InputCecula = document.querySelector("#cedula");

let NumCedula = [];

InputCecula.addEventListener("keyup", (e) => {
  NumCedula = e.target.value;
});

const InputDireccion = document.querySelector("#direccion");

//Fecha actual 
let fechaActual = [];
const actual = () => {
  const fecha = new Date();
  const dia = String(fecha.getDate()).padStart(2, "0");
  const mes = String(fecha.getMonth() + 1).padStart(2, "0");
  const anio = fecha.getFullYear();
  return `${anio}-${mes}-${dia}`;
};

fechaActual = actual();

bntDescuento.addEventListener("click", () => {

  if(Data.length == 0 || Data.length == undefined || Data.length == null) {
    carts.forEach((price) => {
      const precio = price.price * price.quantity;

      totalWompi = totalWompi + precio;
    });
  }
  //Validacion de la existencia de cliente 
  if(InputDireccion.value == null ||InputDireccion.value == "" ||InputDireccion.value == undefined) {
    Swal.fire({
      icon: "error",
      title: "Hay algo mal",
      text: "Debes validar primero tu numero de documento para aplicar el descuento",
      confirmButtonColor: "#172E58",
    });


  }//Validacion de el total a descontar 
  else if(totalWompi ===0){
    Swal.fire({
      icon: "error",
      title: "Hay algo mal",
      text: "Para aplicar un descuento debes de tener al menos 1 producto", 
      confirmButtonColor: "#172E58",
    });
  }
  else{
    try {//validacion de que exista algo en el campo de descuentos 
      if (value.length > 1) {
        //Validar el cupon de descuento
        const url__descuento = `https://nexyapp-f3a65a020e2a.herokuapp.com/zoho/v1/console/All_Descuentos_Berries?where=Codigo_Descuento.contains(%22${value}%22)%26%26Estado%3D%3D%22Activo%22`; 

        fetch(url__descuento)
          .then((res) => res.json())
          .then((data) => {
            Data = data;

            let uso = [];
            let Fecha_Inicio = [];
            let Fecha_Fin = [];
            //Validacion de existencia de cupon 
            if (Data.length == 0 ||Data.length == null ||Data.length == undefined) {
              Swal.fire({
                icon: "error",
                title: "Hay algo mal",
                text: "Tu cupon de descuento no existe",
                confirmButtonColor: "#172E58",
              });
            } else {//Recorrido de la informacion del cupon 
              Data.forEach((cupon) => {
                uso = cupon.Un_solo_uso;
                Fecha_Inicio = cupon.Fecha_Inicio1;
                Fecha_Fin = cupon.Fecha_Fin1; 
              });

              //Validacion de las fechas
              if (Fecha_Inicio <= fechaActual && Fecha_Fin >= fechaActual) {
                if (uso == "Si") {
                  //Validacion de uso de de cupon para solo una vez
                  const url_verificar_pedido = `https://nexyapp-f3a65a020e2a.herokuapp.com/zoho/v1/console/verificar_pedido_Report?where=Cupon%3D%3D%22${value}%22%26%26Clientes.Documento%3D%3D%22${NumCedula}%22%26%26Estado%3D%3D%22APPROVED%22`;

                  let pedido = [];

                  fetch(url_verificar_pedido)
                    .then((res) => res.json())
                    .then((data) => {
                      pedido = data;

                      if (pedido.length == 0 ||pedido.length == null ||pedido.length == undefined ) {
                        if (Data.length === 1) {
                          let precioCard = 0;
                          carts.forEach((price) => {
                            const precio = price.price * price.quantity;

                            precioCard = precioCard + precio;
                          });

                          let porcentajeAlerta = 0;

                          Data.forEach((percent) => {
                            //Descuento del cupon sobre el total 
                            porcentaje = percent.Porcentaje;

                            const suma = (precioCard * porcentaje) / 100;

                            const totalPercent = precioCard - suma;

                            Descuento = totalPercent;

                            IdDescuento = percent.ID;

                            porcentajeAlerta = parseInt(porcentaje);

                            Cantidad_Descuento = percent.Cantidad_de_cupones;

                            if (percent.Un_solo_uso == "Si") {
                              cupon = percent.Codigo_Descuento;
                            } else {
                              cupon = percent.Codigo_Descuento;
                            }
                          });
                          Swal.fire({
                            icon: "success",
                            title: "Perfecto",
                            text: `Has obtenido un descuento del ${porcentajeAlerta}% en tu compra`,
                            confirmButtonColor: "#172E58",
                          });

                          //Parseo de el monto
                          const precioDescuento = new Intl.NumberFormat(
                            "es-CO"
                          ).format(Descuento); 
                          const precio = document.querySelector(".subtotal");
                          //mostrar el descuento del cupon y el subtotal 
                          precio.innerHTML = `
                            <div class="subtotal_precio">
                                <h6>Subtotal: $${precioDescuento}</h6> 
                            </div>
                            `;
                            const descuento_porcentaje = document.querySelector('.descuento_porcentaje')
                    
                            descuento_porcentaje.innerHTML = `
                            <div class="porcentaje">
                                <h6>Descuento: ${porcentajeAlerta}%</h6>
                            </div>
                            ` 
                        } else {
                          Swal.fire({
                            icon: "error",
                            title: "Hay algo mal",
                            text: "Tu cupon de descuento ya fue usado",
                            confirmButtonColor: "#172E58",
                          });
                        }
                      } else {
                        Swal.fire({
                          icon: "error",
                          title: "Hay algo mal",
                          text: "Este cupon de descuento es de un solo uso",
                          confirmButtonColor: "#172E58",
                        });
                      }
                    });
                }
                //Aplicaion del descuento cuando el uso del cupon tiene mas de un uso
                else if (uso != "Si" &&Fecha_Inicio <= fechaActual &&Fecha_Fin >= fechaActual
                ) {
                  let precioCard = 0;
                  carts.forEach((price) => {
                    const precio = price.price * price.quantity;

                    precioCard = precioCard + precio;
                  });

                  let porcentajeAlerta = 0;

                  Data.forEach((percent) => {
                    porcentaje = percent.Porcentaje;

                    const suma = (precioCard * porcentaje) / 100;

                    const totalPercent = precioCard - suma;

                    Descuento = totalPercent;

                    // totalWompi = totalPercent;

                    IdDescuento = percent.ID;

                    porcentajeAlerta = parseInt(porcentaje);

                    Cantidad_Descuento = percent.Cantidad_de_cupones;

                    if (percent.Un_solo_uso == "Si") {
                      cupon = percent.Codigo_Descuento;
                    } else {
                      cupon = percent.Codigo_Descuento;
                    }
                  });
                  Swal.fire({
                    icon: "success",
                    title: "Perfecto",
                    text: `Has obtenido un descuento del ${porcentajeAlerta}% en tu compra`,
                    confirmButtonColor: "#172E58",
                  });

                  //Parseo de el monto
                  const precioDescuento = new Intl.NumberFormat("es-CO").format(
                    Descuento 
                  );
                  const precio = document.querySelector(".subtotal");

                  precio.innerHTML = `
                    <div class="subtotal_precio">
                        <h6>Subtotal: $${precioDescuento}</h6>
                    </div>
                    `;

                    const descuento_porcentaje = document.querySelector('.descuento_porcentaje')
                    
                    descuento_porcentaje.innerHTML = `
                    <div class="porcentaje">
                        <h6>Descuento del :${porcentajeAlerta}%</h6>
                    </div>
                    `
                }
              }
              else {
                Swal.fire({
                  icon: "error",
                  title: "Hay algo mal",
                  text: "Tu cupon de descuento caduco o aún no inicia",
                  confirmButtonColor: "#172E58",
                });
              }
            }
          });
      } else {
        Swal.fire({
          icon: "error",
          title: "Hay algo mal",
          text: "Para poder validar tu descuento debes de colocarlo",
          confirmButtonColor: "#172E58",
        });
      }
    } catch (err) {
      console.error("El cupon no existe o ya fue usado", err);
    }
  }
});
//Funcion para cuando se aplica un Descuento
const funcionPostDescuento = (percent) => {
    let DATA = [];

      //Aplicacion del descuento a facturacion 
      const TotalDescuento = {
        amount: Descuento,
        ID: ID,
        Fecha: fechaActual
      };
      const PostDescuento = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(TotalDescuento),
      };
    
      //Peticion para encriptacion de datos para wompi 
      const URL_API ="https://berryfieldsbackend-production.up.railway.app/api/Signature";
    
      fetch(URL_API, PostDescuento)
        .then((response) => response.json())
        .then((data) => {
          DATA = data;
    
          DATA.forEach((datos) => {
            let wompi = document.querySelector(".btnWompi");
    
            let pay = document.createElement("div");
            pay.classList.add("wompi");
    
            wompi.innerHTML = `
            
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
            `;
            let Products = [];
    
            let suma = 0;
            let total = 0;

            carts.forEach((product) => {
              const new_gramos = [];   
              const type = product.compuesto;
              suma = (product.price * porcentaje) /100; 
              total  = product.price - suma; 
              if(type == "No"){
                const gramaje = product.gramos.gramos * product.quantity;   
                const id = product.gramos.ID_Product;   
                
                const grams = {
                  ID_Product : id, 
                  Gramos: gramaje 
                }

                new_gramos.push(grams); 
                
              }
              else{
                for(let gr = 0; product.gramos.length; ){
                  
                  const gramaje = product.gramos[gr].Cantidad * product.quantity; 
                  const ref = product.gramos[gr].Referencia; 
                  const id = product.gramos[gr].ID; 

                  const datos_gramos = {
                    ID_Product: id, 
                    Gramos : gramaje, 
                    // Referencia : ref
                  }
                  new_gramos.push(datos_gramos); 
  
                  gr++; 
  
                  if(gr == product.gramos.length){
                    break 
                  }
                }
              }

              const productDetail = {
                id: product.product_id,
                price: total, 
                name: product.referencia,
                quantity: product.quantity,
                gramos :new_gramos
              };
    
              Products.push(productDetail);
            });
    
            Referencia = datos.reference;
            
            //Datos de verificar pedido  
            const mapSend = {
              Referencia: datos.reference,
              Productos: Products,
              Fecha: fechaHoy,
              Total: percent,
              ID1: ID,
              Direccion: Direccion,
              Descripcion: "Berry Fields",
              Estado: "PENDING",
              Clientes: ID,
              Cupon: cupon,
            };
    
            const producto = {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
    
              body: JSON.stringify(mapSend),
            };
            
            //Mandar a verificar pedido para hacer la validacion y creacion de la factura 
            try {
              const URL_BERRY =
                "https://nexyapp-f3a65a020e2a.herokuapp.com/zoho/v1/console/verificar_pedido";
              fetch(URL_BERRY, producto)
                .then((response) => response.json())
                .then((data) => {
                  console.log(data);
                  const form = document.getElementById("formWompi").submit(); 
                });
            } catch (error) {
              console.error(error);
              console.error(error.message);
            }
          });
        })
        .catch((error) => console.error(error));
        
        //Deshabilitar btn de pagar 
      btnPedir.disabled = true;
      
      //Borrar el chache de la pagina 
      sessionStorage.clear();
      

};

//Funcion normal del pos
const funcionPost = (totalW) => {
      let DATA = [];
    
      const total = {
        amount: totalW,
        ID: ID,
        Fecha: fechaActual
      };
    
      const post = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(total),
      };
    
      const URL_API =
        "https://berry-connect.accsolutions.tech/api/Signature"; 
    
        fetch(URL_API, post)
        .then((response) => response.json())
        .then((data) => {
          DATA = data;
    
          DATA.forEach((datos) => {
            let wompi = document.querySelector(".btnWompi");
    
            let pay = document.createElement("div");
            pay.classList.add("wompi");
    
            wompi.innerHTML = `
            
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
            `;
            let Products = [];
    
            carts.forEach((product) => {
              const new_gramos = [];   
              const type = product.compuesto;
              if(type == "No"){
                const gramaje = product.gramos.gramos * product.quantity;   
                const id = product.gramos.ID_Product;   
                
                const grams = {
                  ID_Product : id, 
                  Gramos: gramaje 
                }

                new_gramos.push(grams); 
                
              }
              else{
                for(let gr = 0; product.gramos.length; ){
                  
                  const gramaje = product.gramos[gr].Cantidad * product.quantity; 
                  const id = product.gramos[gr].ID; 

                  const datos_gramos = {
                    ID_Product: id, 
                    Gramos : gramaje, 
                    // Referencia : ref
                  }
                  new_gramos.push(datos_gramos); 
  
                  gr++; 
  
                  if(gr == product.gramos.length){
                    break 
                  }
                }
              }

              const productDetail = {
                id: product.product_id,
                price: product.price,
                name: product.referencia,
                quantity: product.quantity,
                gramos :new_gramos
              };
    
              Products.push(productDetail);
            });

            Referencia = datos.reference;

            //Datos de verificar pedido 
    
            const mapSend = {
              Referencia: datos.reference,
              Productos: Products,
              Fecha: fechaHoy,
              Total: totalW,
              ID1: ID,
              Direccion: Direccion,
              Descripcion: "Berry Fields",
              Estado: "PENDING",
              Clientes: ID,
              Cupon: "No uso cupon",
            };

            const producto = {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
    
              body: JSON.stringify(mapSend),
            };
    
            try {
              const URL_BERRY =
                "https://nexyapp-f3a65a020e2a.herokuapp.com/zoho/v1/console/verificar_pedido";
              fetch(URL_BERRY, producto)
                .then((response) => response.json())
                .then((data) => {
                  if (data) {
                    const form = document.getElementById("formWompi").submit();
                  }
                });
            } catch (error) {
              console.error(error);
              console.error(error.message);
            }
          });
        })
        .catch((error) => console.error(error));
    
        //Deshabilitar btn de pagar 
      btnPedir.disabled = true;
      
      //Borrar cache de la pagina 
      sessionStorage.clear();
 

};

//Evento del carrito
btnCarrito.addEventListener("click", () => {

  carts.forEach((price) => {
    const precio = price.price * price.quantity;

    totalWompi = totalWompi + precio;
  }); 

  //validacion y alertas de la cedula y direccion

  if (cedula.value.trim() == 0 || direccion.value.trim() == 0) {
    totalWompi = 0; 
    Swal.fire({
      icon: "error",
      title: "Hay algo mal",
      text: "Antes de pagar debes de validar primero tu numero de documento y dirección de envío",
      confirmButtonColor: "#172E58",
    }).then((result) => {
      if (result.isConfirmed) {
        cedula.focus();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        cedula.focus();
      }
    });
  } //Validacion del total 
  else if (totalWompi == 0) {
    Swal.fire({
      icon: "error",
      title: "Hay algo mal",
      text: "Tu carrito debe de tener al menos uno de nuestros productos",
      confirmButtonColor: "#172E58",
    });
  }//Validaciones para cuando se aplica el descuento 
  else if (Data.length === 1) {

    totalWompi = 0; 
    
    carts.forEach((price) => {
      const precio = price.price * price.quantity;
  
      totalWompi = totalWompi + precio;
    }); 
 
    const resta = (totalWompi * porcentaje) / 100; 

    const percent = totalWompi - resta;

    if(percent == Descuento){
      funcionPostDescuento(percent);
    }
    else{
      Swal.fire({
        icon: "info",
        title: "Hay algo mal",
        text: "Aplica de nuevo el descuento para calcularlo",
        confirmButtonColor: "#172E58",
      });
    }
  }//Validacion de el valor que va a wompi 
  else {
    totalWompi = 0; 
    
    carts.forEach((price) => {
      const precio = price.price * price.quantity;
  
      totalWompi = totalWompi + precio;

    }); 

    if(totalWompi>0){  
      funcionPost(totalWompi); 
    }
    else{
      Swal.fire({
        icon: "info",
        title: "Hay algo mal",
        text: "Tu pedido debe de tener al menos un producto",
        confirmButtonColor: "#172E58",
      });
    }
 
  }
});
 