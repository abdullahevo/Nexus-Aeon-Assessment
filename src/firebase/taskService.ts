import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  Timestamp
} from 'firebase/firestore';
import { db } from './config';
import { Task, TaskFormData } from '@/types/task';

export class TaskService {
  private collectionName = 'tasks';

  async getTasks(): Promise<Task[]> {
    const tasksQuery = query(
      collection(db, this.collectionName),
      orderBy('createdAt', 'desc')
    );

    const querySnapshot = await getDocs(tasksQuery);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      dueDate: (doc.data().dueDate as Timestamp).toDate(),
      createdAt: (doc.data().createdAt as Timestamp).toDate()
    })) as Task[];
  }

  async addTask(taskData: TaskFormData): Promise<void> {
    await addDoc(collection(db, this.collectionName), {
      ...taskData,
      completed: false,
      createdAt: Timestamp.now(),
      dueDate: Timestamp.fromDate(new Date(taskData.dueDate))
    });
  }

  async updateTask(taskId: string, updates: Partial<Task>): Promise<void> {
    const taskRef = doc(db, this.collectionName, taskId);

    // Convert Date objects to Timestamps for Firestore
    const firestoreUpdates = {
      ...updates,
      dueDate: updates.dueDate ? Timestamp.fromDate(updates.dueDate) : undefined
    };
    console.log("🚀 ~ TaskService ~ updateTask ~ firestoreUpdates:", firestoreUpdates)

    await updateDoc(taskRef, firestoreUpdates);
  }

  async deleteTask(taskId: string): Promise<void> {
    const taskRef = doc(db, this.collectionName, taskId);
    await deleteDoc(taskRef);
  }
}

export const taskService = new TaskService();
