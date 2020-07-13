'use Strict'

var Hotel = require('../models/hotel')
var bcrypt = require("bcrypt-nodejs")
var jwt = require("../services/jwt")
var path = require("path")
var fs = require("fs")
var moment = require('moment');
require('moment-range');


function registrarHotel(req, res){
    var hotel = new  Hotel();
    var params = req.body;

    if(params.nombre && params.direccion && params.numero && params.email && params.calificacion && params.precio  && params.fechaEntrada && params.fechaSalida && params.password){
        hotel.nombre = params.nombre;
        hotel.direccion = params.direccion;
        hotel.numero = params.numero;
        hotel.email = params.email;
        hotel.calificacion = params.calificacion;
        hotel.precio = params.precio;
        hotel.fechaEntrada = params.fechaEntrada;
        hotel.fechaSalida = params.fechaSalida;
        Hotel.find({ $or:[
            {nombre: hotel.nombre},
            {email: hotel.email}
        ]}).exec((err, nombres)=>{
            if(err) return res.status(500).send({ message: 'Error en la peticon de hotel'})
            if(nombres && nombres.length >=1){
                return res.status(500).send({message: 'El hotel ya exciste'})
            }else{
                bcrypt.hash(params.password, null, null,(err, hash)=>{
                    hotel.password = hash;
                        hotel.save((err, hotelGuardado)=>{
                            if(err) return res.status(500).send({message: 'Error al guardar el hotel'})
                                if(hotelGuardado){
                                res.status(200).send({hotel: hotelGuardado})
                            }else{
                                res.status(404).send({message: 'No se ha registrado el hotel'})
                            }
                        })
                    })
                }
            })
    }else{
            res.status(200).send({message: 'Rellene todos los comapos necesarios'})
    }
}

function loginHotel(req, res){
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

}

/* function buscar(req, res){
    var fechainicio = req.params.entraga; 
    var fechafin  = req.params.salida;

    reservar= moment().range(fechainicio, fechafin)
    if( moment().isBetween( moment(fechainicio), moment(fechafin) ) ){
    
            Hotel.find(reservar, (err, resss)=>{
                if(err) return res.status(500).send({message: "Error en la peticion"})
                if(!resss) return Response.status(404).send({message: "Error al encontrar el usuario"})
                return res.status(300).send({resss})
            })
        }else{
        res.json( 'la fecha actual no esta en el rango')
    }
            //User.fin(({_id:userId}), (err, usuario)=>})
} */

/* function buscar(req, res) {
    var fechainicio = req.params.entraga; 
    var fechafin  = req.params.salida

    Hotel.find({fechaEntrada:fechainicio},{fechaSalida:fechafin}, (err,reservacion)=>{
    if(err) return res.status(500).send({message: "Error en la peticion"})
    if(!reservacion) return Response.status(404).send({message: "Error al encontrar el usuario"})
        var filtro = [fechainicio,fechafin].filter(buscar)
        return req.status(200).send({filtro})
    })
} */

function buscar(req, res){
    var fechainicio = req.params.entrada; 
    var fechafin  = req.params.salida
    var filtro = [fechainicio,fechafin]

    Hotel.find({fechaEntrada:{$regex:fechainicio}},{fechaEntrada:{$regex:fechafin}}, (err,reservacion)=>{
    if(err) return res.status(500).send({message: "Error en la peticion"})
    if(!reservacion) return Response.status(404).send({message: "Error al encontrar el usuario"})
        return filtro.filter({reservacion})
    })
}


//Importaciones
module.exports={
    registrarHotel,
    loginHotel,
    editarHotel,
    eliminarHotel,
    buscar
}