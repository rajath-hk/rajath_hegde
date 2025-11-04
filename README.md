# PortfolioOS

A cutting-edge, operating system-inspired portfolio showcasing the skills and projects of Rajath Hegde, an MCA student and aspiring full-stack web developer from Karnataka, India.

## Overview

PortfolioOS transforms the traditional developer portfolio into an interactive operating system experience. Visitors can explore projects, skills, and personal information through familiar OS interfaces including windows, desktop icons, a dock, and multiple applications.

## Key Features

### Desktop Environment
- Fully interactive desktop with draggable icons
- Context menu for desktop customization
- Wallpaper selection system
- Responsive design for all device sizes

### Window Management System
- Draggable and resizable application windows
- Minimize, maximize, and close functionality
- Window focus management with z-index handling
- Smooth animations using Framer Motion

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

## Technical Implementation

### Core Technologies
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI primitives
- **State Management**: React Context API
- **Animations**: Framer Motion
- **Icons**: Lucide React

### Key Features Implemented
- Local storage for persisting user preferences
- Responsive design for mobile, tablet, and desktop
- Keyboard navigation support
- Touch gesture support for mobile devices
- Custom theming system
- Performance optimized with code splitting
- Server actions for contact form submissions

## Applications in Detail

### Terminal Application
A fully functional terminal emulator with commands like:
- `help` - Show available commands
- `about` - Display personal information
- `projects` - List development projects
- `skills` - Show technical skills
- `contact` - Display contact information
- `neofetch` - Display system information with ASCII art

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
- Wallpaper selection
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

## Local Storage Features

User preferences and settings are persisted using localStorage:
- Window positions and sizes
- Desktop icon positions
- Theme and wallpaper preferences
- System settings

## Contact Form

The contact form is fully functional with:
- Client-side validation using Zod
- Server action for form submission
- Toast notifications for user feedback
- Proper error handling

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Run development server: `npm run dev`
4. Build for production: `npm run build`

## Login Information

The PortfolioOS features a boot screen with a simulated login:
- No specific password is required
- Enter any value or click "Guest" to access the system
- This is purely for visual effect and demonstration purposes

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