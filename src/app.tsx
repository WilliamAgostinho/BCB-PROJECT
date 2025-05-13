import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import MainChatPage from './pages/MainChatPage';
import { useUser } from './contexts/UserContext';

function App() {
  const { user } = useUser();

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/conversations"
          element={user ? <MainChatPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/chat/:conversationId"
          element={user ? <MainChatPage /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
