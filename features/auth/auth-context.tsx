'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { z } from 'zod';
import { signInSchema } from './schemas';


type AuthContextType = {
  user: UserModel | null;
  isLoggedIn: boolean;
  login: (data: z.infer<typeof signInSchema>) => Promise<string | undefined>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserModel | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setIsLoggedIn(true);
    }
  }, []);

  const login = async (data: z.infer<typeof signInSchema>): Promise<string | undefined> => {
    // var signInResponse = await signIn(data);
    // if (!signInResponse.ok) return signInResponse.errorMsg;

    // localStorage.setItem('user', JSON.stringify(signInResponse.user));
    // setUser(signInResponse.user!);
    // setIsLoggedIn(true);

    // redirect("/play");

    return;
  };

  const logout = async () => {
    localStorage.removeItem('user');
    setUser(null);
    setIsLoggedIn(false);

    // await logOut();
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}