import {
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  setDoc,
  orderBy,
  query,
  deleteDoc,
} from 'firebase/firestore';
import { db } from '../firebase';

export const createPost = (postData) =>
  addDoc(collection(db, 'posts'), postData);
export const getPosts = () =>
  getDocs(query(collection(db, 'posts'), orderBy('createdAt', 'desc')));
export const getPostById = (id) => getDoc(doc(db, 'posts', id));
export const updateProfile = (userId, data) =>
  setDoc(doc(db, 'users', userId), data, { merge: true });
export const getUserProfile = (userId) => getDoc(doc(db, 'users', userId));
export const deletePost = (id) => deleteDoc(doc(db, 'posts', id));
