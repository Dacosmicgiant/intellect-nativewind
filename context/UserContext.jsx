import React, { createContext, useState, useEffect } from 'react';
import { auth, db } from '../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';

// Create the context with default values
export const UserContext = createContext({
  userDetails: null,
  setUserDetails: () => {},
  loading: true,
  refreshUserDetails: async () => {},
});

export const UserProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserDetails = async (email) => {
    try {
      // First check if a document with the exact email exists
      const docRef = doc(db, 'users', email);
      let userSnap = await getDoc(docRef);
      
      // If not found, try to find it by querying the email field
      if (!userSnap.exists()) {
        const usersRef = collection(db, 'users');
        const q = query(usersRef, where('email', '==', email));
        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) {
          userSnap = querySnapshot.docs[0];
          return userSnap.data();
        }
        return null;
      }
      
      return userSnap.data();
    } catch (error) {
      console.error('Error fetching user details:', error);
      return null;
    }
  };

  // Function to refresh user details
  const refreshUserDetails = async () => {
    if (!auth.currentUser) return;
    
    try {
      const userEmail = auth.currentUser.email;
      if (!userEmail) return;
      
      const userData = await fetchUserDetails(userEmail);
      setUserDetails(userData);
    } catch (error) {
      console.error('Error refreshing user details:', error);
    }
  };

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user && user.email) {
        // User is signed in
        const userData = await fetchUserDetails(user.email);
        setUserDetails(userData);
      } else {
        // User is signed out
        setUserDetails(null);
      }
      setLoading(false);
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider
      value={{
        userDetails,
        setUserDetails,
        loading,
        refreshUserDetails,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUser = () => {
  const context = React.useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};