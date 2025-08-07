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
  View
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { supabase } from '../../utils/supabaseClient';

const USC_COLORS = {
  cardinal: '#990000',
  gold: '#FFCC00',
  black: '#000000',
  white: '#FFFFFF'
};

const YEARS = Array.from({ length: 20 }, (_, i) => `${2014 + i}`);

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [classYear, setClassYear] = useState('');
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const router = useRouter();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1
    });

    if (!result.canceled) {
      setProfilePic(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    setErrorMsg('');
    if (!email || !password || (!isLogin && (!confirmPassword || !name || !classYear))) {
      setErrorMsg('Please fill in all required fields.');
      return;
    }
    if (!isLogin && password !== confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }
    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        router.replace('/(tabs)');
      } else {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        // Optionally store name, bio, classYear, profilePic
        setIsLogin(true);
        setErrorMsg('Signup successful! Please check your email to confirm.');
      }
    } catch (error: any) {
      setErrorMsg(error.message || 'Authentication failed.');
    }
  };

  const [open, setOpen] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: USC_COLORS.white }}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
            <Text style={styles.header}>{isLogin ? 'Login' : 'Sign Up'}</Text>

            {!isLogin && (
              <TouchableOpacity style={styles.pfpContainer} onPress={pickImage}>
                {profilePic ? (
                  <Image source={{ uri: profilePic }} style={styles.pfp} />
                ) : (
                  <View style={styles.pfpPlaceholder}>
                    <Text style={{ color: USC_COLORS.cardinal }}>Add Photo</Text>
                  </View>
                )}
              </TouchableOpacity>
            )}

            {!isLogin && (
              <>
                <TextInput
                  placeholder="Name"
                  placeholderTextColor={USC_COLORS.black}
                  style={styles.input}
                  value={name}
                  onChangeText={setName}
                />

                <View style={{ zIndex: 1000, marginBottom: 16 }}>
                <DropDownPicker
                  open={open}
                  value={classYear}
                  items={YEARS.map((year) => ({ label: year, value: year }))}
                  setOpen={setOpen}
                  setValue={setClassYear}
                  placeholder="Select Class Year"
                  style={{
                    borderColor: USC_COLORS.cardinal,
                  }}
                  textStyle={{ color: USC_COLORS.black }}
                  placeholderStyle={{ color: '#999' }}
                  dropDownContainerStyle={{
                    borderColor: USC_COLORS.cardinal,
                  }}
                />
              </View>
              </>
            )}

            <TextInput
              placeholder="Email"
              placeholderTextColor={USC_COLORS.black}
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
            />

            <TextInput
              placeholder="Password"
              placeholderTextColor={USC_COLORS.black}
              secureTextEntry
              style={styles.input}
              value={password}
              onChangeText={setPassword}
            />

            {!isLogin && (
              <>
                <TextInput
                  placeholder="Confirm Password"
                  placeholderTextColor={USC_COLORS.black}
                  secureTextEntry
                  style={styles.input}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                />
                <TextInput
                  placeholder="Bio"
                  placeholderTextColor={USC_COLORS.black}
                  style={[styles.input, { height: 80 }]}
                  value={bio}
                  onChangeText={setBio}
                  multiline
                />
              </>
            )}

            {errorMsg ? <Text style={{ color: 'red', marginBottom: 12, textAlign: 'center' }}>{errorMsg}</Text> : null}

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>{isLogin ? 'Login' : 'Sign Up'}</Text>
            </TouchableOpacity>

            <View style={styles.toggleContainer}>
              <Text style={styles.toggleText}>
                {isLogin ? "Don't have an account? " : 'Already have an account? '}
                <Text style={styles.toggleLink} onPress={() => setIsLogin(!isLogin)}>
                  {isLogin ? 'Sign Up' : 'Login'}
                </Text>
              </Text>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: { padding: 24, paddingBottom: 48 },
  header: { fontSize: 32, color: USC_COLORS.cardinal, fontWeight: 'bold', marginBottom: 32, textAlign: 'center' },
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
  buttonText: { color: USC_COLORS.cardinal, fontSize: 16, fontWeight: 'bold' },
  toggleContainer: { marginTop: 24, alignItems: 'center' },
  toggleText: { color: USC_COLORS.black },
  toggleLink: { color: USC_COLORS.cardinal, fontWeight: '600' },
  pfpContainer: { alignSelf: 'center', marginBottom: 20 },
  pfp: { width: 100, height: 100, borderRadius: 50, borderWidth: 2, borderColor: USC_COLORS.cardinal },
  pfpPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: USC_COLORS.cardinal,
    alignItems: 'center',
    justifyContent: 'center'
  },
  pickerContainer: { marginBottom: 16 },
  pickerLabel: { marginBottom: 6, color: USC_COLORS.black },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: USC_COLORS.cardinal,
    borderRadius: 8,
    overflow: 'hidden'
  },
  picker: {
    height: 50,
    color: USC_COLORS.black
  }
});

export default LoginSignup;
