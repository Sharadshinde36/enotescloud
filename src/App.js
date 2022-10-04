
import './App.css';
import Navbar from './components/Navbar';
import About from './components/About';
import Home from './components/Home';
import NoteState from './context/notes/NoteState';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import Alert from './components/Alert';


function App() {
  return (
    <>
<Router>
     <Navbar/>
     <Alert/>
     <NoteState>
<Routes>
    <Route exact path="/" element={<Home/>} />
    <Route exact path="/about" element={<About/>} />
     
     </Routes>
     </NoteState>
     </Router>
    </>
  );
}

export default App;
