import './App.css';

import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <div className="App">

      {/* <Link to="/">Home</Link>
      <Link to="/register">Register</Link>
      <Link to="/login">Login</Link> */}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
      </Routes>

    </div>
  );
}

export default App;
