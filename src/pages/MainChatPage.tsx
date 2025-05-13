import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ConversationsPage from './ConversationsPage';
import ChatPage from './ChatPage';

const MainChatPage = () => {
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const [urgentConversations, setUrgentConversations] = useState<{ [id: string]: boolean }>({});
  const navigate = useNavigate();
  const { conversationId } = useParams();

  const handleUrgencyChange = (isUrgent: boolean) => {
    if (!selectedConversationId) return;
    setUrgentConversations((prev) => ({
      ...prev,
      [selectedConversationId]: isUrgent,
    }));
  };

  const handleConversationSelect = (id: string | null) => {  // Agora aceita 'string | null'
    setSelectedConversationId(id);
    if (id) {
      navigate(`/chat/${id}`);  // Apenas navega se um ID de conversa válido for selecionado
    } else {
      // Caso necessário, defina o que ocorre se o ID for nulo
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'Arial, sans-serif', background: '#0b141a' }}>
      <div style={{ width: '30%', borderRight: '1px solid #0b141a', overflowY: 'auto' }}>
        <ConversationsPage
          onSelectConversation={handleConversationSelect}  // Passa a função atualizada
          urgentConversations={urgentConversations}
        />
      </div>

      <div style={{ flex: 1, overflowY: 'auto', color: 'white' }}>
        {conversationId ? (
          <ChatPage
            conversationId={conversationId}
            isUrgent={urgentConversations[conversationId] || false}
            onUrgencyChange={handleUrgencyChange}
          />
        ) : (
          <div style={{ padding: '20px', background: '#0b141a' }}>
            <h2>Selecione uma conversa para começar</h2>
          </div>
        )}
      </div>
    </div>
  );
};


export default MainChatPage;
