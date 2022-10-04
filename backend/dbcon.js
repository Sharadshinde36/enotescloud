const mongoose=require('mongoose');

const mongoURI="mongodb://localhost:27017/enotes";
const conecttodb=()=>
{
    mongoose.connect(mongoURI,()=>{ 
        console.log("connected to the db");
    })
}
module.exports=conecttodb;