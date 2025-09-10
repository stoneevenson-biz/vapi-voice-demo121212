// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    const demoButton = document.getElementById('startDemo');
    let vapiWidget = null;
    let isVapiReady = false;
    
    // Function to check if Vapi is ready
    function checkVapiReady() {
        vapiWidget = document.querySelector('vapi-widget');
        if (vapiWidget && window.VapiWidget) {
            isVapiReady = true;
            console.log('Vapi widget is ready');
        }
        return isVapiReady;
    }
    
    // Function to start the demo
    function startDemo() {
        try {
            // Wait for Vapi to be ready
            if (!checkVapiReady()) {
                console.log('Vapi not ready yet, waiting...');
                setTimeout(() => {
                    startDemo();
                }, 500);
                return;
            }
            
            // Try to start the widget
            if (vapiWidget && typeof vapiWidget.start === 'function') {
                vapiWidget.start();
                updateButtonState('active');
            } else if (window.VapiWidget && window.VapiWidget.start) {
                window.VapiWidget.start();
                updateButtonState('active');
            } else {
                // Fallback: try to trigger the widget programmatically
                const event = new CustomEvent('vapi-start');
                document.dispatchEvent(event);
                updateButtonState('active');
            }
        } catch (error) {
            console.error('Error starting demo:', error);
            showError('Unable to start the voice demo. Please try again.');
            updateButtonState('inactive');
        }
    }
    
    // Function to stop the demo
    function stopDemo() {
        try {
            if (vapiWidget && typeof vapiWidget.stop === 'function') {
                vapiWidget.stop();
            } else if (window.VapiWidget && window.VapiWidget.stop) {
                window.VapiWidget.stop();
            }
            updateButtonState('inactive');
        } catch (error) {
            console.error('Error stopping demo:', error);
            updateButtonState('inactive');
        }
    }
    
    // Function to update button state
    function updateButtonState(state) {
        if (!demoButton) return;
        
        const buttonText = demoButton.querySelector('.button-text');
        const micIcon = demoButton.querySelector('.mic-icon-large');
        
        if (!buttonText || !micIcon) return;
        
        switch(state) {
            case 'active':
                buttonText.textContent = 'Demo Active - Click to Stop';
                micIcon.textContent = '🔴';
                demoButton.style.background = 'linear-gradient(45deg, #00b894, #00a085)';
                demoButton.disabled = false;
                break;
            case 'inactive':
                buttonText.textContent = 'Start Voice Demo';
                micIcon.textContent = '🎤';
                demoButton.style.background = 'linear-gradient(45deg, #ff6b6b, #ee5a24)';
                demoButton.disabled = false;
                break;
            case 'loading':
                buttonText.textContent = 'Starting Demo...';
                micIcon.textContent = '⏳';
                demoButton.disabled = true;
                break;
        }
    }
    
    // Function to show error message
    function showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #ff4757;
            color: white;
            padding: 1rem 2rem;
            border-radius: 10px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.3);
            z-index: 1000;
            animation: slideIn 0.3s ease;
        `;
        errorDiv.textContent = message;
        
        document.body.appendChild(errorDiv);
        
        // Remove error message after 5 seconds
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.remove();
            }
        }, 5000);
    }
    
    // Add CSS for error animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    // Event listener for demo button
    if (demoButton) {
        demoButton.addEventListener('click', function() {
            if (demoButton.disabled) return;
            
            const isActive = demoButton.querySelector('.button-text').textContent.includes('Active');
            
            if (isActive) {
                stopDemo();
            } else {
                updateButtonState('loading');
                setTimeout(() => {
                    startDemo();
                }, 1000);
            }
        });
        
        // Add some visual feedback for better UX
        demoButton.addEventListener('mouseenter', function() {
            if (!demoButton.disabled) {
                demoButton.style.transform = 'translateY(-3px) scale(1.05)';
            }
        });
        
        demoButton.addEventListener('mouseleave', function() {
            if (!demoButton.disabled) {
                demoButton.style.transform = 'translateY(0) scale(1)';
            }
        });
        
        // Focus management for accessibility
        demoButton.setAttribute('tabindex', '0');
        demoButton.setAttribute('role', 'button');
        demoButton.setAttribute('aria-label', 'Start voice demo with AI assistant');
    }
    
    // Listen for Vapi widget events
    document.addEventListener('vapi-call-start', function() {
        console.log('Voice call started');
        updateButtonState('active');
    });
    
    document.addEventListener('vapi-call-end', function() {
        console.log('Voice call ended');
        updateButtonState('inactive');
    });
    
    // Listen for Vapi widget ready event
    document.addEventListener('vapi-ready', function() {
        console.log('Vapi widget is ready');
        isVapiReady = true;
    });
    
    // Add keyboard support
    document.addEventListener('keydown', function(event) {
        if (event.key === ' ' || event.key === 'Enter') {
            if (document.activeElement === demoButton) {
                event.preventDefault();
                demoButton.click();
            }
        }
    });
    
    // Check if Vapi is already loaded
    setTimeout(() => {
        checkVapiReady();
    }, 2000);
});

