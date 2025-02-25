import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from './Pages/LandingPage'
import Login from './Pages/login';
import Sign from './Pages/Sign';
import Main from './Pages/Main';
import Profile from './Pages/Profile';
import NotFound from './Pages/NotFound';

import AppContextProvider from './Context/AppContext';
import './App.css'

function App() {

  return (
    <div className="App bg-white dark:bg-black">
      <BrowserRouter>
        <AppContextProvider>
          <Routes>
            <Route path='/' element={<LandingPage />} />
            <Route path='login' element={<Login />} />
            <Route path='sign' element={<Sign />} />
            <Route path='main/:userId' element={<Main />} />
            <Route path='profile/:userId' element={<Profile />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </AppContextProvider>

      </BrowserRouter>
    </div>
  )
}

export default App
