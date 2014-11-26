var mongoose = require('mongoose')
var connection = mongoose.createConnection("mongodb://localhost/test");
var autoIncrement = require('mongoose-auto-increment');
var crypt = require('crypto');
var eventModel = require('../models/events.js')(mongoose,autoIncrement)

exports.getEvents = function(req, res, next){
    if(req.params.id){
        
    }
    else{

    }
}

exports.newEvent = function(req, res, next){

}

exports.attend = function(req, res, next){

}

exports.notattend = function(req, res, next){

}

exports.cancel = function(req, res, next){

}

exports.acc = function(req, res, next){

}

exports.reject = function(req, res, next){

}

exports.updateEvent = function(req, res, next){

}

exports.delete = function(req, res, next){

}
