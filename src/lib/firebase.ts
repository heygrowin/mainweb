import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

// Firebase Configuration (Direct Web App Credentials)
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore(app);

// Initialize Analytics Safely on the Client
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      getAnalytics(app);
      console.log("Firebase Analytics initialized.");
    }
  });
}

export interface BlueprintSubmission {
  businessName?: string;
  website?: string;
  industry?: string;
  bottleneck: string;
  currentTools?: string;
  contactName: string;
  email: string;
  phone: string;
}

export async function submitBlueprintRequest(data: BlueprintSubmission) {
  if (db) {
    try {
      const docRef = await addDoc(collection(db, "blueprint_requests"), {
        ...data,
        createdAt: serverTimestamp(),
      });
      console.log("Blueprint request written to Firestore with ID: ", docRef.id);
      return { success: true, id: docRef.id, source: "firebase" };
    } catch (e) {
      console.error("Error writing document to Firestore: ", e);
      // Fallback to local storage on Firestore database write failure
    }
  }

  // Fallback to Local Storage for offline capability
  try {
    const localRequests = JSON.parse(localStorage.getItem("hey_grow_blueprints") || "[]");
    const newRequest = {
      ...data,
      id: `local_${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    localRequests.push(newRequest);
    localStorage.setItem("hey_grow_blueprints", JSON.stringify(localRequests));
    console.log("Blueprint request saved to LocalStorage (Sandbox mode):", newRequest);
    return { success: true, id: newRequest.id, source: "local" };
  } catch (err) {
    console.error("Failed to save to local storage:", err);
    return { success: false, error: "No storage medium available" };
  }
}
