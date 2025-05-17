import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'Central Office' | 'Field Officer' | 'LGU';
}

interface UserContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulating loading user from storage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    
    // For demo purposes, auto-login if no user is found
    if (!storedUser) {
      const demoUser: User = {
        id: '1',
        name: 'DSWD Admin',
        email: 'admin@dswd.gov.ph',
        role: 'Central Office'
      };
      setUser(demoUser);
      localStorage.setItem('user', JSON.stringify(demoUser));
    }
    
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Demo login - in a real app, this would validate with a backend
    const demoUser: User = {
      id: '1',
      name: 'DSWD Admin',
      email: email,
      role: 'Central Office'
    };
    
    setUser(demoUser);
    localStorage.setItem('user', JSON.stringify(demoUser));
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <UserContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};