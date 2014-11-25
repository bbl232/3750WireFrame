function Message(msg){
    this.message=msg;
}

function LocationList(list){
  this.locations=list;
}

function UserList(list){
    this.users=list;
}

var mongoose = require('mongoose')
var connection = mongoose.createConnection("mongodb://localhost/test");
mongoose.connect("mongodb://localhost/test");
var autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(connection);

var userModel = require('../models/users.js')(mongoose,autoIncrement)


/*
    This works as of 11:59 AM, Tuesday Nov 25.
    Author: Bill Vandenberk
*/
exports.getUsers = function(req, res, next){
    if(req.params.id){
        userModel.User.findOne({_id:req.params.id}).populate('locations').exec(function(err,user){
            if(err) res.send(400,err);
            res.send(200,user)
        })
    }
    else{
        userModel.User.find().populate('locations').exec(function(err,user){
            if(err) res.send(400,err);
            res.send(200,new UserList(user))
        })
    }
}

/*
    This works as of 12:12 PM, Tuesday Nov 25.
    Author: Bill Vandenberk
*/
exports.getLocations = function(req, res, next){
    if(req.params.id){
        userModel.Location.findOne({_id:req.params.id},function(err,location){
            if(err) res.send(400,err);
            res.send(201,new LocationList([].concat(location)))
        })
    }
    else{
        userModel.User.findOne({_id:req.params.uid}).populate('locations').exec(function(err,user){
            if(err) res.send(400,err)
            res.send(201,new LocationList(user.locations))
        })
    }
}

/*
    This works as of 11:59 AM, Tuesday Nov 25.
    Author: Bill Vandenberk
*/
exports.newUser = function(req, res, next){
    var body = JSON.parse(req.body);
    var newUser = new userModel.User();
    newUser.firstname = body.user.firstname;
    newUser.lastname = body.user.lastname;
    newUser.email = body.user.email;
    newUser.roles = body.user.roles;
    newUser.phone = body.user.phone;
    newUser.userNotes = body.user.userNotes;
    newUser.company = body.user.company;
    newUser.emailEnabled = body.user.emailEnabled;

    var locationsArray = [];
    if(body.user.locations){
      while(body.user.locations.length > 0){
        var newLoc = new userModel.Location(body.user.locations.shift());
        newLoc.save(function(err){
          if(err) res.send(400,new Message("Error saving location: "+err));
          newUser.locations.push(newLoc._id);
          //console.log(locationsArray)
          if(body.user.locations.length <=0){
            newUser.save(function(err){
              if (err) res.send(400,new Message("Error saving user: "+err));
              res.send(201,newUser)
            })
          }
        })
      }
    }
    else{
      newUser.save(function(err){
        if (err) res.send(400,new Message("Error saving user: "+err));
        res.send(201,newUser)
      })
    }
}

/*
    This works as of 12:37 PM, Tuesday Nov 25.
    Author: Bill Vandenberk
*/
exports.newLocation = function(req, res, next){
    userModel.User.findOne({_id:req.params.uid},function(err,user){
        if(err) res.send(400,err)

        var body = JSON.parse(req.body);
        var newLoc = new userModel.Location(body.location)
        newLoc.save(function(err){
            if(err) res.send(400,err)

            user.locations.push(newLoc._id)
            user.save(function(err){
                if(err) res.send(400,err)
                userModel.User.findOne({_id:req.params.uid}).populate('locations').exec(function(err,userToReturn){
                    if(err) res.send(400,err)
                    res.send(201,new LocationList(userToReturn.locations))
                })
            })
        })
    })
}

exports.updateUser = function(req, res, next){
    res.send(201,new Message("updateUser"));
}
exports.updateLocation = function(req, res, next){
    res.send(201,new Message("updateLocation"));
}

exports.delUser = function(req, res, next){
    res.send(201,new Message("delUser"))
}

exports.delLocation = function(req, res, next){
    res.send(201,new Message("delLocation"))
}

exports.updatePassword = function(req, res, next){
    res.send(201,new Message("updatePassword"))
}

exports.logout = function(req, res, next){
    res.send(201,new Message("logout"))
}

exports.login = function(req, res, next){
    res.send(201,new Message("login"))
}
