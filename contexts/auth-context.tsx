"use client";

import { createContext, useContext, ReactNode } from "react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import type { User, AuthState } from "@/lib/types";

interface StoredUser extends User {
  password: string;
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => boolean;
  register: (email: string, password: string, name: string) => boolean;
  logout: () => void;
  isLoaded: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [users, setUsers, usersLoaded] = useLocalStorage<StoredUser[]>(
    "shiori-users",
    []
  );
  const [currentUser, setCurrentUser, userLoaded] = useLocalStorage<User | null>(
    "shiori-current-user",
    null
  );

  const login = (email: string, password: string): boolean => {
    const user = users.find(
      (u) => u.email === email && u.password === password
    );
    if (user) {
      const { password: _, ...userWithoutPassword } = user;
      setCurrentUser(userWithoutPassword);
      return true;
    }
    return false;
  };

  const register = (email: string, password: string, name: string): boolean => {
    if (users.some((u) => u.email === email)) {
      return false;
    }
    const newUser: StoredUser = {
      id: crypto.randomUUID(),
      email,
      password,
      name,
    };
    setUsers([...users, newUser]);
    const { password: _, ...userWithoutPassword } = newUser;
    setCurrentUser(userWithoutPassword);
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user: currentUser,
        isAuthenticated: !!currentUser,
        login,
        register,
        logout,
        isLoaded: usersLoaded && userLoaded,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
