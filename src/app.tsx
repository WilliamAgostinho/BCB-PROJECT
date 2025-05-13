import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import MainChatPage from './pages/MainChatPage';

const App = () => {
  // Verifica se o usuário está logado a partir do localStorage
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(localStorage.getItem('isLoggedIn') === 'true');

  const handleLogin = () => {
    localStorage.setItem('isLoggedIn', 'true'); // Salva no localStorage
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn'); // Remove o estado do localStorage ao deslogar
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route
          path="/conversations"
          element={isLoggedIn ? <MainChatPage /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
