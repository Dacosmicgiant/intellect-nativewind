import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { styled } from 'nativewind';
import { useRouter, Link } from 'expo-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../lib/firebase';
import { useUser } from '../../context/UserContext';
import { Ionicons } from '@expo/vector-icons';

// Import UI components
import { SafeArea } from '../../components/ui/SafeArea';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);
const StyledScrollView = styled(ScrollView);
const StyledTouchableOpacity = styled(TouchableOpacity);

export default function SignUp() {
  const router = useRouter();
  const { setUserDetails } = useUser();
  
  // Form state
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({ 
    fullName: '', 
    email: '', 
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);

  // Validate form inputs
  const validateForm = () => {
    let isValid = true;
    const newErrors = { 
      fullName: '', 
      email: '', 
      password: '',
      confirmPassword: ''
    };

    // Validate full name
    if (!fullName.trim()) {
      newErrors.fullName = 'Full name is required';
      isValid = false;
    }

    // Validate email
    if (!email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }

    // Validate password
    if (!password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    // Validate confirm password
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Save user data to Firestore
  const saveUserData = async (userId, userData) => {
    try {
      // Use the user ID as the document ID in Firestore
      await setDoc(doc(db, 'users', userId), userData);
      setUserDetails(userData);
      return true;
    } catch (error) {
      console.error('Error saving user data:', error);
      return false;
    }
  };

  // Handle sign up
  const handleSignUp = async () => {
    if (!validateForm()) return;
    
    setLoading(true);
    try {
      // Create user in Firebase Auth
      const response = await createUserWithEmailAndPassword(
        auth, 
        email.trim().toLowerCase(), 
        password
      );
      
      // Prepare user data for Firestore
      const userData = {
        name: fullName.trim(),
        email: email.trim().toLowerCase(),
        isAdmin: false,
        subscriptionStatus: 'free',
        testsRemaining: 3,
        subscriptionExpiry: null,
        enrolledCertifications: [],
        createdAt: new Date(),
      };
      
      // Save user data to Firestore
      const savedUser = await saveUserData(response.user.uid, userData);
      
      if (savedUser) {
        Alert.alert(
          'Account Created',
          'Your account has been created successfully!',
          [{ text: 'OK', onPress: () => router.replace('/(tabs)/home') }]
        );
      } else {
        Alert.alert(
          'Error',
          'Your account was created but we could not save your profile. Please contact support.'
        );
      }
    } catch (error) {
      console.error('Sign up error:', error);
      
      // Show appropriate error message
      if (error.code === 'auth/email-already-in-use') {
        Alert.alert('Sign Up Failed', 'This email is already in use. Please try another email.');
      } else {
        Alert.alert('Sign Up Failed', 'An error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeArea backgroundColor="#FFFFFF">
      <StyledScrollView 
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <StyledView className="flex-1 px-6 py-8 justify-center">
          {/* Logo and Header */}
          <StyledView className="items-center mb-8">
            <StyledImage 
              source={require('../../assets/images/logo.png')} 
              className="w-[120px] h-[120px] rounded-3xl mb-4"
            />
            <StyledText className="font-bold text-2xl text-neutral-800">
              Create New Account
            </StyledText>
            <StyledText className="text-neutral-500 text-base mt-1">
              Join Intellect and start learning
            </StyledText>
          </StyledView>

          {/* Form */}
          <StyledView className="mb-6">
            <Input
              label="Full Name"
              placeholder="Your full name"
              value={fullName}
              onChangeText={setFullName}
              error={errors.fullName}
              icon={<Ionicons name="person-outline" size={20} color="#6B7280" />}
            />
            
            <Input
              label="Email"
              placeholder="Your email address"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              error={errors.email}
              icon={<Ionicons name="mail-outline" size={20} color="#6B7280" />}
            />
            
            <Input
              label="Password"
              placeholder="Choose a password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={true}
              error={errors.password}
              icon={<Ionicons name="lock-closed-outline" size={20} color="#6B7280" />}
            />
            
            <Input
              label="Confirm Password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={true}
              error={errors.confirmPassword}
              icon={<Ionicons name="lock-closed-outline" size={20} color="#6B7280" />}
            />
          </StyledView>

          {/* Sign Up Button */}
          <Button 
            text="Create Account" 
            onPress={handleSignUp}
            loading={loading}
            fullWidth={true}
          />

          {/* Sign In Link */}
          <StyledView className="flex-row justify-center mt-6">
            <StyledText className="text-neutral-600 mr-1">
              Already have an account?
            </StyledText>
            <Link href="/auth/sign-in" asChild>
              <StyledTouchableOpacity>
                <StyledText className="text-primary font-bold">
                  Sign In
                </StyledText>
              </StyledTouchableOpacity>
            </Link>
          </StyledView>
        </StyledView>
      </StyledScrollView>
    </SafeArea>
  );
}