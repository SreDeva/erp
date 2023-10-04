import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import { useAuthContext } from './hooks/useAuthContext';
import Login from './pages/login';
import Home from './pages/Home';
import Signup from './pages/signup';
import AdminPage from './pages/admin';

function App() {
  const { user } = useAuthContext()

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route 
            path='/'
            element={user ? <Home /> : <Navigate to="/login" />}
          />
          <Route 
            path='/login'
            element={!user ? <Login /> : <Navigate to="/" />} 
          />
          <Route 
            path='/signup'
            element={!user ? <Signup /> : <Navigate to="/" />}
          />
          <Route 
            path='/admin'
            element={!user ? <AdminPage /> : <Navigate to="/" />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
