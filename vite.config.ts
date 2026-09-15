import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  const firebaseConfigPath = path.resolve(__dirname, 'firebase-applet-config.json');
  const envVars: Record<string, string> = {};
  
  if (fs.existsSync(firebaseConfigPath)) {
    try {
      const config = JSON.parse(fs.readFileSync(firebaseConfigPath, 'utf-8'));
      if (config.apiKey) envVars['VITE_FIREBASE_API_KEY'] = config.apiKey;
      if (config.authDomain) envVars['VITE_FIREBASE_AUTH_DOMAIN'] = config.authDomain;
      if (config.projectId) envVars['VITE_FIREBASE_PROJECT_ID'] = config.projectId;
      if (config.storageBucket) envVars['VITE_FIREBASE_STORAGE_BUCKET'] = config.storageBucket;
      if (config.messagingSenderId) envVars['VITE_FIREBASE_MESSAGING_SENDER_ID'] = config.messagingSenderId;
      if (config.appId) envVars['VITE_FIREBASE_APP_ID'] = config.appId;
      if (config.firestoreDatabaseId) envVars['VITE_FIREBASE_DATABASE_ID'] = config.firestoreDatabaseId;
    } catch (e) {
      console.warn("Could not parse firebase-applet-config.json");
    }
  }

  Object.keys(envVars).forEach(key => {
    if (!process.env[key]) {
      process.env[key] = envVars[key];
    }
  });

  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
