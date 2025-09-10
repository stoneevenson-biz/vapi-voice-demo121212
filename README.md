# Vapi AI Voice Agent Demo

A simple, elegant landing page for demonstrating your Vapi AI voice agent designed for mortgage brokers.

## Features

- 🎤 **One-Click Demo**: Simple microphone button to start/stop the voice demo
- 📱 **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- 🎨 **Modern UI**: Beautiful gradient design with smooth animations
- ♿ **Accessible**: Keyboard navigation and screen reader support
- 🚀 **Vercel Ready**: Optimized for instant deployment

## Quick Deploy to Vercel

1. **Fork or clone this repository**
2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Import your repository
   - Deploy with zero configuration

3. **Your demo will be live** at `https://your-project-name.vercel.app`

## Customization

### Update Vapi Configuration
Edit the widget configuration in `index.html`:
```html
<vapi-widget 
    assistant-id="YOUR_ASSISTANT_ID" 
    public-key="YOUR_PUBLIC_KEY">
</vapi-widget>
```

### Styling
- Modify `styles.css` to change colors, fonts, and layout
- The design uses CSS custom properties for easy theming

### Content
- Update the hero text, features, and descriptions in `index.html`
- Modify the JavaScript behavior in `script.js`

## File Structure

```
├── index.html          # Main HTML file
├── styles.css          # CSS styles
├── script.js           # JavaScript functionality
├── package.json        # Dependencies
├── vercel.json         # Vercel configuration
└── README.md           # This file
```

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## License

MIT License - feel free to use this template for your own projects!
