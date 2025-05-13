import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';

const isValidCPF = (cpf: string) => {
  cpf = cpf.replace(/[^\d]+/g, '');
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

  let sum = 0;
  for (let i = 0; i < 9; i++) sum += parseInt(cpf.charAt(i)) * (10 - i);
  let rest = (sum * 10) % 11;
  if (rest === 10 || rest === 11) rest = 0;
  if (rest !== parseInt(cpf.charAt(9))) return false;

  sum = 0;
  for (let i = 0; i < 10; i++) sum += parseInt(cpf.charAt(i)) * (11 - i);
  rest = (sum * 10) % 11;
  if (rest === 10 || rest === 11) rest = 0;
  return rest === parseInt(cpf.charAt(10));
};

const formatDocument = (value: string, type: 'CPF' | 'CNPJ') => {
  const numbers = value.replace(/\D/g, '');

  if (type === 'CPF') {
    return numbers
      .replace(/^(\d{3})(\d)/, '$1.$2')
      .replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
      .replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4');
  } else {
    return numbers
      .replace(/^(\d{2})(\d)/, '$1.$2')
      .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
      .replace(/^(\d{2})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3/$4')
      .replace(/^(\d{2})\.(\d{3})\.(\d{3})\/(\d{4})(\d)/, '$1.$2.$3/$4-$5');
  }
};

const isValidCNPJ = (cnpj: string) => {
  cnpj = cnpj.replace(/[^\d]+/g, '');
  if (cnpj.length !== 14 || /^(\d)\1+$/.test(cnpj)) return false;

  let length = cnpj.length - 2;
  let numbers = cnpj.substring(0, length);
  let digits = cnpj.substring(length);
  let sum = 0;
  let pos = length - 7;

  for (let i = length; i >= 1; i--) {
    sum += parseInt(numbers.charAt(length - i)) * pos--;
    if (pos < 2) pos = 9;
  }

  let result = sum % 11 < 2 ? 0 : 11 - sum % 11;
  if (result !== parseInt(digits.charAt(0))) return false;

  length++;
  numbers = cnpj.substring(0, length);
  sum = 0;
  pos = length - 7;

  for (let i = length; i >= 1; i--) {
    sum += parseInt(numbers.charAt(length - i)) * pos--;
    if (pos < 2) pos = 9;
  }

  result = sum % 11 < 2 ? 0 : 11 - sum % 11;
  return result === parseInt(digits.charAt(1));
};

const LoginPage = () => {
  const [documentId, setDocumentId] = useState('');
  const [documentType, setDocumentType] = useState<'CPF' | 'CNPJ'>('CNPJ');
  const { setUser } = useUser();
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '');
    setDocumentId(raw);
  };

  const handleLogin = () => {
    if (!documentId.trim()) return;

    const isValid =
      documentType === 'CPF' ? isValidCPF(documentId) : isValidCNPJ(documentId);

    if (!isValid) {
      alert(`O ${documentType} informado é inválido.`);
      return;
    }

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
        height: '100vh',
        backgroundColor: '#0f172a',
        color: 'white',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <div
        style={{
          backgroundColor: '#1e293b',
          padding: '40px',
          borderRadius: '10px',
          width: '100%',
          maxWidth: '400px',
          boxShadow: '0 0 10px rgba(0,0,0,0.3)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <h1 style={{ textAlign: 'center', marginBottom: '30px', color: '#60a5fa' }}>
          Big Chat Brasil
        </h1>

        <input
          type="text"
          placeholder="Digite seu CPF ou CNPJ"
          value={formatDocument(documentId, documentType)}
          onChange={handleInputChange}
          maxLength={documentType === 'CPF' ? 14 : 18} // conta os pontos e traços
          style={{
            width: '100%',
            padding: '10px',
            marginBottom: '20px',
            border: '1px solid #334155',
            borderRadius: '5px',
            backgroundColor: '#0f172a',
            color: 'white',
          }}
        />
        
        <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-around' }}>
          <label>
            <input
              type="radio"
              checked={documentType === 'CPF'}
              onChange={() => setDocumentType('CPF')}
            />{' '}
            CPF
          </label>
          <label>
            <input
              type="radio"
              checked={documentType === 'CNPJ'}
              onChange={() => setDocumentType('CNPJ')}
            />{' '}
            CNPJ
          </label>
        </div>

        <button
          onClick={handleLogin}
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}
        >
          Entrar
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
