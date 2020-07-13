'use string'

//Variable Globales
const express = require("express")
const app = express();
const bodyParser = require("body-parser")

//Carga de Rutas
var hotel_routes = require("./src/routes/hotelRoutes")
var usuario_routes = require("./src/routes/usuarioRoutes")

//Midolewares
app.use(bodyParser.urlencoded({ extended:false }))
app.use(bodyParser.json())

//Cabesera
app.use((req, res, next)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X_Requested-Whint, Content-Type, Accept, Access-Control-Allow-Request-Wathod')
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
    res.header('Allow', 'GET, POST, OPTIONS, PUT DELETE')
    
    next();
})

//Rutas localhost:8282/api/*ruta*
app.use('/api', hotel_routes,usuario_routes)

//Exporta
module.exports = app;