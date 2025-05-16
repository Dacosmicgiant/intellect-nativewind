import React from 'react';
import { View, Text } from 'react-native';
import { styled } from 'nativewind';
import { useUser } from '../../context/UserContext';
import { SafeArea } from '../../components/ui/SafeArea';

const StyledView = styled(View);
const StyledText = styled(Text);

export default function HomeScreen() {
  const { userDetails } = useUser();

  return (
    <SafeArea backgroundColor="#F5F7FA">
      <StyledView className="flex-1 p-6">
        <StyledView className="bg-white rounded-2xl p-6 shadow">
          <StyledText className="text-2xl font-bold text-neutral-800">
            Hello, {userDetails?.name || 'User'}
          </StyledText>
          <StyledText className="text-base text-neutral-600 mt-1">
            Welcome to Intellect
          </StyledText>
        </StyledView>
        
        {/* For now, just a placeholder message */}
        <StyledView className="mt-8 items-center justify-center flex-1">
          <StyledText className="text-neutral-600 text-center">
            Home screen implementation is coming soon!
          </StyledText>
        </StyledView>
      </StyledView>
    </SafeArea>
  );
}