import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../Firebase/firebase.config';
import { onAuthStateChanged, signOut as firebaseSignOut } from 'firebase/auth';
import axios from 'axios';

const AuthContext = createContext();

const API_URL = 'http://localhost:3000';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('jwt-token') || null);

  // Get JWT token when user logs in
  const getToken = async (currentUser) => {
    if (currentUser) {
      try {
        const { data } = await axios.post(`${API_URL}/jwt`, {
          email: currentUser.email,
          uid: currentUser.uid
        });
        
        localStorage.setItem('jwt-token', data.token);
        setToken(data.token);
      } catch (error) {
        console.error('Error getting token:', error);
      }
    }
  };
  
  // Clear token on logout
  const clearToken = () => {
    localStorage.removeItem('jwt-token');
    setToken(null);
  };
  
  // Sign out function
  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      clearToken();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      
      if (currentUser) {
        getToken(currentUser);
      } else {
        clearToken();
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Create axios instance with authorization header
  const axiosSecure = axios.create({
    baseURL: API_URL
  });
  
  // Add token to requests
  useEffect(() => {
    axiosSecure.interceptors.request.use(
      (config) => {
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
  }, [token]);
  
  const authInfo = {
    user,
    loading,
    token,
    signOut,
    axiosSecure
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};