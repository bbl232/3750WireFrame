module.exports = function(mongoose,autoIncrement){
    var Schema = mongoose.Schema
    //Defines the schema for a user
    var eventSchema = new Schema({
        _id:       Number,
        id:        {type:Number, required:false},
        owner: {type:Number, ref:'Location'}, //Array of references to locations
    })
    //Tells mongoose to increment the _id and id fields
    userSchema.plugin(autoIncrement.plugin, 'Event');
    userSchema.plugin(autoIncrement.plugin, {model:'Event', field:'id'});

    var models = {
        Event : mongoose.model('Event', eventSchema),
    }
    return models
}
