var restify = require('restify')

var server = restify.createServer({name:'unicom-appleseed-api'})


server
  .use(restify.fullResponse())
  .use(restify.bodyParser())

// var evenModel = require('./models/events.js')

var user = require('./controllers/users.js')
var even = require('./controllers/events.js')
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
server.post("/users/current/changePassword", user.updatePassword) //update user's password
server.post("/users/current/logout", user.logout) //remove users token
server.post("/users/current/authenticate", user.login) //generate a token for user

//Events API


server.listen(3000, function(){
      console.log('%s listening at %s', server.name, server.url)
})
