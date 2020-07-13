'use strict'

var jwt = require("jwt-simple")
var moment = require("moment")
var secret = 'clave_secreta_Hotel'

exports.createToken = function(hotel){
    var payload = {
        sub: hotel._id,
        nombre: hotel.nombre,
        direccion: hotel.direccion,
        numero: hotel.numero,
        email: hotel.email,
        calificacion: hotel.calificacion,
        precio: hotel.precio,
        int: moment().unix(),
        exp: moment().day(30, 'days').unix()
    }

    return jwt.encode(payload, secret)

}