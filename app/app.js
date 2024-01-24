const express = require('express')
const path =  require('path')

const app = express(); 

app.get('/', (req,res)=>{
    res.redirect("http://127.0.0.1:3000/HTML/catalogo.html")
}); 

const port = 4000; 

app.listen(port,()=>{
    console.log(`Escuchando el puerto ${port}`)
}); 
