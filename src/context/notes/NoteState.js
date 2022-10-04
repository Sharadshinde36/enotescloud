import { useState } from "react";
import noteContext from "./noteContext";
const NoteState =(props)=>{
  const host= "http://localhost:5000";
  const notesinitial=[]
  const[notes,setnotes]=useState(notesinitial)



 const getNote=async ()=>{

  console.log("geeting alll notes")
  const response = await fetch(`http://localhost:5000/api/notes/fetchallnotes`, {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.

    
    headers: {
      'Content-Type': 'application/json',
      'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjMzNTc5NmYzZWQ0MWFhMzA2YjhjZGI4In0sImlhdCI6MTY2NDUzNzk5Nn0.kcekg2ya5GwcCBEIhHoxd3RI4l0Jv4KAnB_9MmFSvS8'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    }
  
    
  });

const json=await response.json();

console.log(json);
setnotes(json.notes)



 }








  //add new note function
  const addNote=async (title,dec,tag)=>{//take parameters in the function
    //api for add note
    
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
 
      
      headers: {
        'Content-Type': 'application/json',
        'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjMzNTc5NmYzZWQ0MWFhMzA2YjhjZGI4In0sImlhdCI6MTY2NDUzNzk5Nn0.kcekg2ya5GwcCBEIhHoxd3RI4l0Jv4KAnB_9MmFSvS8'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    
      body: JSON.stringify({title,dec,tag}) // body data type must match "Content-Type" header
    });
 const json= response.json(); 
console.log(json);








    console.log("adding a new note");
   const note={//temp note 
    "_id": "6336c4dc30c79f7c600f1db8",
        "user": "6335796f3ed41aa306b8cdb8",
        "title": title,//dynamic params
        "tag": tag,
        "dec":dec,
        "date": "2022-09-30T10:28:44.553Z",
        "__v": 0

   }
   setnotes(notes.concat(note));//add to existring notes by setnotes

  }
  const editNote=async (id,title,dec ,tag)=>
  {//api call



    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
 
      
      headers: {
        'Content-Type': 'application/json',
        'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjMzNTc5NmYzZWQ0MWFhMzA2YjhjZGI4In0sImlhdCI6MTY2NDUzNzk5Nn0.kcekg2ya5GwcCBEIhHoxd3RI4l0Jv4KAnB_9MmFSvS8'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    
      body: JSON.stringify({title,dec,tag}) // body data type must match "Content-Type" header
    });
  response.json(); // parses JSON response into native JavaScript objects
  
  






    //logic to edit in client
    for(let i=0;i<notes.length;i++)
    {  const not=notes[i];
      if(not._id==id)
      {
        not.title=title;
        not.dec=dec;
        not.tag=tag;
      }
    }
  }
  const deleteNote=(id)=>
  {
    console.log("deletingn the note with id+",id);
    const newnotes=notes.filter((note)=>{return note._id!=id});
    setnotes(newnotes); 
  }
    return( //make aal functyions global
        <noteContext.Provider value={{notes,addNote,deleteNote,getNote}}> 
            {props.children}
        </noteContext.Provider>
    )
}
export default NoteState;