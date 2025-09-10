import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [isCallActive, setIsCallActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [callStatus, setCallStatus] = useState('Ready to start');
  const [vapi, setVapi] = useState(null);

  useEffect(() => {
    // Load Vapi Web SDK
    const loadVapiSDK = async () => {
      try {
        // Dynamically import the Vapi Web SDK
        const VapiModule = await import('@vapi-ai/web');
        const Vapi = VapiModule.default;
        
        // Initialize Vapi with your public key
        const vapiInstance = new Vapi('b86bc4f5-3cd9-43b3-81f4-99f23c97df90');
        
        // Set up event listeners
        vapiInstance.on('call-start', () => {
          console.log('Call started');
          setIsCallActive(true);
          setCallStatus('Call active - Click to end');
          setIsLoading(false);
        });

        vapiInstance.on('call-end', () => {
          console.log('Call ended');
          setIsCallActive(false);
          setCallStatus('Call ended');
          setTimeout(() => setCallStatus('Ready to start'), 2000);
        });

        vapiInstance.on('message', (message) => {
          if (message.type === 'transcript') {
            console.log(`${message.role}: ${message.transcript}`);
          }
        });

        vapiInstance.on('error', (error) => {
          console.error('Vapi error:', error);
          setError('Voice call error. Please try again.');
          setIsLoading(false);
          setCallStatus('Ready to start');
        });

        setVapi(vapiInstance);
        setCallStatus('Ready to start');
        console.log('Vapi SDK loaded successfully');
      } catch (err) {
        console.error('Failed to load Vapi SDK:', err);
        setError('Failed to load voice agent. Please refresh the page.');
      }
    };

    loadVapiSDK();
  }, []);

  const handleMicClick = () => {
    if (!vapi) {
      setError('Voice agent not ready. Please wait and try again.');
      return;
    }

    if (isCallActive) {
      // Stop the call
      try {
        vapi.stop();
        setIsCallActive(false);
        setCallStatus('Call ended');
      } catch (err) {
        console.error('Error stopping call:', err);
        setError('Failed to stop voice call.');
      }
    } else {
      // Start the call
      setIsLoading(true);
      setError(null);
      setCallStatus('Starting call...');

      try {
        // Start voice conversation with your assistant ID
        vapi.start('8d6f11ee-dd40-4850-b0b3-ff86b5418990');
      } catch (err) {
        console.error('Error starting call:', err);
        setError('Failed to start voice call. Please try again.');
        setIsLoading(false);
        setCallStatus('Ready to start');
      }
    }
  };

  return (
    <div className="app">
      {/* Background Animation */}
      <div className="background-animation">
        <div className="wave wave1"></div>
        <div className="wave wave2"></div>
        <div className="wave wave3"></div>
      </div>

      {/* Main Content */}
      <div className="container">
        {/* Header */}
        <header className="header">
          <div className="logo">
            <div className="logo-icon">🎤</div>
            <h1>Vapi AI Voice Agent</h1>
          </div>
          <p className="tagline">Powered by AI for Mortgage Brokers</p>
        </header>

        {/* Main Interface */}
        <main className="main-interface">
          {/* Status Display */}
          <div className="status-display">
            <div className={`status-indicator ${isCallActive ? 'active' : ''} ${vapi ? 'ready' : 'loading'}`}>
              <div className="pulse-ring"></div>
              <div className="pulse-ring delay-1"></div>
              <div className="pulse-ring delay-2"></div>
            </div>
            <p className="status-text">
              {!vapi ? 'Loading voice agent...' : callStatus}
            </p>
          </div>

          {/* Microphone Button */}
          <div className="mic-container">
            <button
              className={`mic-button ${isCallActive ? 'active' : ''} ${isLoading ? 'loading' : ''} ${!vapi ? 'disabled' : ''}`}
              onClick={handleMicClick}
              disabled={isLoading || !vapi}
              aria-label={isCallActive ? 'End voice call' : 'Start voice call'}
            >
              <div className="mic-icon">
                {!vapi ? '⏳' : isLoading ? '⏳' : isCallActive ? '🔴' : '🎤'}
              </div>
              <div className="mic-ripple"></div>
            </button>
          </div>

          {/* Instructions */}
          <div className="instructions">
            <h2>Experience the Future of Mortgage Brokerage</h2>
            <p>
              Click the microphone to start a conversation with our AI voice agent. 
              Ask about mortgage products, rates, or any questions your clients might have.
            </p>
          </div>

          {/* Features */}
          <div className="features">
            <div className="feature-card">
              <div className="feature-icon">📞</div>
              <h3>Outbound Calls</h3>
              <p>Proactive client outreach</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📥</div>
              <h3>Inbound Support</h3>
              <p>Instant client assistance</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🏠</div>
              <h3>Mortgage Expertise</h3>
              <p>Specialized knowledge</p>
            </div>
          </div>
        </main>

        {/* Error Display */}
        {error && (
          <div className="error-message">
            <span className="error-icon">⚠️</span>
            {error}
            <button onClick={() => setError(null)} className="error-close">×</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
