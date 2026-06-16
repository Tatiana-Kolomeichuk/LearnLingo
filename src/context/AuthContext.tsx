import { createContext } from "react";
import type { User } from "firebase/auth";

export interface AuthContextValue {
  user: User | null;
  isLoggedIn: boolean;
  isAuthLoading: boolean;
}

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined
);
