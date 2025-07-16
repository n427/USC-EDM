import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Image, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';


const USC_COLORS = {
  cardinal: '#990000',
  gold: '#FFCC00',
  black: '#000000',
  white: '#FFFFFF'
};

const CreatePost = () => {
  const [postImage, setPostImage] = useState<string | null>(null);
  const [description, setDescription] = useState('');
  const router = useRouter();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setPostImage(result.assets[0].uri);
    }
  };

  const handlePost = () => {
    // Placeholder: Handle upload logic here
    console.log('Posted:', { image: postImage, description });
    router.back(); // or navigate somewhere
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: USC_COLORS.white }}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
            
            <TouchableOpacity onPress={() => router.back()} style={{ position: 'absolute', top: 16, left: 20, zIndex: 10 }}>
                <Ionicons name="arrow-back" size={24} color="#990000" />
            </TouchableOpacity>

            <Text style={styles.header}>Create Post</Text>

            <TouchableOpacity style={styles.imageBox} onPress={pickImage}>
              {postImage ? (
                <Image source={{ uri: postImage }} style={styles.image} />
              ) : (
                <Text style={styles.imagePlaceholder}>Tap to select image</Text>
              )}
            </TouchableOpacity>

            <TextInput
              placeholder="Write a caption..."
              placeholderTextColor={USC_COLORS.black}
              style={styles.input}
              value={description}
              onChangeText={setDescription}
              multiline
            />

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
  container: {
    padding: 24,
    flex: 1
  },
  header: {
    fontSize: 28,
    color: USC_COLORS.cardinal,
    fontWeight: 'bold',
    marginBottom: 24,
    marginTop: 30,
    textAlign: 'left'
  },
  imageBox: {
    width: '100%',
    aspectRatio: 1,
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
  input: {
    borderWidth: 1,
    borderColor: USC_COLORS.cardinal,
    borderRadius: 8,
    padding: 12,
    color: USC_COLORS.black,
    marginBottom: 16,
    height: 100
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

export default CreatePost;
