# BD Leads Management System

A comprehensive Business Development leads management system built with Next.js, Firebase, and modern UI components. This application provides a complete solution for managing leads, deals, and sales processes with real-time updates and dynamic data visualization.

## 🚀 Features

### Core Functionality
- **Lead Management**: Create, update, and track leads through the sales pipeline
- **Deal Tracking**: Monitor deal progress with amounts, stages, and timelines
- **Kanban Board**: Visual drag-and-drop interface for lead management
- **Table View**: Detailed tabular view with filtering and sorting
- **Real-time Updates**: Live data synchronization using Firebase
- **Dynamic Counts**: Real-time display of new leads and pending KTs

### UI/UX Features
- **Responsive Design**: Works seamlessly on desktop and mobile
- **Modern UI**: Clean, professional interface with Tailwind CSS
- **Interactive Components**: Drag-and-drop, hover effects, and smooth animations
- **Figma-compliant Design**: Pixel-perfect implementation of design specifications
- **Accessibility**: WCAG compliant components and interactions

### Technical Features
- **Firebase Backend**: NoSQL database with real-time listeners
- **TypeScript**: Full type safety throughout the application
- **Component Library**: Reusable UI components with Storybook
- **State Management**: React Context for global state
- **Form Validation**: Zod schema validation
- **Drag & Drop**: Advanced kanban interactions with @dnd-kit

## 🏗️ Architecture

```
project0/
├── apps/
│   ├── web/                    # Next.js web application
│   │   ├── app/               # App router pages and components
│   │   │   ├── components/    # Reusable UI components
│   │   │   ├── context/       # React Context providers
│   │   │   ├── lib/           # Utilities and API functions
│   │   │   └── sales/         # Sales-specific pages
│   │   ├── scripts/           # Setup and utility scripts
│   │   └── stories/           # Storybook component stories
│   └── worker/                # Background worker services
├── edge/                      # Edge functions
└── packages/                  # Shared packages and types
```

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **Backend**: Firebase (Firestore, Authentication, Storage)
- **State Management**: React Context, Custom Hooks
- **UI Components**: Custom components, Radix UI primitives
- **Drag & Drop**: @dnd-kit
- **Validation**: Zod
- **Development**: Storybook, ESLint, Vitest

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Firebase account
- Git

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd project0
```

### 2. Install Dependencies

```bash
cd apps/web
npm install
```

### 3. Set Up Firebase

1. **Create Firebase Project**:
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project
   - Enable Firestore Database and Authentication

2. **Configure Environment Variables**:
   ```bash
   # Create .env.local file in apps/web/
   cp .env.local.template .env.local
   ```
   
   Fill in your Firebase configuration:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```

3. **Set Up Firestore**:
   - Create collections: `leads`, `deals`, `users`, `activities`
   - Configure security rules (see FIREBASE_SETUP.md)
   - Add sample data (optional)

### 4. Run the Application

```bash
npm run dev
```

Visit `http://localhost:3000/sales/leads` to see the application.

## 📚 Detailed Setup

For comprehensive setup instructions, see:
- [FIREBASE_SETUP.md](apps/web/FIREBASE_SETUP.md) - Complete Firebase configuration guide
- [README_DEV.md](README_DEV.md) - Development environment setup

## 🎯 Key Pages

- **Sales Leads**: `/sales/leads` - Main leads management interface
- **Kanban Board**: `/design/kanban` - Visual kanban board
- **Marketing Board**: `/marketing/board` - Marketing-specific kanban
- **Tech Kanban**: `/tech/kanban` - Technical team kanban

## 🔧 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run storybook    # Start Storybook
npm run setup-firebase # Run Firebase setup guide
```

### Component Development

The project uses Storybook for component development:

```bash
npm run storybook
```

Visit `http://localhost:6006` to view and develop components.

### Project Structure

- **Components**: Located in `app/components/`
- **Pages**: App router pages in `app/`
- **API**: Firebase integration in `app/lib/api/`
- **Hooks**: Custom hooks in `app/lib/hooks/`
- **Context**: Global state in `app/context/`

## 🎨 Design System

The application follows a comprehensive design system:

- **Colors**: Defined in `app/lib/colors.ts`
- **Components**: Reusable UI components with variants
- **Typography**: Consistent text styles and hierarchy
- **Spacing**: Standardized spacing scale
- **Icons**: Lucide React icon library

## 🔐 Security

- **Firebase Security Rules**: Database-level access control
- **Authentication**: Email/password with role-based access
- **Input Validation**: Zod schema validation
- **Environment Variables**: Sensitive data in .env.local

## 📊 Data Models

### Lead
```typescript
interface Lead {
  id: string;
  name: string;
  company?: string;
  email: string;
  country: "India" | "Nepal";
  stage: string;
  owner: string;
  totalAmount: number;
  totalDeals: number;
  remarks?: string;
  // ... additional fields
}
```

### Deal
```typescript
interface Deal {
  id: string;
  lead_id: string;
  title: string;
  amount: number;
  currency: string;
  stage: string;
  owner: string;
  // ... additional fields
}
```

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms

The application can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: Check the `/docs` folder for detailed guides
- **Issues**: Open an issue on GitHub for bugs or feature requests
- **Firebase**: [Firebase Documentation](https://firebase.google.com/docs)
- **Next.js**: [Next.js Documentation](https://nextjs.org/docs)

## 🎉 Acknowledgments

- Firebase for the robust backend infrastructure
- Next.js team for the excellent React framework
- Tailwind CSS for the utility-first CSS framework
- The open-source community for the amazing tools and libraries

---

**Built with ❤️ for Business Development teams**
