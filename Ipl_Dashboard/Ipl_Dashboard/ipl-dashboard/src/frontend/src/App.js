import './App.scss';
import {HashRouter as Router, Routes, Route} from 'react-router-dom';
import { TeamPage } from './Pages/TeamPage';
import { MatchPage } from './Pages/MatchPage';
import { HomePage } from './Pages/HomePage';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
            <Route path = "/teams/:teamName/matches/:year" element={<MatchPage/>} />
            <Route path = "/teams/:teamName" element={<TeamPage/>} />
            <Route path = "" element={<HomePage/>} />
        </Routes> 
      </Router>
      
    </div>
  );
}

export default App;
