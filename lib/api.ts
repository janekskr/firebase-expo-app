// shared/firebasePostFunctions.ts
import {
    addDoc,
    collection,
    deleteDoc,
    getDocs,
    onSnapshot,
    orderBy,
    query,
    where,
    QuerySnapshot,
    Timestamp,
    DocumentData,
    updateDoc,
    doc,
  } from "firebase/firestore";
  import { db, storage } from "@/lib/firebaseConfig";
  import { Post, Like } from "@/lib/types";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
  
  export const fetchPosts = async (): Promise<Post[]> => {
    const postsQuery = query(collection(db, "posts"), orderBy("timestamp", "desc"));
    const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(postsQuery);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    } as Post));
  };
  
  export const subscribeToPosts = (callback: (posts: Post[]) => void): (() => void) => {
    const postsQuery = query(collection(db, "posts"), orderBy("timestamp", "desc"));
    return onSnapshot(postsQuery, (querySnapshot: QuerySnapshot<DocumentData>) => {
      const postsArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      } as Post));
      callback(postsArray);
    }, (error) => {
      console.error("Error fetching posts:", error);
    });
  };
  
  export const likePost = async (postId: string, userId: string): Promise<void> => {
    const like: Omit<Like, "id"> = {
      postId,
      userId,
      timestamp: Timestamp.now(),
    };
    await addDoc(collection(db, "likes"), like);
  };
  
  export const unlikePost = async (postId: string, userId: string): Promise<void> => {
    const likeRef = query(
      collection(db, "likes"),
      where("postId", "==", postId),
      where("userId", "==", userId)
    );
    const snapshots = (await getDocs(likeRef)).docs;
    for (const doc of snapshots) {
      await deleteDoc(doc.ref);
    }
  };
  
  export const subscribeToLikes = (postId: string, callback: (likes: Like[]) => void): (() => void) => {
    const likesQuery = query(
      collection(db, "likes"),
      where("postId", "==", postId),
      orderBy("timestamp", "desc")
    );
    return onSnapshot(likesQuery, (querySnapshot: QuerySnapshot<DocumentData>) => {
      const likesArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      } as Like));
      callback(likesArray);
    }, (error) => {
      console.error("Error fetching likes:", error);
    });
  };

  export const deletePost = async (id: string): Promise<void> => {
    await deleteDoc(doc(db, "posts", id));
  };
  
  const uploadImage = async (uri: string, path: string): Promise<string> => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      const storageRef = ref(storage, path);
      await uploadBytes(storageRef, blob);
      const downloadURL = await getDownloadURL(storageRef);
      return downloadURL;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  };

  export const createPost = async (post: Omit<Post, "id">, imageUris: string[]): Promise<void> => {
    const postRef = await addDoc(collection(db, "posts"), post);
    const postId = postRef.id;
    const uploadPromises = imageUris.map((uri, index) => {
      const path = `posts/${postId}/${Date.now()}_${index}.jpg`;
      return uploadImage(uri, path);
    });
    const imageUrls = await Promise.all(uploadPromises);
    await updateDoc(doc(db, "posts", postId), { imageUrls });
  };
  