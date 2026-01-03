# PortfolioOS

A cutting-edge, operating system-inspired portfolio showcasing the skills and projects of Rajath Hegde, an MCA student and aspiring full-stack web developer from Karnataka, India.

## Overview

PortfolioOS transforms the traditional developer portfolio into an interactive operating system experience. Visitors can explore projects, skills, and personal information through familiar OS interfaces including windows, desktop icons, a dock, and multiple applications.

## Key Features

### Desktop Environment
- Fully interactive desktop with draggable icons
- Context menu for desktop customization
- Wallpaper selection system with multiple options
- Responsive design for all device sizes
- Reset icon positions functionality
- Glassmorphism UI with transparent, frosted glass effects
- Dark/light mode support with system preference detection

### Window Management System
- Draggable and resizable application windows
- Minimize, maximize, and close functionality
- Window focus management with z-index handling
- Smooth animations using Framer Motion
- Window snapping to screen edges
- Keyboard shortcuts for common actions
- Error boundaries to prevent crashes
- Enhanced glassy, transparent window design

### Applications Suite

1. **About Me** - Personal story and background
2. **Projects** - Detailed showcase of development projects
3. **Skills** - Interactive visualization of technical skills
4. **Terminal** - Command-line interface with custom commands
5. **Settings** - System customization options
6. **File Explorer** - Browse through projects and documents
7. **Web Browser** - Embedded browser for external sites
8. **Media Player** - Showcase project demos and videos
9. **Calculator** - Functional calculator application
10. **Weather** - Location-based weather information
11. **Notes** - Personal note-taking application
12. **System Info** - Detailed system statistics
13. **Gallery** - Visual showcase of projects and achievements
14. **Contact** - Contact form and social links

### UI Components
- Top bar with system controls and minimized window dock
- Start menu with application search
- Notification center
- System search functionality
- Boot screen with login interface
- Loading states for better UX
- Enhanced accessibility features
- Glassmorphism design throughout the interface

## Technical Implementation

### Core Technologies
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI primitives
- **State Management**: React Context API
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Email Service**: Resend (with fallback simulation)
- **Theme Management**: next-themes

### Key Features Implemented
- Local storage for persisting user preferences
- Responsive design for mobile, tablet, and desktop
- Keyboard navigation support
- Touch gesture support for mobile devices
- Custom theming system with glassmorphism effects
- Performance optimized with code splitting
- Server actions for contact form submissions
- Error boundaries for crash prevention
- Window snapping functionality
- Enhanced accessibility with ARIA labels
- Dark/light mode with system preference detection

## Applications in Detail

### Terminal Application
A fully functional terminal emulator with commands like:
- `help` - Show available commands
- `about` - Display personal information
- `projects` - List development projects
- `skills` - Show technical skills
- `contact` - Display contact information
- `neofetch` - Display system information with ASCII art
- Arrow key navigation for command history

### File Explorer
Browse through a structured file system representing projects and documents:
- Desktop shortcuts
- Documents folder with resume and certificates
- Projects folder with detailed subfolders
- Applications folder

### Media Player
Showcase project demos and videos:
- Playlist management
- Playback controls
- Volume adjustment
- Visual album art display

### Settings Application
Customize the PortfolioOS experience:
- Theme selection (light/dark/system)
- Wallpaper selection with multiple options
- Sound preferences
- Notification settings
- Privacy controls

## Responsive Design

PortfolioOS is fully responsive and adapts to different screen sizes:
- **Desktop**: Full OS experience with multiple windows and top bar controls
- **Tablet**: Optimized window sizes and touch targets
- **Mobile**: Single window mode with touch-friendly controls and bottom navigation for minimized windows

## Window Management

Windows can be managed through:
- **Top bar dock**: Shows minimized windows on desktop
- **Mobile bottom navigation**: Shows minimized windows on mobile devices
- **Direct window controls**: Minimize, maximize, and close buttons within each window
- **Window snapping**: Windows automatically align to screen edges when dragged near them
- **Keyboard shortcuts**:
  - Ctrl+Alt+T: Open Terminal
  - Ctrl+Alt+C: Open Contact form
  - ESC: Close focused window

## Glassmorphism Design

PortfolioOS features a modern glassmorphism design with:
- Transparent UI elements with frosted glass effects
- Dynamic blur effects using backdrop-filter
- Subtle borders and shadows for depth
- Adaptive transparency for light and dark modes
- Enhanced visual appeal with layered transparency effects

## Theme Support

PortfolioOS supports multiple themes:
- **Dark Mode**: Default theme with deep background colors
- **Light Mode**: Clean theme with light background colors
- **System Preference**: Automatically adapts to system theme settings
- Theme settings are persisted in localStorage

## Wallpaper Selection

Users can customize their desktop experience with multiple wallpaper options:
- Default abstract pattern
- Space-themed background
- Mountain landscape
- City skyline
- Ocean view
- Abstract gradient
- Wallpaper settings are persisted in localStorage

## Local Storage Features

User preferences and settings are persisted using localStorage:
- Window positions and sizes
- Desktop icon positions
- Theme and wallpaper preferences
- System settings

## Contact Form

The contact form is fully functional with:
- Client-side validation using Zod
- Server action for form submission with Resend email service
- Toast notifications for user feedback
- Proper error handling
- Fallback simulation mode when API keys are not configured

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Create a `.env.local` file with your Resend API key:
   ```
   RESEND_API_KEY=your_resend_api_key_here
   CONTACT_EMAIL=your_contact_email_here
   ```
4. Run development server: `npm run dev`
5. Build for production: `npm run build`

## Local secrets and API keys

Do NOT commit API keys or secrets into the repository. Local editor settings (for example VS Code workspace settings) can contain sensitive values. This repository ignores `.vscode/settings.json` — keep your local keys there or, better, use environment variables or a secrets manager.

Recommended approaches:
- Use environment variables (preferred): create a local `.env.local` file and add it to `.gitignore`.
	Example:
	```env
	RESEND_API_KEY=your_resend_api_key_here
	CONTACT_EMAIL=contact@rajathhegde.com
	```

- Or put local editor settings in `.vscode/settings.json` (this repo includes `.vscode/settings.example.json` as a template). Never commit your local `.vscode/settings.json`.

If you accidentally committed a key, rotate/revoke it immediately and check service access logs for unauthorized usage.

## Login Information

The PortfolioOS features a boot screen with a simulated login:
- No specific password is required
- Enter any value or click "Guest" to access the system
- This is purely for visual effect and demonstration purposes

## Recent Improvements

The following improvements have been recently implemented:

### Bug Fixes
- Fixed contact form to actually send emails using Resend API instead of just simulation
- Fixed window positioning issues when restoring from localStorage
- Fixed terminal command history navigation with arrow keys
- Fixed desktop icon reset functionality
- Improved mobile touch dragging behavior

### New Features
- Window snapping to screen edges
- Keyboard shortcuts for common actions
- Loading states for better user experience
- Error boundaries to prevent app crashes
- Enhanced accessibility features with proper ARIA labels
- Glassmorphism UI with transparent, frosted glass effects
- Multiple wallpaper options for desktop customization
- Dark/light mode support with system preference detection

### Performance & UX Improvements
- Improved window focus management
- Better responsive design handling
- Enhanced error handling and user feedback
- Optimized component structure for better maintainability

## Future Enhancements

- Integration with actual GitHub API for live project data
- Additional applications (calendar, email client)
- Multi-language support
- Enhanced accessibility features
- Progressive Web App capabilities
- Advanced theming options

## Author

Rajath Hegde - Full-Stack Web Developer & MCA Student

## License

This project is licensed under the MIT License - see the LICENSE file for details.