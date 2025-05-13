import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';

interface Props {
  onLogin: () => void;
}

const LoginPage: React.FC<Props> = ({ onLogin }) => {
  const [documentId, setDocumentId] = useState('');
  const [documentType, setDocumentType] = useState<'CPF' | 'CNPJ'>('CNPJ');
  const { setUser } = useUser();
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!documentId.trim()) {
      alert("Por favor, insira um CPF ou CNPJ válido.");
      return;
    }

    onLogin();

    setUser({
      id: '1',
      name: 'Empresa ABC',
      documentId,
      documentType,
      planType: 'prepaid',
      balance: 10.0,
      active: true,
    });

    navigate('/conversations');
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100vh',
        background: 'linear-gradient(135deg, #0f172a, #1e293b)',
        fontFamily: 'Segoe UI, Roboto, sans-serif',
        padding: '20px',
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          backgroundColor: '#1e293b',
          padding: '40px',
          borderRadius: '16px',
          width: '100%',
          maxWidth: '400px',
          boxShadow: '0 15px 35px rgba(0,0,0,0.5)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <h1
          style={{
            textAlign: 'center',
            marginBottom: '30px',
            color: 'white',
            fontSize: '28px',
            fontWeight: '600',
          }}
        >
          Big Chat Brasil
        </h1>

        <input
          type="text"
          placeholder="Digite seu CPF ou CNPJ"
          value={documentId}
          onChange={(e) => setDocumentId(e.target.value)}
          style={{
            width: '100%',
            padding: '12px',
            marginBottom: '20px',
            border: '1px solid #334155',
            borderRadius: '8px',
            backgroundColor: '#0f172a',
            color: '#f8fafc',
            outline: 'none',
            fontSize: '15px',
            transition: 'border-color 0.3s',
          }}
          onFocus={(e) => (e.currentTarget.style.border = '1px solid #60a5fa')}
          onBlur={(e) => (e.currentTarget.style.border = '1px solid #334155')}
        />

        <div
          style={{
            marginBottom: '20px',
            display: 'flex',
            justifyContent: 'space-between',
            width: '50%',
            color: '#cbd5e1',
            fontSize: '14px',
          }}
        >
          <label>
            <input
              type="radio"
              checked={documentType === 'CPF'}
              onChange={() => setDocumentType('CPF')}
              style={{ marginRight: '6px' }}
            />
            CPF
          </label>
          <label>
            <input
              type="radio"
              checked={documentType === 'CNPJ'}
              onChange={() => setDocumentType('CNPJ')}
              style={{ marginRight: '6px' }}
            />
            CNPJ
          </label>
        </div>

        <button
          onClick={handleLogin}
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontWeight: 'bold',
            fontSize: '16px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#2563eb')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#3b82f6')}
        >
          Entrar
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
