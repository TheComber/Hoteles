 'use strict'

var express = require('express')
var UsuarioController = require("../controllers/usuarioController")
var md_auth = require("../middlewares/authentication")

/* //Subir Imagen
var multiparty = require('connect-multiparty')
 */

//Rutas
var api= express.Router()
api.post('/registrarUsuario', UsuarioController.registrarUsuario)

module.exports = api;