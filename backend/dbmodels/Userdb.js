const mongoose=require('mongoose');
const {Schema}=mongoose;
const userdb=  new Schema(
    {
        name:{
            type:String,
            require:true
        },
        email:
        {
            type:String,
            require:true,
            unique:true
        },
        password:
        {
            type:String,
            require:true
        },
        date:
        {
            type:Date,
            default:Date.now
        }

    });
    async()=>{
    const User=mongoose.model('userdb',userdb);
    await User.createIndexes();
    
    module.exports=User;}
