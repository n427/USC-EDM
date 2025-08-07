import { router, useLocalSearchParams } from 'expo-router';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import UserProfileHeader from '@/components/UserProfileHeader';
import PostGrid from '@/components/PostGrid';
import EventList from '@/components/EventList';
import TicketList from '@/components/TicketList';
import { getUserByUsername } from '@/utils/users';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

const TABS = ['Photos', 'Events', 'Tickets'];

export default function UserProfileScreen() {
  const { username } = useLocalSearchParams();
  const [activeTab, setActiveTab] = useState('Photos');
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchedUser = getUserByUsername(username as string);
    setUser(fetchedUser);
  }, [username]);

  if (!user) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>User not found</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={{ marginLeft: 16, marginTop: 8 }}>
        <Ionicons name="arrow-back" size={24} color="#990000" />
      </TouchableOpacity>
      <UserProfileHeader user={user} />

      <View style={styles.tabs}>
        {TABS.map((tab) => (
          <TouchableOpacity key={tab} onPress={() => setActiveTab(tab)}>
            <Text style={[styles.tab, activeTab === tab && styles.activeTab]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={{ flex: 1 }}>
        {activeTab === 'Photos' && <PostGrid posts={user.posts} />}
        {activeTab === 'Events' && <EventList events={user.events} />}
        {activeTab === 'Tickets' && <TicketList tickets={user.tickets} />}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  tabs: { flexDirection: 'row', justifyContent: 'center', marginVertical: 10 },
  tab: { marginHorizontal: 12, fontSize: 14, color: '#999' },
  activeTab: { color: '#990000', fontWeight: 'bold', textDecorationLine: 'underline' },
  errorText: { textAlign: 'center', marginTop: 100, fontSize: 16 },
});