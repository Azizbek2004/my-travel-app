import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  arrayUnion,
  arrayRemove,
  query,
  orderBy,
  onSnapshot,
  where,
} from 'firebase/firestore';
import { db } from '../firebase';

export const createPost = (postData) =>
  addDoc(collection(db, 'posts'), { ...postData, likes: [], createdAt: new Date().toISOString(), featured: false, flagged: false });

export const getPostsRealTime = (callback) =>
  onSnapshot(query(collection(db, 'posts'), orderBy('createdAt', 'desc')), (snapshot) =>
    callback(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
  );

export const getPostsByPopularity = (callback) =>
  onSnapshot(query(collection(db, 'posts'), orderBy('likes', 'desc')), (snapshot) =>
    callback(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
  );

export const likePost = (postId, userId) =>
  updateDoc(doc(db, 'posts', postId), { likes: arrayUnion(userId) });

export const unlikePost = (postId, userId) =>
  updateDoc(doc(db, 'posts', postId), { likes: arrayRemove(userId) });

export const addComment = (postId, commentData) =>
  addDoc(collection(db, 'posts', postId, 'comments'), { ...commentData, createdAt: new Date().toISOString() });

export const getComments = (postId, callback) =>
  onSnapshot(query(collection(db, 'posts', postId, 'comments'), orderBy('createdAt')), (snapshot) =>
    callback(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
  );

export const sendMessage = (messageData) =>
  addDoc(collection(db, 'messages'), { ...messageData, createdAt: new Date().toISOString() });

export const getMessages = (userId, callback) =>
  onSnapshot(query(collection(db, 'messages'), where('to', '==', userId), orderBy('createdAt', 'desc')), (snapshot) =>
    callback(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
  );

export const deletePost = (postId) => deleteDoc(doc(db, 'posts', postId));

export const featurePost = (postId, featured) =>
  updateDoc(doc(db, 'posts', postId), { featured });

export const flagPost = (postId, flagged) =>
  updateDoc(doc(db, 'posts', postId), { flagged });

export const getAllUsers = (callback) =>
  onSnapshot(collection(db, 'users'), (snapshot) =>
    callback(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
  );

export const banUser = (userId, banned) =>
  updateDoc(doc(db, 'users', userId), { banned });

export const setUserRole = (userId, role) =>
  updateDoc(doc(db, 'users', userId), { role });

export const getFlaggedPosts = (callback) =>
  onSnapshot(query(collection(db, 'posts'), where('flagged', '==', true)), (snapshot) =>
    callback(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
  );

export const broadcastMessage = (content) =>
  addDoc(collection(db, 'messages'), { from: 'admin', to: 'all', content, createdAt: new Date().toISOString() });