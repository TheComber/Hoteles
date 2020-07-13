'use strict'

var express = require('express')
var HotelController = require("../controllers/hotelController")
var md_auth = require("../middlewares/authentication")

/* //Subir Imagen
var multiparty = require('connect-multiparty')
 */

//Rutas
var api= express.Router()
api.post('/registrarHotel', HotelController.registrarHotel)
api.post('/loginHotel', HotelController.loginHotel)
api.put('/editarHotel/:idHotel', md_auth.ensureAuth, HotelController.editarHotel)
api.delete('/eliminarHotel/:idHotel', md_auth.ensureAuth, HotelController.eliminarHotel)
api.get('/buscar/:entrada/:salida', HotelController.buscar)

module.exports = api;