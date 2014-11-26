module.exports = function(mongoose,autoIncrement){
    var Schema = mongoose.Schema
    //Defines the schema for a user
    var eventSchema = new Schema({
        _id:       Number,
        id:        {type:Number, required:false},
        owner: {type:Number, ref:'Location'}, //Array of references to locations
        description: {type:String, required:true},
        trees:    {type:String,quantity:Number},
        datetime: {type:String, required:true},
        endtime:  {type:String, required:true},
        status:   {type:String, default:"pending"},
        attendees:[{type:Number, ref:'User'}],
        staffNotes:{type:String,default:""},
        created:  {type:String, default:new Date().toISOString()}
    })
    //Tells mongoose to increment the _id and id fields
    eventSchema.plugin(autoIncrement.plugin, 'Event');
    eventSchema.plugin(autoIncrement.plugin, {model:'Event', field:'id'});

    var models = {
        Event : mongoose.model('Event', eventSchema),
    }
    return models
}
