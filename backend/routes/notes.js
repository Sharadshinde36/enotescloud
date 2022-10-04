const express=require('express');
const router=express.Router();
const Note=require("../dbmodels/Note")
const fetchuser=require('../middleware/fetchuser');

//Router 1:for fectch all notes ,when logged in user

    router.get('/fetchallnotes',fetchuser,async (req,res)=>{
        try {
        const notes=await Note.find({user:req.user.id});
        res.json({notes});


    } catch (error) {
    res.status(401).send("could not fetch all notes");
    }
    })
    



//Router 2:for add note with user logged in
{
router.post('/addnote',fetchuser,async (req,res)=>
{

try {
    const { title,dec,tag}=req.body;
    const newnote=new Note({
        title,dec,tag,user:req.user.id
    })
    const savenote=await newnote.save();
    res.json({savenote});


} catch (error) {
    res.status(401).send("could not add new notes");
}
}


)
}

//Router 3:for update router with user logged in
{
router.post('/updatenote/:id',fetchuser,async (req,res)=>
{


//taking inputs for update in body give title dec and tag for updation
const {title,dec,tag}=req.body;
const updatednote={}//for save updated note 
if(title){ updatednote.title=title}//if title is updated it is ADDED to temp created note
if(dec){ updatednote.dec=dec}//if dec is updated it is added to temp created note
if(tag){ updatednote.tag=tag}//if tag is updated it is added to temp created note

//find that particular note
let  findnote =await Note.findById(req.params.id);
if(!findnote)
{
    res.status(404).send("not find you note");
    
}
if(findnote.user.toString()!=req.user.id)
{
    return  res.status(405).send("you are not authorized to do this");

}
findnote =await Note.findByIdAndUpdate(req.params.id,{$set:updatednote},{new:true});

res.json({findnote});
})
}


// //Router 3:for delete by using router.delete:/api/notes/deletenote/:id
// {

//     router.post('/deletenote/:id',fetchuser,async (req,res)=>
//     {
    
    

    
//     //find that particular note
//     let  findnote =await Note.findById(req.params.id);
//     if(!findnote)
//     {
//         res.status(404).send("not find you note");
        
//     }
//     //first varify user is authorized or not
//     if(findnote.user.toString()!=req.user.id)
//     {
//         return  res.status(405).send("you are not authorized to do this");
    
//     }

//     findnote =await Note.findByIdAndDelete(req.params.id,{new:true});
    
//     res.json({  sucess:"your note is deleted",findnote});
//     })


//}
module.exports=router;