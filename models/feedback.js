module.exports = function(mongoose,autoIncrement){
    var Schema = mongoose.Schema
    //Defines the schema for a user

    var FeedbackSchema = new Schema({
        _id:       Number,
        id:        {type:Number, required:false},
        owner: {type:Number, ref:'User'}, //Array of references to locations
        subject: {type:String, required:true},
        message: {type:String, ref:"Location"},
        shouldBeContacted: {type:String, required:true},
        event:  {type:Number, ref:'Event'},
        created:  {type:String, default:new Date().toISOString()}
    })
    //Tells mongoose to increment the _id and id fields
    FeedbackSchema.plugin(autoIncrement.plugin, 'Feedback');
    FeedbackSchema.plugin(autoIncrement.plugin, {model:'Feedback', field:'id'});

    var models = {
        Feedback : mongoose.model('Feedback', FeedbackSchema),
    }
    return models
}
