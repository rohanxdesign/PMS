#!/usr/bin/env node

/**
 * Firebase Project Creation Guide
 * This script provides step-by-step instructions for creating a Firebase project
 */

console.log('🔥 Firebase Project Setup Guide');
console.log('================================\n');

console.log('📋 Step 1: Create Firebase Project');
console.log('1. Go to: https://console.firebase.google.com/');
console.log('2. Click "Create a project" or "Add project"');
console.log('3. Project name: "PMS-Backend" (or your preferred name)');
console.log('4. Enable Google Analytics: Optional');
console.log('5. Click "Create project"\n');

console.log('🔧 Step 2: Enable Required Services');
console.log('1. Firestore Database:');
console.log('   - Click "Create database"');
console.log('   - Choose "Start in test mode"');
console.log('   - Select location (closest to you)');
console.log('   - Click "Done"\n');

console.log('2. Authentication:');
console.log('   - Click "Get started"');
console.log('   - Go to "Sign-in method" tab');
console.log('   - Enable "Email/Password"');
console.log('   - Click "Save"\n');

console.log('3. Storage (Optional):');
console.log('   - Click "Get started"');
console.log('   - Choose "Start in test mode"');
console.log('   - Select location');
console.log('   - Click "Done"\n');

console.log('📱 Step 3: Add Web App');
console.log('1. Click the gear icon (⚙️) next to "Project Overview"');
console.log('2. Select "Project settings"');
console.log('3. Scroll down to "Your apps" section');
console.log('4. Click the web icon (</>) to add a web app');
console.log('5. App nickname: "PMS Web App"');
console.log('6. Click "Register app"');
console.log('7. Copy the Firebase configuration object\n');

console.log('🔑 Step 4: Create Environment File');
console.log('Create a file called .env.local in the apps/web directory with:');
console.log('');
console.log('NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here');
console.log('NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com');
console.log('NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id_here');
console.log('NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com');
console.log('NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id_here');
console.log('NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id_here\n');

console.log('🛡️ Step 5: Set Up Security Rules');
console.log('1. Go to "Firestore Database" → "Rules" tab');
console.log('2. Replace the default rules with:');
console.log('');
console.log('rules_version = \'2\';');
console.log('service cloud.firestore {');
console.log('  match /databases/{database}/documents {');
console.log('    match /{document=**} {');
console.log('      allow read, write: if true;');
console.log('    }');
console.log('  }');
console.log('}');
console.log('');
console.log('3. Click "Publish"\n');

console.log('📊 Step 6: Add Sample Data (Optional)');
console.log('1. Go to "Firestore Database" → "Data" tab');
console.log('2. Click "Start collection"');
console.log('3. Collection ID: "leads"');
console.log('4. Add a document with these fields:');
console.log('   - name: "Sadhvi Shakti Puri Everest Tea trader"');
console.log('   - company: "Everest Tea Company"');
console.log('   - country: "India"');
console.log('   - stage: "New"');
console.log('   - owner: "John Doe"');
console.log('   - totalAmount: 150000');
console.log('   - totalDeals: 3');
console.log('   - assigned_date: (current timestamp)');
console.log('   - created_at: (current timestamp)');
console.log('   - updated_at: (current timestamp)\n');

console.log('🚀 Step 7: Test the Application');
console.log('1. Run: npm run dev');
console.log('2. Visit: http://localhost:3000/sales/leads');
console.log('3. The header should show: "You have X new leads assigned and Y KTs pending today"\n');

console.log('✅ Setup Complete!');
console.log('Your Firebase backend is now ready for the PMS application.\n');

console.log('📚 For detailed instructions, see: FIREBASE_SETUP.md');
console.log('🐛 If you encounter issues, check the browser console for errors.');
