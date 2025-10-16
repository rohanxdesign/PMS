#!/usr/bin/env node

/**
 * Firebase Setup Script
 * This script helps you set up Firebase for your BD application
 */

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🔥 Firebase Setup for BD Application');
console.log('=====================================\n');

console.log('This script will help you set up Firebase for your BD application.\n');

console.log('📋 Prerequisites:');
console.log('1. A Google account');
console.log('2. Firebase project created at https://console.firebase.google.com/');
console.log('3. Firestore Database enabled');
console.log('4. Authentication enabled (Email/Password)\n');

rl.question('Do you have a Firebase project ready? (y/n): ', (answer) => {
  if (answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes') {
    console.log('\n✅ Great! Let\'s get your Firebase configuration.\n');
    
    console.log('📝 To get your Firebase configuration:');
    console.log('1. Go to your Firebase project console');
    console.log('2. Click the gear icon (⚙️) next to "Project Overview"');
    console.log('3. Select "Project settings"');
    console.log('4. Scroll down to "Your apps" section');
    console.log('5. Click the web icon (</>) to add a web app');
    console.log('6. Enter an app nickname (e.g., "BD Web App")');
    console.log('7. Click "Register app"');
    console.log('8. Copy the Firebase configuration object\n');
    
    rl.question('Do you have your Firebase config ready? (y/n): ', (configAnswer) => {
      if (configAnswer.toLowerCase() === 'y' || configAnswer.toLowerCase() === 'yes') {
        console.log('\n🔧 Now let\'s set up your environment variables.\n');
        
        console.log('Create a .env.local file in your apps/web directory with:');
        console.log('```');
        console.log('NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key');
        console.log('NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com');
        console.log('NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id');
        console.log('NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com');
        console.log('NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id');
        console.log('NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id');
        console.log('```\n');
        
        console.log('🔒 Next, set up Firestore Security Rules:');
        console.log('1. Go to "Firestore Database" → "Rules" tab');
        console.log('2. Replace the default rules with the rules from FIREBASE_SETUP.md');
        console.log('3. Click "Publish"\n');
        
        console.log('📊 Create Firestore Collections:');
        console.log('- leads');
        console.log('- deals');
        console.log('- users');
        console.log('- activities');
        console.log('- tasks');
        console.log('- comments');
        console.log('- attachments');
        console.log('- performance_metrics');
        console.log('- notifications');
        console.log('- email_logs\n');
        
        console.log('🎉 Setup Complete!');
        console.log('Run "npm run dev" to start your application.');
        console.log('Visit http://localhost:3000/sales/leads to see your BD application.\n');
        
        console.log('📚 For detailed instructions, see FIREBASE_SETUP.md');
        
      } else {
        console.log('\n📖 Please follow the steps above to get your Firebase configuration.');
        console.log('Then run this script again.\n');
      }
      
      rl.close();
    });
    
  } else {
    console.log('\n🚀 Let\'s create your Firebase project first!\n');
    
    console.log('📋 Steps to create Firebase project:');
    console.log('1. Go to https://console.firebase.google.com/');
    console.log('2. Click "Create a project" or "Add project"');
    console.log('3. Enter your project name (e.g., "bd-leads-management")');
    console.log('4. Choose whether to enable Google Analytics (optional)');
    console.log('5. Click "Create project"\n');
    
    console.log('🔧 Enable required services:');
    console.log('1. Firestore Database - Click "Create database" → "Start in test mode"');
    console.log('2. Authentication - Click "Get started" → Enable "Email/Password"');
    console.log('3. Storage (optional) - Click "Get started" → "Start in test mode"\n');
    
    console.log('✅ Once you\'ve created your project and enabled the services,');
    console.log('run this script again to continue with the setup.\n');
    
    rl.close();
  }
});

rl.on('close', () => {
  console.log('\n👋 Happy coding!');
  process.exit(0);
});
