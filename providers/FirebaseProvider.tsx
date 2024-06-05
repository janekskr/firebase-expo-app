import { useQuery } from "@tanstack/react-query";
import { queryClient } from "./QueryClientProvider";
import { User, createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { auth } from "@/lib/firebaseConfig";
import { SignInSchema, SignUpSchema } from "@/lib/types";
import { Loader } from "@/components";
import { fetchPosts } from "@/lib/api";

function resumeSession(): Promise<User | null> {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        resolve(user);
        unsubscribe();
      },
      reject
    );
  });
}

export function useUser() {
  const { data } = useQuery({
    queryKey: ["user"],
    queryFn: resumeSession,
    staleTime: Infinity,
  });

  return data;
}

export function usePosts() {
  const { data } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    staleTime: Infinity,
  });

  return data;
}

export async function signUp({ username, email, password }: SignUpSchema): Promise<User | null> {
  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  if (auth.currentUser)
    await updateProfile(auth.currentUser, { displayName: username });

  queryClient.setQueryData(["user"], user);
  return user;
}

export async function login({ email, password }: SignInSchema): Promise<User | null> {
  const { user } = await signInWithEmailAndPassword(auth, email, password);
  queryClient.setQueryData(["user"], user);
  return user;
}

export async function logout() {
  await signOut(auth);
  queryClient.setQueryData(["user"], null);
}

export async function resetPassword(email: string) {
  await sendPasswordResetEmail(auth, email);
}

export async function updateUsername(username: string) {
  if (auth.currentUser) {
    await updateProfile(auth.currentUser, { displayName: username });
  }
}

export async function deleteUser() {
  await auth.currentUser?.delete();
  queryClient.setQueryData(["user"], null);
}

export default function FirebaseProvider({ children }: { children: React.ReactNode }) {
  const user = useQuery({
    queryKey: ["user"],
    queryFn: resumeSession,
    staleTime: Infinity,
  });

  const posts = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    staleTime: Infinity,
  });

  if (user.isLoading || posts.isLoading) return <Loader />;

  return <>{children}</>;
}
