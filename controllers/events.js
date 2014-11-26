module.exports = function (userModel,eventModel){
    var module = {};
    function Message(t){
        this.message=t;
    }

    function EventList(list){
        this.events=list;
    }

    module.getEvents = function(req, res, next){
        if(req.params.id){
            //get one

        }
        else{
            eventModel.Event.find({}).populate({path:'owner owner.locations attendees attendees.locations', select:'-passwordHash'}).exec(function(err,event){
                if(err) res.send(400,new Message("No events"))

                res.send(200, new EventList(event));
            })
            //get all
        }
    }

    module.newEvent = function(req, res, next){
        var body = JSON.parse(req.body);
        var newEvent = new eventModel.Event();
        newEvent.owner = body.event.owner.id;
        newEvent.description = body.event.description;
        newEvent.location = body.event.location.id;
        newEvent.datetime = body.event.datetime;
        newEvent.endtime = body.event.endtime;
        while(body.event.trees.length > 0){
            var tree =body.event.trees.shift();
            newEvent.trees.push({type:tree.type,quantity:tree.quantity})
        }
        while(body.event.attendees.length > 0){
            newEvent.attendees.push(body.event.attendees.shift().id)
        }
        newEvent.staffNotes = body.event.staffNotes;
        newEvent.save(function(err){
            if(err) res.send(400,new Message("Nope. Not gonna save dat der event."))

            eventModel.Event.findOne({id:newEvent.id}).populate({path:'owner attendees',select:'-passwordHash'}).exec(function(err,event){
                if(err) res.send(400,new Message("Also nope."))
                userModel.User.populate(event.owner,{path:'user.locations'}, function(err,event){
                    if(err) res.send(400,new Message("Also nope."))
                    userModel.User.populate(event.attendees,{path:'user.locations'},function(err,event){
                        if(err) res.send(400,new Message("Also nope."))

                        res.send(201,new EventList(event))
                    })
                })
            })
        })
    }

    module.attend = function(req, res, next){

    }

    module.notattend = function(req, res, next){

    }

    module.cancel = function(req, res, next){

    }

    module.acc = function(req, res, next){

    }

    module.reject = function(req, res, next){

    }

    module.updateEvent = function(req, res, next){

    }

    module.delete = function(req, res, next){

    }
    return module;
}
