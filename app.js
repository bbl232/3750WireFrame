var restify = require('restify')

var server = restify.createServer({name:'unicom-appleseed-api'})


server
  .use(restify.fullResponse())
  .use(restify.bodyParser())

var mongoose = require('mongoose')
var connection = mongoose.createConnection("mongodb://localhost/test");
mongoose.connect("mongodb://localhost/test");
var autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(connection);
var crypt = require('crypto');

var userModel = require('./models/users.js')(mongoose,autoIncrement)
var eventModel = require('./models/events.js')(mongoose,autoIncrement)
var fbModel = require('./models/feedback.js')(mongoose,autoIncrement)

var user = require('./controllers/users.js')(userModel,eventModel)
var even = require('./controllers/events.js')(userModel,eventModel)
var fb = require('./controllers/feedback.js')(userModel,eventModel,fbModel)

server.pre(function(req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    return next();
});
server.opts("/.*",function(req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "authorization");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.send(200);
})
//Users API
//GET
server.get("/users", user.getUsers) //get a list of users
server.get("/user/:id", user.getUsers) //get a specific user
server.get("/user/:uid/locations", user.getLocations) //get a list of locations related to a user
server.get("/user/:uid/locations/:id", user.getLocations) //get a specific location for a user

server.post("/users", user.newUser) //create a user
server.post("/user/:uid/locations/", user.newLocation) //create a location for a user

server.put("/user/:id", user.updateUser) //update a specific user
server.put("/user/:uid/locations/:id", user.updateLocation) //update a location for a user

server.del("/user/:id", user.delUser) //delete a specific user
server.del("/user/:uid/locations/:id", user.delLocation) //delete a location from a user

//special endpoints
server.get("/users/current", user.getByToken) //update user's password
server.post("/users/current/changePassword", user.updatePassword) //update user's password
server.post("/users/current/logout", user.logout) //remove users token
server.post("/users/authenticate", user.login) //generate a token for user

//Events API
server.get("/events", even.getEvents)
server.get("/events/:id", even.getEvents)

server.put("/events/:id", even.updateEvent)

server.post("/events", even.newEvent)
server.post("/events/:id/attend", even.attend)
server.post("/events/:id/notattend", even.notattend)
server.post("/events/:id/cancel", even.cancel)
server.post("/events/:id/accept", even.acc)
server.post("/events/:id/reject", even.reject)

server.del("/events/:id", even.delete)
//Feedback API
server.get("/feedback", fb.getFeedback)
server.get("/feedback/:id", fb.getFeedback)
server.post("/feedback", fb.newFeedback)
server.del("/feedback/:id", fb.deleteFeedback)


server.listen(3000, function(){
      console.log('%s listening at %s', server.name, server.url)
})
