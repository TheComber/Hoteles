'use Strict'

var Usuario = require('../models/hotel')
var bcrypt = require("bcrypt-nodejs")
var jwt = require("../services/jwtt")
var path = require("path")
var fs = require("fs")
var moment = require('moment');
require('moment-range');


function registrarUsuario(req, res){
    var usuario = new  Usuario();
    var params = req.body;

    if(params.nombre && params.apellido && params.edad && params.email && params.usuario && params.precio  && params.fechaEntrada && params.fechaSalida && params.password){
        usuario.nombre = params.nombre;
        usuario.apellido = params.apellido;
        usuario.edad = params.edad;
        usuario.usuario = params.usuario;
        usuario.email = params.email;
        Usuario.find({ $or:[
            {usuario: hotel.usuario},
            {email: hotel.email}
        ]}).exec((err, usuarios)=>{
            if(err) return res.status(500).send({ message: 'Error en la peticion de usuario'})
            if(usuarios && usuarios.length >=1){
                return res.status(500).send({message: 'El usuario ya exciste'})
            }else{
                bcrypt.hash(params.password, null, null,(err, hash)=>{
                    usuario.password = hash;
                        usuario.save((err, usuarioGuardado)=>{
                            if(err) return res.status(500).send({message: 'Error al guardar el usuario'})
                                if(usuarioGuardado){
                                res.status(200).send({usuario: usuarioGuardado})
                            }else{
                                res.status(404).send({message: 'No se ha registrado el usuario'})
                            }
                        })
                    })
                }
            })
    }else{
            res.status(200).send({message: 'Rellene todos los comapos necesarios'})
    }
}

/* function loginHotel(req, res){
    var params = req.body;

    Hotel.findOne({email: params.email}, (err, hotel)=>{
        if(err) return res.status(500).send({message: 'Error en la peticion'})

        if(hotel){
            bcrypt.compare(params.password, hotel.password, (err, check)=>{
                if(check){
                    if(params.gettoken){
                        return res.status(200).send({token: jwt.createToken(hotel)})
                    }else{
                        hotel.password = undefined;
                        return res.status(200).send({hotel})
                    }
                }else{

                    return res.status(404).send({message: 'El hotel no se pudo logiar'})

                }
            })
        }else{

            return res.status(404).send({message: 'El hotel no se pudo logiar'})
            
        }     
        
    })
}

function editarHotel(req, res){
    var hotelId = req.params.idHotel;
    var params = req.body

    delete params.password
    if(hotelId != req.hotel.sub){
        return res.status(500).send({message: "No tiene permisos para editar este hotel"})
    }
    Hotel.findByIdAndUpdate(hotelId, params, {new: true}, (err, hotelActualizado)=>{
        if(err) return res.status(500).send({message: "Error en la peticion"})
        if(!hotelActualizado) return res.status.send({message: "No se ha podido actulizar los datos del hotel"})
        return res.status(200).send({hotel: hotelActualizado}) 
    })

}

function eliminarHotel(req, res){
    var hotelId = req.params.idHotel;

    if(hotelId != req.hotel.sub){
        return res.status(500).send({message: "No contiene permisos para eliminar"})
    }
    Hotel.findByIdAndDelete(hotelId , (err, hotelEliminado)=>{
        if(err) res.status(500).send({message: "Error en la peticion"})
        if(!hotelEliminado) res.status(404).send({message: "Error al eliminar el usuario"})
        return res.status(200).send({hotel: hotelEliminado})
    })
 */


 //
 module.exports={
     registrarUsuario
 }
