import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';

export const logAdminAction = async (actionType: string, description: string, adminEmail: string) => {
  try {
    await addDoc(collection(db, 'activity_logs'), {
      actionType,
      description,
      adminEmail,
      timestamp: serverTimestamp()
    });
  } catch (error) {
    console.error("Failed to log action", error);
  }
};
