
// import { useEffect } from 'react';
import Login from './components/Login';
import Home from './components/Home';
import Callback from './components/Callback';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './store/AppProvider';
function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path='/' element={<Login/>}></Route>
          <Route path='/callback' element={<Callback/>}></Route>

            <Route path='/home' element={
                        <AppProvider>
                          <Home/>
                        </AppProvider>
            }>
            </Route>
        </Routes>
      </Router>
 
    </div>
  )
}

export default App
