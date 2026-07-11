import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User, Role, AuthContextType } from '../types/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hardcoded mock credentials list with simulated user profiles
export const MOCK_CREDENTIALS = [
  {
    email: 'superadmin@enterprise.com',
    password: 'SuperAdmin123!',
    user: {
      id: 'usr-001',
      name: 'Alex Mercer',
      email: 'superadmin@enterprise.com',
      role: 'Super Admin' as Role,
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      organization: 'HexaCorp Global'
    }
  },
  {
    email: 'orgadmin@enterprise.com',
    password: 'OrgAdmin123!',
    user: {
      id: 'usr-002',
      name: 'Sarah Connor',
      email: 'orgadmin@enterprise.com',
      role: 'Org Admin' as Role,
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
      organization: 'HexaCorp Global'
    }
  },
  {
    email: 'pm@enterprise.com',
    password: 'PM123!',
    user: {
      id: 'usr-003',
      name: 'Marcus Aurelius',
      email: 'pm@enterprise.com',
      role: 'Project Manager' as Role,
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
      organization: 'HexaCorp Global'
    }
  },
  {
    email: 'dev@enterprise.com',
    password: 'Dev123!',
    user: {
      id: 'usr-004',
      name: 'Linus Torvalds',
      email: 'dev@enterprise.com',
      role: 'Developer' as Role,
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
      organization: 'HexaCorp Global'
    }
  },
  {
    email: 'qa@enterprise.com',
    password: 'QA123!',
    user: {
      id: 'usr-005',
      name: 'Ada Lovelace',
      email: 'qa@enterprise.com',
      role: 'QA/Tester' as Role,
      avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=80',
      organization: 'HexaCorp Global'
    }
  },
  {
    email: 'client@enterprise.com',
    password: 'Client123!',
    user: {
      id: 'usr-006',
      name: 'Steve Jobs',
      email: 'client@enterprise.com',
      role: 'Client/Stakeholder' as Role,
      avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80',
      organization: 'Acme Partnerships'
    }
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Read state from localStorage on load
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('pm_user');
      const token = localStorage.getItem('pm_token');
      if (storedUser && token) {
        // Here we'd normally validate the token with backend, but since it's mock:
        setCurrentUser(JSON.parse(storedUser));
      }
    } catch (err) {
      console.error('Failed to parse persistent user info:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    // Simulate API delay (500ms) for realistic UX feel
    await new Promise((resolve) => setTimeout(resolve, 500));

    const matchedCred = MOCK_CREDENTIALS.find(
      (cred) => cred.email.toLowerCase() === email.toLowerCase() && cred.password === password
    );

    if (matchedCred) {
      const user = matchedCred.user;
      setCurrentUser(user);
      
      // Save to localStorage
      localStorage.setItem('pm_user', JSON.stringify(user));
      // Generate a mock JWT string
      const mockJWT = `mock-jwt-header.${btoa(JSON.stringify(user))}.mock-jwt-signature`;
      localStorage.setItem('pm_token', mockJWT);
      
      setIsLoading(false);
      return true;
    }

    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('pm_user');
    localStorage.removeItem('pm_token');
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated: !!currentUser,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
