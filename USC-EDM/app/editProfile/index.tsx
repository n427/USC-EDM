import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import structuredClone from 'realistic-structured-clone';

if (typeof global.structuredClone === 'undefined') {
  global.structuredClone = structuredClone;
}

const USC_COLORS = {
  cardinal: '#990000',
  gold: '#FFCC00',
  black: '#000000',
  white: '#FFFFFF'
};

const EditProfile = () => {
  const [name, setName] = useState('Catherine');
  const [bio, setBio] = useState('Techno dancer & traveler.');
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const router = useRouter();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfilePic(result.assets[0].uri);
    }
  };

  const handleSave = () => {
    console.log('Updated profile:', {
      name,
      bio,
      profilePic,
      currentPassword,
      newPassword,
      confirmPassword
    });
    router.back();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: USC_COLORS.white }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
            <View style={styles.headerRow}>
              <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={24} color={USC_COLORS.cardinal} />
              </TouchableOpacity>
              <Text style={styles.header}>Edit Profile</Text>
            </View>

            <TouchableOpacity style={styles.pfpContainer} onPress={pickImage}>
              {profilePic ? (
                <Image source={{ uri: profilePic }} style={styles.pfp} />
              ) : (
                <View style={styles.pfpPlaceholder}>
                  <Text style={{ color: USC_COLORS.cardinal }}>Change Photo</Text>
                </View>
              )}
            </TouchableOpacity>

            <TextInput
              placeholder="Name"
              placeholderTextColor={USC_COLORS.black}
              style={styles.input}
              value={name}
              onChangeText={setName}
            />

            <TextInput
              placeholder="Bio"
              placeholderTextColor={USC_COLORS.black}
              style={[styles.input, { height: 80 }]}
              value={bio}
              onChangeText={setBio}
              multiline
            />

            <TextInput
              placeholder="Current Password"
              placeholderTextColor={USC_COLORS.black}
              secureTextEntry
              style={styles.input}
              value={currentPassword}
              onChangeText={setCurrentPassword}
            />

            <TextInput
              placeholder="New Password"
              placeholderTextColor={USC_COLORS.black}
              secureTextEntry
              style={styles.input}
              value={newPassword}
              onChangeText={setNewPassword}
            />

            <TextInput
              placeholder="Confirm New Password"
              placeholderTextColor={USC_COLORS.black}
              secureTextEntry
              style={styles.input}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />

            <TouchableOpacity style={styles.button} onPress={handleSave}>
              <Text style={styles.buttonText}>Save Changes</Text>
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
    paddingBottom: 48
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    gap: 12
  },
  header: {
    fontSize: 32,
    color: USC_COLORS.cardinal,
    fontWeight: 'bold'
  },
  input: {
    borderWidth: 1,
    borderColor: USC_COLORS.cardinal,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    color: USC_COLORS.black
  },
  button: {
    backgroundColor: USC_COLORS.gold,
    padding: 14,
    borderRadius: 8,
    marginTop: 8,
    alignItems: 'center'
  },
  buttonText: {
    color: USC_COLORS.cardinal,
    fontSize: 16,
    fontWeight: 'bold'
  },
  pfpContainer: {
    alignSelf: 'center',
    marginBottom: 20
  },
  pfp: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: USC_COLORS.cardinal
  },
  pfpPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: USC_COLORS.cardinal,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default EditProfile;