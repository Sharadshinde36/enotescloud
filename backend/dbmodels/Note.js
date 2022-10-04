var mongoose=require('mongoose');
var{ Schema}=mongoose;
const notesdb= new Schema(
    {
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'userdb'
        },
        title:{
            type:String,
            require:true
        },
        dec:
        {
            type:String,
            require:true
        },
        tag:
        {
            type:String,
            
        },
        date:
        {
            type:Date,
            default:Date.now
        }

    });
    module.exports=mongoose.model('notes',notesdb);
