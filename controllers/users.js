function Message(msg){
    this.message=msg;
}

function LocationList(list){
  this.locations=list;
}

function UserList(list){
    this.users=list;
}

function TokenUser(token,user){
    this.token = token;
    this.user = user;
}

var mongoose = require('mongoose')
var connection = mongoose.createConnection("mongodb://localhost/test");
mongoose.connect("mongodb://localhost/test");
var autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(connection);
var crypt = require('crypto');
var userModel = require('../models/users.js')(mongoose,autoIncrement)


/*
    This works as of 11:59 AM, Tuesday Nov 25.
    Author: Bill Vandenberk
*/
exports.getUsers = function(req, res, next){
    if(req.params.id){
        userModel.User.findOne({_id:req.params.id},'-passwordHash').populate('locations').exec(function(err,user){
            if(err || user==null) res.send(404,new Message("User not found"));
            res.send(200,user)
        })
    }
    else{
        userModel.User.find().populate('locations').exec(function(err,user){
            if(err || user==null) res.send(400,err);
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
        userModel.User.findOne({_id:req.params.uid},function(err,user){
            if(err || null==user) res.send(404,new Message("User not found."))

            if(user.locations.indexOf(req.params.id)==-1){
                res.send(404,new Message("Location not found"))
            }
            userModel.Location.findOne({_id:req.params.id},function(err,location){
                if(err) res.send(400,err);
                res.send(201,new LocationList([].concat(location)))
            })
        })
    }
    else{
        userModel.User.findOne({_id:req.params.uid}).populate('locations').exec(function(err,user){
            if(err || user==null) res.send(400,err)
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
    newUser.passwordHash = body.user.passwordHash;
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
    userModel.User.findOne({_id:req.params.id}).populate('locations').exec(function(err,user){
        if(err || user==null) res.send(404, new Message("User not found."))

        var body = JSON.parse(req.body)
        var postUser = body.user;
        user.firstname = postUser.firstname || user.firstname;
        user.lastname = postUser.lastname || user.lastname;
        user.roles = postUser.roles || user.roles;
        user.phone = postUser.phone || user.phone;
        user.emailEnabled = postUser.emailEnabled || user.emailEnabled;
        user.userNotes = postUser.userNotes || user.userNotes;
        user.company = postUser.company || user.company;
        user.emailVerified = postUser.emailVerified || user.emailVerified;

        user.save(function(err){
            if(err) res.send(404, new Message("Could not save changes."))

            res.send(200,new UserList(user))
        })
    })
}
exports.updateLocation = function(req, res, next){
    userModel.User.findOne({_id:req.params.uid},function(err,user){
        if(err || null==user) res.send(404,new Message("User not found."))

            if(user.locations.indexOf(req.params.id)==-1){
                res.send(404,new Message("Location not found"))
            }
            userModel.Location.findOne({_id:req.params.id},function(err,location){
                if(err) res.send(400,err);
                var body = JSON.parse(req.body)
                var postLocation = body.location;
                location.description = postLocation.description || location.description;
                location.save(function(err){
                    if(err) res.send(400,new Message("Could not update location."))
                    res.send(200, new LocationList(location))
                })
            })
        })
}

/*
    Working
    Author: Bill Vandenberk
*/
exports.delUser = function(req, res, next){
    userModel.User.remove({_id:req.params.id},function(err){
        if(err) res.send(404, new Message("User not found"))
        res.send(200,new Message("User deleted"))
    })
}

/*
    Works
    Author: Bill Vandenberk
*/
exports.delLocation = function(req, res, next){
    userModel.User.findOne({_id:req.params.uid},function(err,user){
        if(err) res.send(404, new Message("Location not found"))
            var index = user.locations.indexOf(req.params.id)
            user.locations.splice(index,1);
            user.save(function(err){
                if(err) res.send(400, new Message("Could not update user."))
                res.send(200,new Message("Location deleted."))
            })
        })
}

/*

THE REST OF THIS STUFF NEEDS AUTH IMPLEMENTED

*/
exports.updatePassword = function(req, res, next){
    var spl = req.headers.authorization.split("=");
    var tokenSupplied = spl[1]
    userModel.Token.findOne({token:tokenSupplied}).populate('user user.locations').exec(function(err,token){
        var body = JSON.parse(req.body);
        var user = token.user;
        if(user==null){
            res.send(401,new Message("You are not logged in"))
        }
        console.log(user);
        if(user.passwordHash == body.oldPasswordHash){
            user.passwordHash = body.newPasswordHash;
            user.save(function(err){
                if(err) res.send(400, new Message("Could not save user."))
                res.send(200,new Message("Password Changed"))
            })
        }
        else{
            res.send(403,new Message("Old password does not match"))
        }
    })
    //res.send(201,new Message("updatePassword"))
}

exports.logout = function(req, res, next){
    var spl = req.headers.authorization.split("=");
    var tokenSupplied = spl[1]
    userModel.Token.remove({token:tokenSupplied},function(err,token){
        if(err) res.send(401,new Message("You are not logged in."))
        res.send(200)
    })
}

exports.getByToken = function(req, res, next){
    var spl = req.headers.authorization.split("=");
    var tokenSupplied = spl[1]
    userModel.Token.findOne({token:tokenSupplied}).populate({path:'user user.locations',select:'-passwordHash'}).exec(function(err,token){
        if(err||token==null) res.send(401,new Message("You are not logged in."))
        res.send(200,{"user":token.user})
    })
}

exports.login = function(req, res, next){
    /*Find user, generate unique token, send back tocken, store token in db*/
    var body = JSON.parse(req.body)
    userModel.User.findOne({email:body.email,passwordHash:body.passwordHash},function(err,user){
        if(err||user==null) res.send(403, new Message("Incorrect email or password"))

        var tok = crypt.createHash('sha256').update(user.email+user.passwordHash).digest('hex');
        var tokenSave = new userModel.Token({token:tok,user:user._id})
        tokenSave.save(function(err){
            if(err) res.send(401, new Message("Could not save token"))
            res.send(200,new TokenUser(tok,user))
        })
    })
    //res.send(201,new Message("login"))
}