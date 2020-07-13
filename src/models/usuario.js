'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var UsuarioSchema = Schema({
    nombre: String,
    apellido: String,
    edad: Number,
    usuario: String,
    email: String,
    password: String,

})

module.exports = mongoose.model("usuario",UsuarioSchema)