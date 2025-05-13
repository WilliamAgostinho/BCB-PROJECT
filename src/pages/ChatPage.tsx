  import React, { useState, useEffect, useRef, JSX } from 'react';
  import { useUser } from '../contexts/UserContext';
  import { MdPriorityHigh } from 'react-icons/md';

  interface ChatPageProps {
    conversationId: string;
    isUrgent: boolean;
    onUrgencyChange: (isUrgent: boolean) => void;
  }

  const contacts = [
    { id: '1', name: 'Maria Oliveira' },
    { id: '2', name: 'Carlos Pereira' },
    { id: '3', name: 'Ana Costa' },
  ];

  const ChatPage = ({ conversationId, isUrgent, onUrgencyChange }: ChatPageProps) => {
    const contact = contacts.find((c) => c.id === conversationId);
    const { user, setUser } = useUser();
    const custoPorMensagem = 0.15;

    const [consumo, setConsumo] = useState<string[]>([]);
    const [isUrgentLocal, setIsUrgentLocal] = useState(isUrgent);
    const [isTyping, setIsTyping] = useState(false);
    const [newMessage, setNewMessage] = useState('');
    const endOfMessagesRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
     setIsUrgentLocal(isUrgent);
    }, [isUrgent]);

    const [messages, setMessages] = useState([
      {
        sender: 'Maria',
        content: 'Olá, como vai?',
        timestamp: '9:30',
        type: 'received',
        status: 'read',
        priority: '',
      },
      {
        sender: 'Você',
        content: 'Estou bem, obrigado!',
        timestamp: '9:32',
        type: 'sent',
        status: 'read',
        priority: '',
      },
      {
        sender: 'Maria',
        content: 'Olá, como vai de novo?',
        timestamp: '9:34',
        type: 'received',
        status: 'read',
        priority: '',
      },
    ]);

    useEffect(() => {
      endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const simularResposta = () => {
      setIsTyping(true);

      setTimeout(() => {
        setIsTyping(false);

        const resposta = {
          sender: contact?.name ?? 'Atendente',
          content: 'Recebido! Já te respondo. 😊',
          timestamp: new Date().toLocaleTimeString(),
          type: 'received',
          status: 'sent',
          priority: 'normal',
        };

        setMessages((prev) => [...prev, resposta]);
      }, 2000);
    };

    const handleSendMessage = () => {
      if (!newMessage.trim()) return;

      const timestamp = new Date().toLocaleTimeString();
      const prioridade = isUrgent ? 'urgente' : 'normal';

      const newMessageObject = {
        sender: 'Você',
        content: newMessage,
        timestamp,
        type: 'sent',
        status: 'sent',
        priority: isUrgent ? 'urgent' : 'normal',
      };

      setMessages((prev) => [...prev, newMessageObject]);

      if (user && user.balance !== undefined) {
        const novoSaldo = parseFloat((user.balance - custoPorMensagem).toFixed(2));

        setUser((prevUser) =>
          prevUser
            ? {
                ...prevUser,
                balance: novoSaldo,
              }
            : null
        );

        setConsumo((prev) => [
          ...prev,
          `Mensagem enviada para ${contact?.name ?? 'contato desconhecido'} às ${timestamp} (${prioridade}) - R$ ${custoPorMensagem.toFixed(2)} debitado`,
        ]);
      }

      setNewMessage('');
      setIsUrgentLocal(false);

      setTimeout(() => {
        setMessages((prev) =>
          prev.map((msg, i) =>
            i === prev.length - 1
              ? {
                  ...msg,
                  status: Math.random() > 0.2 ? 'read' : 'failed',
                }
              : msg
          )
        );
      }, 2000);

      simularResposta();
    };


    const formatarTexto = (texto: string): JSX.Element[] => {
      const partes = texto.split(/(\*[^*]+\*)/g);

      return partes.map((parte, index) => {
        if (parte.startsWith('*') && parte.endsWith('*')) {
          return <strong key={index}>{parte.slice(1, -1)}</strong>;
        }

        const comEmoji = parte
          .replace(/:smile:/g, '😄')
          .replace(/:thumbsup:/g, '👍')
          .replace(/:fire:/g, '🔥');

        return <span key={index}>{comEmoji}</span>;
      });
    };

    return (
      <div
        style={{
          padding: '20px',
          backgroundColor: '#0b141a',
          minHeight: '100vh',
          fontFamily: 'Arial, sans-serif',
          color: '#111827',
        }}
      >
        <h2 style={{ marginBottom: '5px', marginTop: '10px', color: 'white' }}>
          Chat com {contact?.name ?? 'Contato desconhecido'}
        </h2>

        <p style={{ marginBottom: '12px', color: 'white' }}>
          <strong>Saldo:</strong> R$ {user?.balance?.toFixed(2)}
        </p>

        <label style={{ display: 'block', marginBottom: '16px', color: 'white' }}>
          <input
            type="checkbox"
            checked={isUrgentLocal}
            onChange={(e) => {
              const checked = e.target.checked;
              setIsUrgentLocal(checked);
              onUrgencyChange(checked); 
            }}
          />
          Marcar como <strong>urgente</strong> <MdPriorityHigh size={18} color="#f87171" title="Urgente" />
        </label>

        <div
          style={{
            backgroundColor: '#0b151a',
            borderRadius: '8px',
            padding: '16px',
            maxHeight: '60vh',
            overflowY: 'auto',
            marginBottom: '16px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          }}
        >
          {messages.map((msg, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                justifyContent: msg.type === 'sent' ? 'flex-end' : 'flex-start',
                marginBottom: '10px',
              }}
            >
              <div
                style={{
                  background: msg.type === 'sent' ? '#DCF8C6' : '#e5e7eb',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  maxWidth: '60%',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                  position: 'relative',
                  color: '#000',
                }}
              >
                <p style={{ margin: 0, fontSize: '0.95em' }}>
                  <strong>{msg.sender}</strong>: {formatarTexto(msg.content)}{' '}
                  {msg.priority === 'urgent' && '⚡'}
                </p>
                <div
                  style={{
                    textAlign: 'right',
                    fontSize: '0.75em',
                    marginTop: '5px',
                    color: '#555',
                  }}
                >
                  {msg.timestamp}
                  {msg.type === 'sent' && (
                    <>
                      {' '}
                      {msg.status === 'sent' && '✓'}
                      {msg.status === 'read' && '✓✓'}
                      {msg.status === 'failed' && '❌'}
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
          <div ref={endOfMessagesRef} />
        </div>

        {isTyping && (
          <p style={{ fontStyle: 'italic', color: 'white', marginBottom: '12px'   }}>
            {contact?.name ?? 'Contato'} está digitando...
          </p>
        )}

        <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Digite sua mensagem..."
            style={{
              flex: 1,
              padding: '10px',
              borderRadius: '8px',
              border: '1px solid #ccc',
              fontSize: '1em',
            }}
          />
          <button
            onClick={handleSendMessage}
            style={{
              padding: '10px 16px',
              borderRadius: '8px',
              backgroundColor: '#3b82f6',
              color: '#fff',
              fontWeight: 'bold',
              border: 'none',
              cursor: 'pointer',
              transition: 'background-color 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#2563eb')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#3b82f6')}
          >
            Enviar
          </button>
        </div>

        <div>
          <h3 style={{ marginBottom: '8px', color: 'white' }}>Histórico de Consumo</h3>
          {consumo.length === 0 ? (
            <p style={{ fontStyle: 'italic', color: '#6b7280' }}>
              Nenhuma atividade registrada.
            </p>
          ) : (
            <ul style={{ paddingLeft: '18px' }}>
              {consumo.map((item, index) => (
                <li key={index} style={{ color: 'white' }}>{item}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );  
  };

  export default ChatPage;
