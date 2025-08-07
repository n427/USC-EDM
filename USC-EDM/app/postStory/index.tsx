// CreateStory.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Image, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const USC_COLORS = {
  cardinal: '#990000',
  gold: '#FFCC00',
  black: '#000000',
  white: '#FFFFFF'
};

const CreateStory = () => {
  const [storyImage, setStoryImage] = useState<string | null>(null);
  const router = useRouter();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [9, 16], // phone screen ratio
      quality: 1,
    });

    if (!result.canceled) {
      setStoryImage(result.assets[0].uri);
    }
  };

  const handlePost = () => {
    console.log('Story Posted:', { image: storyImage });
    router.back();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: USC_COLORS.white }}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
            <View style={styles.headerRow}>
              <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={24} color={USC_COLORS.cardinal} />
              </TouchableOpacity>
              <Text style={styles.header}>Create Story</Text>
            </View>

            <TouchableOpacity style={styles.imageBox} onPress={pickImage}>
              {storyImage ? (
                <Image source={{ uri: storyImage }} style={styles.image} />
              ) : (
                <Text style={styles.imagePlaceholder}>Tap to select story image</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={handlePost}>
              <Text style={styles.buttonText}>Post</Text>
            </TouchableOpacity>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 24,
    paddingBottom: 48,
    flexGrow: 1
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 24
  },
  header: {
    fontSize: 28,
    color: USC_COLORS.cardinal,
    fontWeight: 'bold'
  },
  imageBox: {
    width: '100%',
    aspectRatio: 9 / 16,
    borderWidth: 1,
    borderColor: USC_COLORS.cardinal,
    borderRadius: 12,
    marginBottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden'
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
  },
  imagePlaceholder: {
    color: USC_COLORS.cardinal,
    fontSize: 16
  },
  button: {
    backgroundColor: USC_COLORS.gold,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center'
  },
  buttonText: {
    color: USC_COLORS.cardinal,
    fontSize: 16,
    fontWeight: 'bold'
  }
});

export default CreateStory;