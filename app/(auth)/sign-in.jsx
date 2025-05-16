import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Alert, Platform } from 'react-native';
import { styled } from 'nativewind';
import { useRouter, Link } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import { useUser } from '../../context/UserContext';
import { Ionicons } from '@expo/vector-icons';

// Import UI components
import { SafeArea } from '../../components/ui/SafeArea';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);
const StyledTouchableOpacity = styled(TouchableOpacity);

export default function SignIn() {
  const router = useRouter();
  const { refreshUserDetails } = useUser();
  
  // Form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  // Validate form inputs
  const validateForm = () => {
    let isValid = true;
    const newErrors = { email: '', password: '' };

    if (!email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }

    if (!password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Handle sign in
  const handleSignIn = async () => {
    if (!validateForm()) return;
    
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      await refreshUserDetails();
      router.replace('/(tabs)/home');
    } catch (error) {
      console.error('Sign in error:', error);
      
      // Show appropriate error message
      if (error.code === 'auth/invalid-credential') {
        Alert.alert('Sign In Failed', 'Invalid email or password. Please try again.');
      } else if (error.code === 'auth/too-many-requests') {
        Alert.alert('Sign In Failed', 'Too many unsuccessful attempts. Please try again later.');
      } else {
        Alert.alert('Sign In Failed', 'An error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeArea backgroundColor="#FFFFFF">
      <StyledView className="flex-1 px-6 justify-center">
        {/* Logo and Header */}
        <StyledView className="items-center mb-8">
          <StyledImage 
            source={require('../../assets/images/logo.png')} 
            className="w-[140px] h-[140px] rounded-3xl mb-4"
          />
          <StyledText className="font-bold text-2xl text-neutral-800">
            Welcome Back!
          </StyledText>
          <StyledText className="text-neutral-500 text-base mt-1">
            Sign in to continue
          </StyledText>
        </StyledView>

        {/* Form */}
        <StyledView className="mb-6">
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
            placeholder="Your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
            error={errors.password}
            icon={<Ionicons name="lock-closed-outline" size={20} color="#6B7280" />}
          />
        </StyledView>

        {/* Sign In Button */}
        <Button 
          text="Sign In" 
          onPress={handleSignIn}
          loading={loading}
          fullWidth={true}
        />

        {/* Sign Up Link */}
        <StyledView className="flex-row justify-center mt-6">
          <StyledText className="text-neutral-600 mr-1">
            Don't have an account?
          </StyledText>
          <Link href="/auth/sign-up" asChild>
            <StyledTouchableOpacity>
              <StyledText className="text-primary font-bold">
                Sign Up
              </StyledText>
            </StyledTouchableOpacity>
          </Link>
        </StyledView>
      </StyledView>
    </SafeArea>
  );
}