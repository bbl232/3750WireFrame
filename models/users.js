module.exports = function(mongoose,autoIncrement){
    var Schema = mongoose.Schema
    //Defines the schema for a user
    var userSchema = new Schema({
        _id:       Number,
        id:        {type:Number, required:false},
        firstname: {type:String, required:true},
        lastname:  {type:String, required:true},
        email:     {type:String, required:true},
        passwordHash: {type:String, required:true},
        roles:     {type:[String], default:["normal"]},
        phone:     Number,
        locations: [{type:Number, ref:'Location'}], //Array of references to locations
        userNotes:     {type:String, default:""},
        company:       {type:String, default:""},
        created:       {type:String, default:new Date().toISOString()},
        emailEnabled:  {type:Boolean,default:false},
        emailVerified: {type:Boolean,default:false},
    })
    //Tells mongoose to increment the _id and id fields
    userSchema.plugin(autoIncrement.plugin, 'User');
    userSchema.plugin(autoIncrement.plugin, {model:'User', field:'id'});

    //Defines the schema for user locations
    var locationSchema = new Schema({
            _id:         Number,
            id:          {type:Number, required:false},
            description: {type:String, required:true, default:"Home"},
            address1:    {type:String, required:true},
            address2:    String,
            city:        {type:String, required:true},
            postal:      {type:String, required:true},
            country:     {type:String, required:true, default:"Canada"},
            latitude:    String,
            longitude:   String
    })
    //Tells mongoose to increment the _id and id fields
    locationSchema.plugin(autoIncrement.plugin, 'Location');
    locationSchema.plugin(autoIncrement.plugin, {model:'Location', field:'id'});

    var tokenSchema = new Schema({
        //_id:    Number,
        token:  {type:String, required:true},
        user:   {type:Number, ref:'User'},
        expires: {type:String, default:new Date(+new Date + 6048e5).toISOString()},
    })

    var models = {
        User : mongoose.model('User', userSchema),
        Location : mongoose.model('Location', locationSchema),
        Token : mongoose.model('Token', tokenSchema)
    }
    return models
}
