import {
  User,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebaseConfig";

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  loading: boolean;
  login: (body: LoginCred) => Promise<void>;
  register: (body: RegisterCred) => Promise<void>;
}

type LoginCred = {
  email: string;
  password: string;
};

type RegisterCred = LoginCred & {
  username: string;
};

export const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const login = async ({ email, password }: LoginCred) => {
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
    } finally {
      setLoading(false);
    }
  };

  const register = async ({ email, password, username }: RegisterCred) => {
    try { 
      await createUserWithEmailAndPassword(auth, email, password)
      await updateProfile(auth.currentUser!, {displayName: username})
    }
    catch (error: any) {
      alert(`Sign up failed ${error.message}`)
    }
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, setUser, loading, login, register}}>
      {children}
    </AuthContext.Provider>
  );
};

const useUser = () => useContext(AuthContext);

export default useUser;
