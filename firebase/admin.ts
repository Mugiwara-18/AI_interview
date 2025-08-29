import { initializeApp, getApps, cert } from "firebase-admin/app";
const db = getFirestore();
db.settings({ ignoreUndefinedProperties: true });
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

// Initialize Firebase Admin SDK
function initFirebaseAdmin() {
  const apps = getApps();

  if (!apps.length) {
    initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        // Replace newlines in the private key
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      }),
    });
  }

  if (!process.env.FIREBASE_PROJECT_ID || !process.env.FIREBASE_CLIENT_EMAIL || !process.env.FIREBASE_PRIVATE_KEY) {
  throw new Error("Missing Firebase Admin environment variables");
}

  return {
    auth: getAuth(),
    db: getFirestore(),
  };
}

export const firebaseAdminApp = initFirebaseAdmin();
export const { auth, db } = firebaseAdminApp;
