// import {BrowserRouter as Router,Routes ,Route,useNavigate} from 'react-router-dom';
// import { useEffect } from 'react';
import Login from './components/Login';
import Player from './components/player/Player';

function App() {

  return (
    <div className="App">
      <Login></Login>
      <Player></Player>
      {/* <Router>
        <Routes>
          <Route exact path='/' element={<Login/>}></Route>
          <Route path='/player' element={<Player/>}></Route>
        </Routes>
      </Router> */}
 
    </div>
  )
}

export default App
