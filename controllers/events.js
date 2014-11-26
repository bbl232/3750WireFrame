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
            eventModel.Event.findOne({id:req.params.id}).populate({path:'owner attendees',select:'-passwordHash'}).exec(function(err,event){
                if(err) res.send(400,new Message("Also nope."))
                    userModel.User.populate(event,{path:'owner.locations',model: userModel.Location}, function(err,event2){
                        if(err) res.send(400,new Message("Also nope."))
                            userModel.User.populate(event2,{path:'attendees.locations', model: userModel.Location},function(err,event3){
                                if(err) res.send(400,new Message("Also nope."))

                                    res.send(201,new EventList([].concat(event3)))
                                })
                            })
                        })
        }
        else{
            eventModel.Event.find({}).populate({path:'owner owner.locations attendees attendees.locations', select:'-passwordHash'}).exec(function(err,event){
                if(err) res.send(400,new Message("No events"))

                userModel.User.populate(event,{path:'owner.locations',model: userModel.Location}, function(err,event2){
                    if(err) res.send(400,new Message("Also nope."))
                    userModel.User.populate(event2,{path:'attendees.locations', model: userModel.Location},function(err,event3){
                        if(err) res.send(400,new Message("Also nope."))

                        res.send(201,new EventList(event3))
                    })
                })
            })
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
                userModel.User.populate(event,{path:'owner.locations',model: userModel.Location}, function(err,event2){
                    if(err) res.send(400,new Message("Also nope."))
                    userModel.User.populate(event2,{path:'attendees.locations', model: userModel.Location},function(err,event3){
                        if(err) res.send(400,new Message("Also nope."))

                        res.send(201,new EventList(event3))
                    })
                })
            })
        })
    }

    module.attend = function(req, res, next){
        var spl = req.headers.authorization.split("=");
        var tokenSupplied = spl[1]
        userModel.Token.findOne({token:tokenSupplied}).populate({path:'user user.locations',select:'-passwordHash'}).exec(function(err,token){
            if(err||token==null) res.send(401,new Message("You are not logged in."))
            eventModel.Event.find({id:req.params.id}).populate({path:'owner owner.locations attendees attendees.locations', select:'-passwordHash'}).exec(function(err,event){
                if(err) res.send(404,new Message("Event not found"))
                event.attendees.push(token.user._id);
                event.save(function(err){
                    if(err) res.send(400,new Message("Could not save"))

                    res.send(200,new Message("Current user is now attending this event"))
                })
            })
        })
    }

    module.notattend = function(req, res, next){
        var spl = req.headers.authorization.split("=");
        var tokenSupplied = spl[1]
        userModel.Token.findOne({token:tokenSupplied}).populate({path:'user user.locations',select:'-passwordHash'}).exec(function(err,token){
            if(err||token==null) res.send(401,new Message("You are not logged in."))
            eventModel.Event.find({id:req.params.id}).populate({path:'owner owner.locations attendees attendees.locations', select:'-passwordHash'}).exec(function(err,event){
                if(err) res.send(404,new Message("Event not found"))

                event.attendees.splice(event3.attendees.indexof(token.user._id),1);
                event.save(function(err){
                if(err) res.send(400,new Message("Could not save"))

                    res.send(200,new Message("Current user is no longer attending this event"))
                })
            })
        })
    }

    module.cancel = function(req, res, next){
        /*Not implemented yet*/
        eventModel.Event.findOne({id:req.params.id}).populate({path:'owner attendees',select:'-passwordHash'}).exec(function(err,event){
            if(err) res.send(404,new Message("Event not found"))
            event.status = "cancelled";
            event.save(function(err){
                if(err) res.send(404, new Message("Event not found"))
                res.send(200,new Message("The event was accepted"))
            })
        })
        //res.send(404,new Message("Not Yet Implemented"))
    }

    module.acc = function(req, res, next){
        eventModel.Event.findOne({id:req.params.id}).populate({path:'owner attendees',select:'-passwordHash'}).exec(function(err,event){
            if(err) res.send(404,new Message("Event not found"))
            event.status = "accepted";
            event.save(function(err){
                if(err) res.send(404, new Message("Event not found"))
                res.send(200,new Message("The event was accepted"))
            })
        })
    }

    module.reject = function(req, res, next){
        eventModel.Event.findOne({id:req.params.id}).populate({path:'owner attendees',select:'-passwordHash'}).exec(function(err,event){
            if(err) res.send(404,new Message("Event not found"))
            event.status = "rejected";
            event.save(function(err){
                if(err) res.send(404, new Message("Event not found"))
                    res.send(200,new Message("The event was rejected"))
            })
        })
    }

    module.updateEvent = function(req, res, next){
        var body = JSON.parse(req.body);
        var postEvent = body.event;
        eventModel.Event.findOne({id:req.params.id}).populate({path:'owner attendees',select:'-passwordHash'}).exec(function(err,event){
            if(err) res.send(404,new Message("Event not found"))
            event.description = postEvent.description || event.description;
            event.attendees = postEvent.attendees || event.attendees;
            event.endtime = postEvent.endtime || event.endtime;
            event.trees = postEvent.trees || event.trees;
            event.staffNotes = postEvent.staffNotes || event.staffNotes;

            event.save(function(err){
                if(err) res.send(400, new Message("Event not saved"))
                    if(err) res.send(400,new Message("Could not populate."))
                    userModel.User.populate(event,{path:'owner.locations',model: userModel.Location}, function(err,event2){
                        if(err) res.send(400,new Message("Could not populate."))
                        userModel.User.populate(event2,{path:'attendees.locations', model: userModel.Location},function(err,event3){
                            if(err) res.send(400,new Message("Also nope."))

                            res.send(201,new EventList(event3))
                        })
                    })
            })
        })
    }

    module.delete = function(req, res, next){
        eventModel.Event.remove({id:req.params.id},function(err){
            if(err) res.send(404,new Message("Event not found"))
            res.send(200,new Message("Event Deleted"))
        })
    }
    return module;
}
