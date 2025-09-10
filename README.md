# Vapi AI Voice Agent Demo

A beautiful React landing page for demonstrating Vapi AI voice agents designed for mortgage brokers. Features separate outbound and inbound voice capabilities with stunning UI and smooth animations.

## Features

- 🎤 **Dual Voice Agents**: Separate outbound and inbound voice assistants
- 📱 **Fully Responsive**: Works perfectly on desktop, tablet, and mobile
- 🎨 **Modern UI**: Beautiful gradient design with glassmorphism effects
- ⚡ **Real-time Voice**: Live voice conversations using Vapi Web SDK
- 🔄 **Smooth Animations**: Pulse effects, ripples, and status indicators
- ♿ **Accessible**: Keyboard navigation and screen reader support

## Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd vapi-voice-agent-demo
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## Voice Agents

### Outbound Agent
- **Assistant ID**: `7106d8b4-490a-4ad2-99ac-a10318825253`
- **Purpose**: Proactive client outreach and lead generation
- **Use Case**: Sales calls, follow-ups, appointment setting

### Inbound Agent
- **Assistant ID**: `c52a419c-9b4b-4e76-83c0-b856ece1e95d`
- **Purpose**: Customer support and inquiry handling
- **Use Case**: Answering questions, providing information, support

## Configuration

The voice agents are configured in `src/App.jsx`:

```javascript
const VAPI_CONFIG = {
  publicKey: 'b86bc4f5-3cd9-43b3-81f4-99f23c97df90',
  outboundAssistantId: '7106d8b4-490a-4ad2-99ac-a10318825253',
  inboundAssistantId: 'c52a419c-9b4b-4e76-83c0-b856ece1e95d'
};
```

## Deployment

### Vercel (Recommended)

1. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Deploy with zero configuration

2. **Your demo will be live** at `https://your-project-name.vercel.app`

### Manual Build

```bash
npm run build
npm run preview
```

## Usage

1. **Open the landing page**
2. **Click the Outbound microphone** to test proactive sales calls
3. **Click the Inbound microphone** to test customer support
4. **Speak naturally** - the AI will respond in real-time
5. **Click again to end** the conversation

## Technology Stack

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Vapi Web SDK** - Voice AI integration
- **CSS3** - Modern styling with animations
- **Vercel** - Deployment platform

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## License

MIT License - feel free to use this template for your own projects!

## Support

For issues with the voice agents, check the browser console for error messages. Make sure your microphone permissions are enabled.
