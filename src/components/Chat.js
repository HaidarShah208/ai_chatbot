import axios from 'axios';
import React, { useState } from 'react';

export default function Chat() {
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const generateAnswer = async () => {
    if (!question.trim()) return;
    try {
      setLoading(true);
      setQuestion(''); 


      setMessages((prev) => [...prev, { role: 'user', text: question }]);

      const response = await axios({
        url: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyCyVe2oc-dXi8QpEzR_zvRcksngYP3kzAA',
        method: 'post',
        data: { contents: [{ parts: [{ text: question }] }] },
      });

      const aiResponse =
        response.data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response';

      // Add AI's response to the chat
      setMessages((prev) => [...prev, { role: 'ai', text: aiResponse }]);
    } catch (e) {
      console.error(e);
      setMessages((prev) => [...prev, { role: 'ai', text: 'Error generating response' }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();  
      setQuestion('');  
      generateAnswer();  
    }
  };

  return (
    <div
      style={{
        width: '400px',
        height: '500px',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        background: '#fff',
        border: '1px solid #ccc',
        borderRadius: '10px',
        boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
        padding: '10px',
        overflow: 'hidden',
      }}
    >
      <h2>CHAT AI</h2>
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          marginBottom: '10px',
        }}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              marginBottom: '10px',
              padding: '10px',
              borderRadius: '8px',
              maxWidth: '100%',
              backgroundColor: msg.role === 'user' ? '#0056b3' : '#d3d3d3',
              color: msg.role === 'user' ? '#fff' : '#000',
              alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
              textAlign: msg.role === 'user' ? 'right' : 'left',
            }}
          >
            <strong>{msg.role === 'user' ? 'You' : 'AI'}:</strong> {msg.text}
          </div>
        ))}
      </div>

      {loading?<span class="loader"></span>:''}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          borderTop: '1px solid #ccc',
          padding: '10px',
          backgroundColor: '#f1f1f1',
        }}
      >
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={handleKeyDown} // Listen for Enter key
          placeholder="Type your question..."
          style={{
            flex: 1,
            padding: '10px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            marginRight: '10px',
          }}
        />
        <button
          onClick={generateAnswer}
          disabled={loading}
          style={{
            padding: '10px 15px',
            backgroundColor: '#0056b3',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer',
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}
