
import { useEffect } from 'react';
import Login from './components/Login';
import Home from './components/Home';
import Callback from './components/Callback';
import ReactGA from 'react-ga';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './store/AppProvider';
import { useLocation } from 'react-router-dom';
ReactGA.initialize(import.meta.env.VITE_MEASUREMENT_ID);
const trackPage = (page) => {
  ReactGA.set({ page });
  ReactGA.pageview(page);
};
function App() {
  const location = useLocation();
    useEffect(() => {
      trackPage(location.pathname);
    }, [location]);
  return (
    <div className="App">
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
    </div>
  )
}
function WrappedApp() {
  return (
    <Router>
      <App />
    </Router>
  );
}
export default WrappedApp;
