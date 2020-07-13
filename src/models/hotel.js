'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var HotelSchema = Schema({
    nombre: String,
    direccion: String,
    numero: Number,
    email: String,
    password: String,
    calificacion: String,
    precio: String,
    fechaEntrada:Date,
    fechaSalida:Date,
})

module.exports = mongoose.model("hotel",HotelSchema)