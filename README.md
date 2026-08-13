# Tcongs Infotech - Homepage Redesign

A modern, premium homepage redesign for Tcongs Infotech featuring a futuristic dark theme with dynamic video backgrounds, smooth animations, and an interactive user experience.

## 🎨 Design Features

### Visual Design
- **Dark Theme**: Premium dark color scheme (#07090D) with Electric Blue (#4D7CFF) and Cyan (#22D3EE) accents
- **Video Backgrounds**: Dynamic blue video animations on Hero, FAQ, and Contact sections
- **Smooth Animations**: Motion-powered transitions with respect for `prefers-reduced-motion`
- **Custom Cursor Glow**: Interactive cursor trail effect with spring physics
- **Responsive Design**: Fully responsive across all device sizes

### Color Palette
```css
Primary Background: #07090D
Electric Blue: #4D7CFF
Cyan Accent: #22D3EE
Text Primary: #F5F7FA
Text Secondary: #8B93A3
```

## 🚀 Tech Stack

- **Framework**: React 18.3.1
- **Build Tool**: Vite 6.0.11
- **Styling**: Tailwind CSS 4.0.1
- **Animations**: Framer Motion (motion) 11.15.0
- **Icons**: Lucide React 0.469.0
- **Font**: Space Grotesk (Google Fonts)

## 📦 Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd tcongs-redesign
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Build for production**
```bash
npm run build
```

5. **Preview production build**
```bash
npm run preview
```

## 🏗️ Project Structure

```
tcongs-redesign/
├── public/
│   ├── videos/
│   │   ├── animation.mp4    # Hero section background
│   │   └── blue.mp4         # FAQ & Contact backgrounds
│   ├── ctavideo.mp4         # CTA section background
│   ├── logo.png             # Brand logo
│   ├── *.png                # Process section icons
│   └── favicons/            # All favicon variants
├── src/
│   ├── components/
│   │   ├── AnimatedButton.jsx       # Reusable animated button
│   │   ├── Container.jsx            # Content wrapper
│   │   ├── CursorGlow.jsx          # Custom cursor effect
│   │   ├── CTAVisual.jsx           # CTA section visual
│   │   ├── ProcessVisual.jsx       # Process timeline visual
│   │   ├── SectionHeading.jsx      # Section header component
│   │   ├── SolutionCard.jsx        # Service card component
│   │   └── SolutionsPanel.jsx      # Services mega panel
│   ├── sections/
│   │   ├── Navbar.jsx              # Navigation with mega menu
│   │   ├── Hero.jsx                # Hero section
│   │   ├── Services.jsx            # Services showcase
│   │   ├── Process.jsx             # Development process
│   │   ├── CTA.jsx                 # Call-to-action section
│   │   ├── FAQ.jsx                 # FAQ accordion
│   │   ├── Contact.jsx             # Contact form
│   │   └── Footer.jsx              # Site footer
│   ├── data/
│   │   ├── services.js             # Services content
│   │   ├── process.js              # Process steps
│   │   ├── faq.js                  # FAQ content
│   │   └── contact.js              # Contact info & countries
│   ├── hooks/
│   │   ├── useMediaQuery.js        # Media query hook
│   │   └── useScrollDirection.js   # Scroll direction hook
│   ├── App.jsx                     # Main app component
│   ├── main.jsx                    # App entry point
│   ├── index.css                   # Global styles
│   └── App.css                     # Component styles
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── eslint.config.js
└── package.json
```

## 🎯 Key Features

### 1. Navigation
- Centered navigation links
- Mega menu dropdown for Services with hover states
- Smooth scroll navigation
- Mobile-responsive hamburger menu
- Active section highlighting

### 2. Hero Section
- Full-screen video background (animation.mp4)
- Animated brand logos with hover effects
- Gradient text effects
- Call-to-action buttons

### 3. Services Section
- Six main service categories with eyebrow text
- Interactive mega panel with detailed service information
- Solutions panel with expandable cards
- Smooth transitions and animations

### 4. Process Section
- Six-step development process visualization
- Interactive timeline with icons
- Animated progress indicators
- Process description cards

### 5. CTA Section
- Video background (ctavideo.mp4)
- 3D animated visual element
- Gradient typography
- Action button with scroll navigation

### 6. FAQ Section
- Blue video background animation
- Accordion-style questions
- "Book a Free Call" CTA button
- Smooth expand/collapse animations

### 7. Contact Section
- Blue video background
- Comprehensive form with validation
- Country code selector (190+ countries)
- Math verification captcha
- Contact information display
- Success state animation
- Alternative email contact option

### 8. Footer
- Four-column layout
- Brand statement with social links
- Company navigation
- Specialized services list
- Scale Your Business services
- Mumbai office location
- Copyright information

## 🎨 Design Specifications

### Typography
- **Headings**: Space Grotesk (Bold, 700)
- **Body**: System font stack
- **Font Sizes**: Responsive clamp() values
- **Line Heights**: Optimized for readability

### Spacing
- **Container Max Width**: 1280px
- **Padding**: Responsive (px-6 lg:px-8)
- **Section Spacing**: py-20 md:py-28 lg:py-36

### Animations
- **Duration**: 0.3s - 0.6s
- **Easing**: [0.33, 1, 0.68, 1] (custom cubic-bezier)
- **Stagger**: 0.08s - 0.1s delays
- **Reduced Motion**: Respects user preferences

## 🔧 Configuration

### Tailwind Configuration
```javascript
// Custom colors, fonts, and utilities
// See tailwind.config.js
```

### Vite Configuration
```javascript
// React plugin and build optimizations
// See vite.config.js
```

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px
- **Large Desktop**: > 1280px

## ⚡ Performance

- **Lazy Loading**: Videos and images
- **Code Splitting**: Component-level
- **Optimized Assets**: Compressed videos
- **Production Build**: Minified and optimized

## 🎭 Accessibility

- **Keyboard Navigation**: Full support
- **ARIA Labels**: Proper semantics
- **Focus Indicators**: Visible focus states
- **Color Contrast**: WCAG AA compliant
- **Reduced Motion**: Respects user preferences
- **Alt Text**: All images and icons
- **Form Validation**: Clear error messages

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📋 Available Scripts

```bash
# Development
npm run dev          # Start dev server at http://localhost:5173

# Production
npm run build        # Build for production
npm run preview      # Preview production build

# Linting
npm run lint         # Run ESLint
```

## 🎥 Video Assets

### Required Videos
Place these in the `public` and `public/videos` directories:

1. **animation.mp4** - Hero section background
2. **blue.mp4** - FAQ and Contact backgrounds
3. **ctavideo.mp4** - CTA section background

### Video Specifications
- Format: MP4
- Codec: H.264
- Quality: Optimized for web
- Autoplay: muted, loop, playsInline

## 🖼️ Image Assets

### Process Icons (public/)
- discovery.png
- planning.png
- design.png
- development.png
- testing.png
- launch.png

### Logo
- logo.png (Navbar brand logo)

### Favicon Set
- favicon.ico
- favicon-16x16.png
- favicon-32x32.png
- favicon-96x96.png
- apple-touch-icon.png
- android-chrome-192x192.png
- android-chrome-512x512.png
- Multiple mstile variants for Windows

## 🔍 SEO & Meta Tags

The project includes comprehensive meta tags:
- Open Graph tags for social sharing
- Twitter Card tags
- Theme color meta tags
- Web app manifest
- Browser configuration

## 📞 Contact Information

**Email**: info@tcongsinfotech.com  
**Location**: Mumbai, Maharashtra, India  
**Social**: LinkedIn, Instagram

## 👨‍💻 Development Notes

### Form Validation
- Client-side validation with real-time feedback
- Phone number: 10-digit validation
- Email: RFC-compliant validation
- Name: Letters and spaces only, min 2 characters
- Math verification: Dynamic question generation

### Country Codes
The contact form includes 190+ country codes with flags, stored in `src/data/contact.js`.

### Custom Hooks
- **useMediaQuery**: Responsive breakpoint detection
- **useScrollDirection**: Scroll direction tracking for navbar

### Animation Strategy
- Uses Framer Motion for complex animations
- Spring physics for natural movements
- Staggered children for sequential reveals
- Viewport-triggered animations

## 🐛 Known Issues

None currently. Please report any issues you encounter.

## 📈 Future Enhancements

- [ ] Dark/Light theme toggle
- [ ] Multi-language support
- [ ] Blog section
- [ ] Case studies/Portfolio
- [ ] Live chat integration
- [ ] Performance analytics

## 📄 License

Proprietary - Tcongs Infotech

## 🤝 Contributing

This is a proprietary project for Tcongs Infotech. For any questions or contributions, please contact the development team.

---

**Built with ❤️ by the Tcongs Infotech Team**
