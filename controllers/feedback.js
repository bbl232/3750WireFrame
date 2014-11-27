module.exports = function (userModel,eventModel,feedbackModel){
    var module={};

    function FeedbackList(fb){
        this.feedback=fb;
    }

    function Message(m){
        this.message = m;
    }

    module.getFeedback = function(req, res, next){
        if(req.params.id){
            feedbackModel.Feedback.findOne({_id:req.params.id},function(err,newFb){
                if(err || newFb == null) res.send(404, new Message("Feedback not found"))
                eventModel.Event.populate(newFb,{path:'event', model:eventModel.Event},function(err,newFb){
                    userModel.User.populate(newFb, {path:'event.owner event.attendees', select:'-passwordHash', model:userModel.User}, function(err,newFb){
                        userModel.Location.populate(newFb,{path:'event.owner.locations event.attendees.locations', model:userModel.Location}, function(err,newFb){
                            userModel.User.populate(newFb,{path:'owner',select:'-passwordHash',model:userModel.User},function(err,newFb){
                                userModel.Location.populate(newFb,{path:'owner.locations',model:userModel.Location},function(err,newFb){
                                    res.send(201,new FeedbackList([].concat(newFb)))
                                })
                            })
                        })
                    })
                })
            })
        }
        else{
            feedbackModel.Feedback.find({},function(err,newFb){
                if(err || newFb == null) res.send(404, new Message("Feedback not found"))
                eventModel.Event.populate(newFb,{path:'event', model:eventModel.Event},function(err,newFb){
                    userModel.User.populate(newFb, {path:'event.owner event.attendees', select:'-passwordHash', model:userModel.User}, function(err,newFb){
                        userModel.Location.populate(newFb,{path:'event.owner.locations event.attendees.locations', model:userModel.Location}, function(err,newFb){
                            userModel.User.populate(newFb,{path:'owner',select:'-passwordHash',model:userModel.User},function(err,newFb){
                                userModel.Location.populate(newFb,{path:'owner.locations',model:userModel.Location},function(err,newFb){
                                    res.send(201,new FeedbackList(newFb))
                                })
                            })
                        })
                    })
                })
            })
        }
    }
    module.newFeedback = function(req, res, next){
        var body = JSON.parse(req.body)
        var newFb = new feedbackModel.Feedback();
        newFb.subject = body.feedback.subject;
        newFb.message = body.feedback.message;
        newFb.shouldBeContacted = body.feedback.shouldBeContacted;
        newFb.owner = body.feedback.owner.id;
        newFb.event = body.feedback.event.id;

        newFb.save(function(err){
            if(err) res.send(401,new Message("Could not save feedback"))
                //POPULATE *_ALL_* THE THINGS!

            eventModel.Event.populate(newFb,{path:'event', model:eventModel.Event},function(err,newFb){
                userModel.User.populate(newFb, {path:'event.owner event.attendees',select:'-passwordHash', model:userModel.User}, function(err,newFb){
                    userModel.Location.populate(newFb,{path:'event.owner.locations event.attendees.locations', model:userModel.Location}, function(err,newFb){
                        userModel.User.populate(newFb,{path:'owner',select:'-passwordHash',model:userModel.User},function(err,newFb){
                            userModel.Location.populate(newFb,{path:'owner.locations',model:userModel.Location},function(err,newFb){
                                res.send(201,new FeedbackList(newFb))
                            })
                        })
                    })
                })
            })
        })
    }
    module.deleteFeedback = function(req, res, next){
        feedbackModel.Feedback.remove({_id:req.params.id},function(err){
            if(err) res.send(401, new Message("Could not remove"))
            res.send(200,new Message("Feedback deleted"))
        })
    }

    return module;
}
