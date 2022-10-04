import React,{useContext, useState} from 'react'
import noteContext from '../context/notes/noteContext';

function Addnote() {
    //import contextof note forv adding in existing notes
    const context=useContext(noteContext);
    const{ notes,addNote}=context;//acces of existing notes and add function 

    const[note,setnote]=useState({title:"",dec:"",tag:"default"});//create default note ans set note for store in[puted data]
const handleclick=(e)=>
{e.preventDefault();
    addNote(note.title,note.dec,note.tag);//when enter submit new 
}
const onchange=(e)=>
{
    setnote({...note,[e.target.name]:e.target.value});//when vaalues are change save to strope note and set to store note
}
  return (//addnote input form
    <>  
      <div className='container'>
      <form className='container'>
  <div className="form-group" >
    <label htmlfor="title">Email address</label>
    <input type="text" className="form-control" id="title" name="title"aria-describedby="emailHelp" onChange={onchange} placeholder="Enter Title"/>
    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div className="form-group">
    <label htmlfor="exampleInputPassword1">dec</label>
    <input type="text" className="form-control" id="dec" name="dec" placeholder="add description" onChange={onchange}/>
  </div>
  <div className="form-check">
    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
    <label className="form-check-label" for="exampleCheck1">Check me out</label>
  </div>
  <button type="submit" className="btn btn-primary " id="submit" name="submit" onClick={handleclick} >Submit</button>
  </form>
  </div>
    </>
  )
}

export default Addnote;
