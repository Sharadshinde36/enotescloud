import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';
function Noteiteam(props) {
  const context=useContext(noteContext)
  const{deleteNote}=context;
    const {note,updatenote}=props;
    
  return (
    <div>
     <div>
   <div className="card">

  <div className="card-body">
    <h5 className="card-title">{note.title} 
    <div><i className="fa-sharp fa-solid fa-pen-to-square " onClick={()=>{updatenote(note);}}></i>
    <i className="fa-sharp fa-solid fa-trash mx-3" onClick={()=>{deleteNote(note._id);}}></i></div></h5>
    <p className="card-text">{note.dec}</p>
    
    
  </div>
</div>
</div>

    </div>
  )
}

export default Noteiteam
