import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

interface Conversation {
  id: string;
  name: string;
  lastMessage: string;
  lastMessageTime: string;
}

interface Props {
  onSelectConversation: (id: string | null) => void;
  urgentConversations: { [id: string]: boolean };
}

const ConversationsPage: React.FC<Props> = ({ onSelectConversation, urgentConversations }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const conversations: Conversation[] = [
    { id: '1', name: 'Maria Oliveira', lastMessage: 'Olá, como vai?', lastMessageTime: '9:30' },
    { id: '2', name: 'Carlos Pereira', lastMessage: 'Poderia me ajudar com...', lastMessageTime: 'Ontem' },
    { id: '3', name: 'Ana Costa', lastMessage: 'Boa tarde, gostaria de...', lastMessageTime: '14/07' },
    { id: '4', name: 'William Souza', lastMessage: 'Boa tarde, gostaria de...', lastMessageTime: '14/07' },
    { id: '5', name: 'AMJ Placas', lastMessage: 'Boa tarde, gostaria de...', lastMessageTime: '14/07' },
  ];

  const filteredConversations = conversations.filter((convo) =>
    convo.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      style={{
        padding: '20px',
        backgroundColor: '#111b21',
        color: 'white',
        minHeight: '100vh',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <h2 style={{ marginBottom: '20px' }}>Conversas</h2>

      <div style={{ position: 'relative', marginBottom: '20px', width: '250px' }}>
        <FiSearch
          style={{
            position: 'absolute',
            left: '10px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#94a3b8',
            pointerEvents: 'none',
          }}
          size={18}
        />
        <input
          type="text"
          placeholder="Buscar contato..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: '12px 12px 12px 36px',
            width: '100%',
            border: '1px solid #334155',
            borderRadius: '8px',
            backgroundColor: '#111b21',
            color: 'white',
            fontSize: '1em',
          }}
        />
      </div>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {filteredConversations.map((convo) => (
          <li
            key={convo.id}
            onClick={() => {
              onSelectConversation(convo.id); 
              navigate(`/chat/${convo.id}`); 
            }}
            style={{
              cursor: 'pointer',
              borderRadius: '10px',
              padding: '15px',
              marginBottom: '12px',
              backgroundColor: '#1e293b',
              transition: 'background-color 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#334155')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#1e293b')}
          >
            <h4 style={{ margin: '0 0 6px 0', fontSize: '1.1em' }}>
              {convo.name} {urgentConversations[convo.id] && <span style={{ color: '#f87171' }}> 🟥 </span>}
            </h4>
            <p style={{ margin: '0 0 4px 0', color: '#cbd5e1' }}>{convo.lastMessage}</p>
            <span style={{ fontSize: '0.85em', color: '#94a3b8' }}>{convo.lastMessageTime}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ConversationsPage;
