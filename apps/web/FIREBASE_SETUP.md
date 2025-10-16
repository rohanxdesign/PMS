# Firebase Backend Setup for BD Associates

This document explains how to set up Firebase as your backend for the BD (Business Development) application.

## Prerequisites

1. A Google account
2. Firebase CLI installed (optional but recommended)

## Setup Steps

### 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or "Add project"
3. Enter your project name (e.g., "bd-leads-management")
4. Choose whether to enable Google Analytics (optional)
5. Click "Create project"

### 2. Enable Firebase Services

#### Enable Firestore Database
1. In your Firebase project, go to "Firestore Database"
2. Click "Create database"
3. Choose "Start in test mode" (we'll add security rules later)
4. Select a location for your database (choose closest to your users)
5. Click "Done"

#### Enable Authentication
1. Go to "Authentication" in your Firebase project
2. Click "Get started"
3. Go to "Sign-in method" tab
4. Enable "Email/Password" provider
5. Click "Save"

#### Enable Storage (Optional)
1. Go to "Storage" in your Firebase project
2. Click "Get started"
3. Choose "Start in test mode"
4. Select a location for your storage
5. Click "Done"

### 3. Get Firebase Configuration

1. In your Firebase project, click the gear icon (⚙️) next to "Project Overview"
2. Select "Project settings"
3. Scroll down to "Your apps" section
4. Click the web icon (</>) to add a web app
5. Enter an app nickname (e.g., "BD Web App")
6. Click "Register app"
7. Copy the Firebase configuration object

### 4. Set Environment Variables

Create a `.env.local` file in your `apps/web` directory with your Firebase credentials:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

Replace the placeholder values with your actual Firebase configuration values.

### 5. Set Up Firestore Security Rules

1. Go to "Firestore Database" → "Rules" tab
2. Replace the default rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own data
    match /leads/{leadId} {
      allow read, write: if request.auth != null && 
        (resource.data.owner_id == request.auth.uid || 
         request.auth.token.role == 'admin');
    }
    
    match /deals/{dealId} {
      allow read, write: if request.auth != null && 
        (resource.data.owner == request.auth.uid || 
         request.auth.token.role == 'admin');
    }
    
    match /activities/{activityId} {
      allow read, write: if request.auth != null && 
        (resource.data.user_id == request.auth.uid || 
         request.auth.token.role == 'admin');
    }
    
    match /users/{userId} {
      allow read, write: if request.auth != null && 
        (request.auth.uid == userId || 
         request.auth.token.role == 'admin');
    }
  }
}
```

3. Click "Publish"

### 6. Create Firestore Collections

You can create the collections manually or use the sample data script. The collections you'll need are:

- `leads` - Lead information and stage tracking
- `deals` - Deal tracking with amounts and stages
- `users` - User management and roles
- `activities` - Activity logging and tracking
- `tasks` - Task management and reminders
- `comments` - Notes and updates
- `attachments` - File management
- `performance_metrics` - Analytics and reporting
- `notifications` - In-app notifications
- `email_logs` - Email tracking

### 7. Add Sample Data (Optional)

You can add sample data to test your application:

#### Sample Lead Document
```json
{
  "name": "Sadhvi Shakti Puri Everest Tea trader",
  "email": "sadhvi@everesttea.com",
  "company": "Everest Tea Company",
  "country": "India",
  "stage": "New",
  "owner": "John Doe",
  "totalAmount": 150000,
  "totalDeals": 3,
  "remarks": "Interested in bulk order",
  "source": "Website",
  "priority": "High",
  "temperature": "Warm",
  "owner_id": "user_id_here",
  "assigned_date": "2024-01-15T10:00:00Z",
  "created_at": "2024-01-15T10:00:00Z",
  "updated_at": "2024-01-15T10:00:00Z"
}
```

#### Sample Deal Document
```json
{
  "lead_id": "lead_id_here",
  "title": "Everest Tea Bulk Order",
  "amount": 150000,
  "currency": "INR",
  "stage": "Meeting booked",
  "owner": "John Doe",
  "expected_close_date": "2024-02-15T00:00:00Z",
  "probability": 75,
  "next_step": "Send proposal",
  "decision_maker": "CTO",
  "deal_source": "Website",
  "created_at": "2024-01-15T10:00:00Z",
  "updated_at": "2024-01-15T10:00:00Z"
}
```

### 8. Test the Application

1. Start your Next.js development server: `npm run dev`
2. Navigate to `/sales/leads`
3. The header should now display dynamic counts from Firebase:
   - "You have X new leads assigned and Y KTs pending today"

## Firebase Features Used

### Firestore Database
- **NoSQL document database** - Flexible schema for leads and deals
- **Real-time updates** - Live data synchronization
- **Offline support** - Works without internet connection
- **Automatic scaling** - Handles growth automatically

### Authentication
- **Email/password authentication** - Secure user login
- **Custom claims** - Role-based access control
- **Session management** - Automatic token refresh

### Storage (Optional)
- **File uploads** - For attachments and documents
- **CDN integration** - Fast file delivery
- **Security rules** - Access control for files

### Real-time Features
- **Live updates** - Changes appear instantly
- **Presence** - See who's online
- **Offline sync** - Data syncs when reconnected

## Security Considerations

1. **Firestore Security Rules** - Control data access at database level
2. **Authentication** - Verify user identity
3. **Custom Claims** - Implement role-based permissions
4. **Input Validation** - Validate data on client and server
5. **Rate Limiting** - Prevent abuse (implement in Cloud Functions)

## Cost Considerations

### Firebase Free Tier Includes:
- **Firestore**: 1GB storage, 50K reads, 20K writes per day
- **Authentication**: Unlimited users
- **Storage**: 5GB storage, 1GB/day downloads
- **Hosting**: 10GB storage, 10GB/month transfer

### Paid Plans:
- **Blaze Plan**: Pay-as-you-go, scales automatically
- **Spark Plan**: Free tier with usage limits

## Troubleshooting

### Common Issues

1. **"Firebase App not initialized"**
   - Check your environment variables
   - Ensure Firebase config is correct

2. **"Permission denied"**
   - Check Firestore security rules
   - Verify user authentication

3. **"Collection not found"**
   - Create the collection in Firestore console
   - Check collection name spelling

4. **Real-time updates not working**
   - Check network connection
   - Verify security rules allow reads

### Debug Steps

1. Check browser console for errors
2. Verify Firebase project is active
3. Test API calls in Firebase console
4. Check network tab for failed requests

## Next Steps

1. **Set up user authentication** - Implement login/signup
2. **Add role-based access** - Implement BD, Manager, Admin roles
3. **Set up file uploads** - Enable document attachments
4. **Implement email notifications** - Use Cloud Functions
5. **Add analytics** - Track user behavior and performance

## Support

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Documentation](https://firebase.google.com/docs/firestore)
- [Firebase Console](https://console.firebase.google.com/)
- [Firebase Support](https://firebase.google.com/support)
