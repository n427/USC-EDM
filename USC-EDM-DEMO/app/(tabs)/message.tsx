// EDMA:USC Messaging Page - Per-User Messages & Dynamic Previews
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface User {
  id: string;
  name: string;
  avatar: any;
}

type Sender = 'me' | 'them';

interface Message {
  id: number;
  text: string;
  sender: Sender;
}

const users: User[] = [
  {
    id: '1',
    name: 'Benjamin Lee',
    avatar: require('./assets/benjamin.jpg'),
  },
  {
    id: '2',
    name: 'Farita Smith',
    avatar: require('./assets/farita.jpg'),
  },
  {
    id: '3',
    name: 'Marie Chen',
    avatar: require('./assets/marie.jpg'),
  },
];

export default function MessagingScreen() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [search, setSearch] = useState('');
  const [messagesMap, setMessagesMap] = useState<Record<string, Message[]>>({
    '1': [
      { id: 1, text: 'Are you going to the event tonight?', sender: 'them' },
      { id: 2, text: 'Yeah I’ll be there at 9!', sender: 'me' },
    ],
    '2': [
      { id: 1, text: 'Send me the playlist!!', sender: 'them' },
      { id: 2, text: 'Sent on Spotify just now :)', sender: 'me' },
    ],
    '3': [
      { id: 1, text: 'See you at Leavey Library 📚', sender: 'them' },
      { id: 2, text: 'I’ll bring snacks!', sender: 'me' },
    ],
  });
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (!selectedUser || input.trim() === '') return;
    const newMsg: Message = { id: Date.now(), text: input, sender: 'me' };
    setMessagesMap((prev): Record<string, Message[]> => ({
      ...prev,
      [selectedUser.id]: [...(prev[selectedUser.id] || []), newMsg],
    }));
    setInput('');
  };

  if (selectedUser) {
    const userMessages = messagesMap[selectedUser.id] || [];
    return (
      <KeyboardAvoidingView
        style={styles.chatScreen}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.chatHeader}>
          <TouchableOpacity onPress={() => setSelectedUser(null)}>
            <Ionicons name="arrow-back" size={24} color="#990000" />
          </TouchableOpacity>
          <Image style={styles.picture} source={selectedUser.avatar} />
          <Text style={styles.chatName}>{selectedUser.name}</Text>
        </View>

        <FlatList
          data={userMessages}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={[styles.messageBubble, item.sender === 'me' ? styles.bubbleMe : styles.bubbleThem]}>
              <Text style={item.sender === 'me' ? styles.messageTextMe : styles.messageTextThem}>{item.text}</Text>
            </View>
          )}
          contentContainerStyle={{ paddingBottom: 20 }}
        />

        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Type a message"
            placeholderTextColor="#aaa"
            value={input}
            onChangeText={setInput}
          />
          <TouchableOpacity onPress={sendMessage}>
            <Ionicons name="send" size={24} color="#990000" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Messages</Text>
      <View style={styles.searchRow}>
        <Ionicons name="search" size={18} color="#999" style={{ marginRight: 6 }} />
        <TextInput
          placeholder="Search"
          value={search}
          onChangeText={setSearch}
          placeholderTextColor="#999"
          style={styles.searchBar}
        />
      </View>
      <FlatList
        data={users.filter(u => u.name.toLowerCase().includes(search.toLowerCase()))}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const lastMessage = messagesMap[item.id]?.slice(-1)[0]?.text || '';
          return (
            <TouchableOpacity style={styles.userRow} onPress={() => setSelectedUser(item)}>
              <Image source={item.avatar} style={styles.avatar} />
              <View>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.preview}>{lastMessage}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#990000',
    marginBottom: 16,
    marginTop: 20,
  },
  searchRow: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  searchBar: {
    flex: 1,
    height: 40,
    color: '#333',
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  picture: {
    width: 35,
    height: 35,
    borderRadius: 24,
    marginLeft: 15.
  },
  name: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  preview: {
    color: '#555',
    fontSize: 13,
    marginTop: 2,
  },
  chatScreen: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40,
    paddingHorizontal: 16,
  },
  chatHeader: {
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  chatName: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  messageBubble: {
    maxWidth: '75%',
    borderRadius: 16,
    padding: 10,
    marginBottom: 10,
  },
  bubbleMe: {
    backgroundColor: '#990000',
    alignSelf: 'flex-end',
  },
  bubbleThem: {
    backgroundColor: '#f0f0f0',
    alignSelf: 'flex-start',
  },
  messageTextMe: {
    
    color: '#FFD700',
  },
  messageTextThem: {
    color: '#000',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 25,
    marginVertical: 8,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    marginRight: 10,
    color: '#333',
  },
});