import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [outboundCall, setOutboundCall] = useState({ active: false, loading: false });
  const [inboundCall, setInboundCall] = useState({ active: false, loading: false });
  const [error, setError] = useState(null);
  const [vapi, setVapi] = useState(null);

  // Vapi configuration
  const VAPI_CONFIG = {
    publicKey: 'b86bc4f5-3cd9-43b3-81f4-99f23c97df90',
    outboundAssistantId: '7106d8b4-490a-4ad2-99ac-a10318825253',
    inboundAssistantId: 'c52a419c-9b4b-4e76-83c0-b856ece1e95d'
  };

  useEffect(() => {
    // Load Vapi Web SDK
    const loadVapiSDK = async () => {
      try {
        const VapiModule = await import('@vapi-ai/web');
        const Vapi = VapiModule.default;
        
        // Initialize Vapi with public key
        const vapiInstance = new Vapi(VAPI_CONFIG.publicKey);
        
        // Set up event listeners
        vapiInstance.on('call-start', (call) => {
          console.log('Call started:', call);
          // Determine which call type based on assistant ID
          if (call.assistantId === VAPI_CONFIG.outboundAssistantId) {
            setOutboundCall(prev => ({ ...prev, active: true, loading: false }));
          } else if (call.assistantId === VAPI_CONFIG.inboundAssistantId) {
            setInboundCall(prev => ({ ...prev, active: true, loading: false }));
          }
        });

        vapiInstance.on('call-end', (call) => {
          console.log('Call ended:', call);
          // Determine which call type based on assistant ID
          if (call.assistantId === VAPI_CONFIG.outboundAssistantId) {
            setOutboundCall(prev => ({ ...prev, active: false, loading: false }));
          } else if (call.assistantId === VAPI_CONFIG.inboundAssistantId) {
            setInboundCall(prev => ({ ...prev, active: false, loading: false }));
          }
        });

        vapiInstance.on('message', (message) => {
          if (message.type === 'transcript') {
            console.log(`${message.role}: ${message.transcript}`);
          }
        });

        vapiInstance.on('error', (error) => {
          console.error('Vapi error:', error);
          setError('Voice call error. Please try again.');
          setOutboundCall(prev => ({ ...prev, loading: false }));
          setInboundCall(prev => ({ ...prev, loading: false }));
        });

        setVapi(vapiInstance);
        console.log('Vapi SDK loaded successfully');
      } catch (err) {
        console.error('Failed to load Vapi SDK:', err);
        setError('Failed to load voice agent. Please refresh the page.');
      }
    };

    loadVapiSDK();
  }, []);

  const handleOutboundCall = () => {
    if (!vapi) {
      setError('Voice agent not ready. Please wait and try again.');
      return;
    }

    if (outboundCall.active) {
      // Stop outbound call
      try {
        vapi.stop();
        setOutboundCall(prev => ({ ...prev, active: false }));
      } catch (err) {
        console.error('Error stopping outbound call:', err);
        setError('Failed to stop outbound call.');
      }
    } else {
      // Start outbound call
      setOutboundCall(prev => ({ ...prev, loading: true }));
      setError(null);

      try {
        vapi.start(VAPI_CONFIG.outboundAssistantId);
      } catch (err) {
        console.error('Error starting outbound call:', err);
        setError('Failed to start outbound call. Please try again.');
        setOutboundCall(prev => ({ ...prev, loading: false }));
      }
    }
  };

  const handleInboundCall = () => {
    if (!vapi) {
      setError('Voice agent not ready. Please wait and try again.');
      return;
    }

    if (inboundCall.active) {
      // Stop inbound call
      try {
        vapi.stop();
        setInboundCall(prev => ({ ...prev, active: false }));
      } catch (err) {
        console.error('Error stopping inbound call:', err);
        setError('Failed to stop inbound call.');
      }
    } else {
      // Start inbound call
      setInboundCall(prev => ({ ...prev, loading: true }));
      setError(null);

      try {
        vapi.start(VAPI_CONFIG.inboundAssistantId);
      } catch (err) {
        console.error('Error starting inbound call:', err);
        setError('Failed to start inbound call. Please try again.');
        setInboundCall(prev => ({ ...prev, loading: false }));
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
          {/* Instructions */}
          <div className="instructions">
            <h2>Experience the Future of Mortgage Brokerage</h2>
            <p>
              Test both our outbound and inbound AI voice agents. Click the microphones below to start conversations 
              and experience how our AI can help with mortgage sales and customer support.
            </p>
          </div>

          {/* Microphone Buttons */}
          <div className="mic-buttons-container">
            {/* Outbound Button */}
            <div className="mic-section">
              <div className="mic-header">
                <h3>Outbound Demo</h3>
                <p>Proactive client outreach</p>
              </div>
              <div className="mic-container">
                <button
                  className={`mic-button outbound ${outboundCall.active ? 'active' : ''} ${outboundCall.loading ? 'loading' : ''} ${!vapi ? 'disabled' : ''}`}
                  onClick={handleOutboundCall}
                  disabled={outboundCall.loading || !vapi}
                  aria-label={outboundCall.active ? 'End outbound call' : 'Start outbound call'}
                >
                  <div className="mic-icon">
                    {!vapi ? '⏳' : outboundCall.loading ? '⏳' : outboundCall.active ? '🔴' : '📞'}
                  </div>
                  <div className="mic-ripple"></div>
                </button>
              </div>
              <div className="status-display">
                <div className={`status-indicator ${outboundCall.active ? 'active' : ''} ${!vapi ? 'loading' : 'ready'}`}>
                  <div className="pulse-ring"></div>
                  <div className="pulse-ring delay-1"></div>
                  <div className="pulse-ring delay-2"></div>
                </div>
                <p className="status-text">
                  {!vapi ? 'Loading...' : outboundCall.loading ? 'Starting...' : outboundCall.active ? 'Call Active' : 'Ready to Start'}
                </p>
              </div>
            </div>

            {/* Inbound Button */}
            <div className="mic-section">
              <div className="mic-header">
                <h3>Inbound Demo</h3>
                <p>Customer support & inquiries</p>
              </div>
              <div className="mic-container">
                <button
                  className={`mic-button inbound ${inboundCall.active ? 'active' : ''} ${inboundCall.loading ? 'loading' : ''} ${!vapi ? 'disabled' : ''}`}
                  onClick={handleInboundCall}
                  disabled={inboundCall.loading || !vapi}
                  aria-label={inboundCall.active ? 'End inbound call' : 'Start inbound call'}
                >
                  <div className="mic-icon">
                    {!vapi ? '⏳' : inboundCall.loading ? '⏳' : inboundCall.active ? '🔴' : '📥'}
                  </div>
                  <div className="mic-ripple"></div>
                </button>
              </div>
              <div className="status-display">
                <div className={`status-indicator ${inboundCall.active ? 'active' : ''} ${!vapi ? 'loading' : 'ready'}`}>
                  <div className="pulse-ring"></div>
                  <div className="pulse-ring delay-1"></div>
                  <div className="pulse-ring delay-2"></div>
                </div>
                <p className="status-text">
                  {!vapi ? 'Loading...' : inboundCall.loading ? 'Starting...' : inboundCall.active ? 'Call Active' : 'Ready to Start'}
                </p>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="features">
            <div className="feature-card">
              <div className="feature-icon">📞</div>
              <h3>Outbound Calls</h3>
              <p>Proactive client outreach and lead generation for mortgage brokers</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📥</div>
              <h3>Inbound Support</h3>
              <p>Instant responses to client inquiries and mortgage questions</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🏠</div>
              <h3>Mortgage Expertise</h3>
              <p>Specialized knowledge in mortgage products and processes</p>
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
