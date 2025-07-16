// CameraActionSheet.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActionSheetIOS } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const USC_COLORS = {
  cardinal: '#990000',
  gold: '#FFCC00',
  black: '#000000',
  white: '#FFFFFF'
};

const CameraButton = () => {
  const router = useRouter();

  const openActionSheet = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['Cancel', 'Create Post', 'Create Story'],
        cancelButtonIndex: 0,
        destructiveButtonIndex: undefined,
        userInterfaceStyle: 'light',
      },
      (buttonIndex) => {
        if (buttonIndex === 1) {
          router.push('/post');
        } else if (buttonIndex === 2) {
          router.push('/postStory')
        }
      }
    );
  };

  return (
    <TouchableOpacity onPress={openActionSheet} style={styles.iconButton}>
      <Ionicons name="camera-outline" size={26} color={USC_COLORS.cardinal} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  iconButton: {
    borderColor: USC_COLORS.cardinal,
    padding: 4,
  },
});

export default CameraButton;
