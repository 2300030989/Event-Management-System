import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Events from './pages/Events';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Bookings from './pages/Bookings';

function PrivateRoute({ children }) {
  const isAuthenticated = localStorage.getItem('currentUser') !== null;
  return isAuthenticated ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
        <Navbar />
        <Routes>
          <Route path="/" element={
            <div className="min-h-screen bg-cover bg-center" style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80)',
              backgroundAttachment: 'fixed'
            }}>
              <div className="min-h-screen bg-black/50 flex items-center justify-center">
                <div className="text-center text-white p-8">
                  <h1 className="text-5xl font-bold mb-4">Welcome to EventHub</h1>
                  <p className="text-xl mb-8">Discover and book amazing events near you</p>
                  <a href="/login" className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors">
                    Get Started
                  </a>
                </div>
              </div>
            </div>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/events" element={
            <PrivateRoute>
              <Events />
            </PrivateRoute>
          } />
          <Route path="/bookings" element={
            <PrivateRoute>
              <Bookings />
            </PrivateRoute>
          } />
        </Routes>
      </div>
    </Router>
  );
}
export default App;