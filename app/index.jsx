import React, { useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { styled } from 'nativewind';
import { useRouter } from 'expo-router';
import { useUser } from '../context/UserContext';
import { SafeArea } from '../components/ui/SafeArea';
import { Button } from '../components/ui/Button';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);

export default function LandingScreen() {
  const router = useRouter();
  const { userDetails, loading } = useUser();

  // Check authentication state and redirect if needed
  useEffect(() => {
    if (!loading) {
      if (userDetails) {
        // User is authenticated, redirect to home
        router.replace('/(tabs)/home');
      }
    }
  }, [userDetails, loading, router]);

  // If still loading authentication state, show a loading spinner
  if (loading) {
    return (
      <SafeArea>
        <StyledView className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#0075FF" />
          <StyledText className="mt-4 text-neutral-600 text-base">
            Loading...
          </StyledText>
        </StyledView>
      </SafeArea>
    );
  }

  // If user is not authenticated, show landing page
  return (
    <SafeArea backgroundColor="#FFFFFF">
      <StyledView className="flex-1">
        {/* Top section with image */}
        <StyledView className="flex-1 justify-center items-center px-6">
          <StyledImage
            source={require('../assets/images/landing.png')}
            className="w-full h-[300px] resize-contain"
          />
        </StyledView>

        {/* Bottom section with content and buttons */}
        <StyledView className="bg-primary px-6 pt-8 pb-12 rounded-t-[35px]">
          <StyledText className="text-white text-3xl font-bold text-center mb-5">
            Welcome to Intellect
          </StyledText>

          <StyledText className="text-white text-lg text-center mb-8">
            Your go-to destination for mock tests and exam preparation
          </StyledText>

          <Button
            text="Get Started"
            onPress={() => router.push('/auth/sign-up')}
            type="outline"
            className="mb-4 bg-white"
          />

          <Button
            text="Already Have an Account?"
            onPress={() => router.push('/auth/sign-in')}
            type="outline"
            className="border-white bg-transparent"
            textVariant="text-white"
          />
        </StyledView>
      </StyledView>
    </SafeArea>
  );
}