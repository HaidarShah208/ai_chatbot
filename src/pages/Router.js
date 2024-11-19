import React, { useState } from 'react';
import Chat from '../components/Chat';



export default function Router() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div>
      <h1>Welcome to Chat AI</h1>
      <div
        onClick={() => setIsChatOpen((prev) => !prev)}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          width: '60px',
          height: '60px',
          backgroundColor: '#0056b3',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
        }}
      >
        <span style={{ color: '#fff', fontSize: '24px' }}>💬</span>
      </div>

      {isChatOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '90px',
            right: '20px',
            zIndex: 1000,
          }}
        >
          <Chat />
        </div>
      )}

      {isChatOpen && (
        <div
          onClick={() => setIsChatOpen(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 999,
          }}
        ></div>
      )}
    </div>
  );

}