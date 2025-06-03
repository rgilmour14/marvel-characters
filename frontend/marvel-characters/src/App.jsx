import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/NavBar';
import NotFound from './components/NotFound';
import Characters from './components/Characters';
import CharacterDetails from './components/CharacterDetails';
import AddCharacter from './components/AddCharacter'; 
import UpdateCharacter from './components/UpdateCharacter';
import './App.css'; 


function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/characters" element={<Characters />} />
        <Route path="/characters/:characterId" element={<CharacterDetails/>} />
        <Route path="/characters/:id/edit" element={<UpdateCharacter />} />
        <Route path="/addcharacter" element={<AddCharacter />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;