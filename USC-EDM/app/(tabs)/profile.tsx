import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';

const screenWidth = Dimensions.get('window').width;
const tileSize = screenWidth / 3 - 12; // 3 columns, with padding

const posts = [
  'addButton',
  require('./assets/azyr.jpg'),
  require('./assets/barcrawl.jpg'),
  require('./assets/sunset.jpg'),
  require('./assets/sunsetbeats.jpg'),
  require('./assets/techno.jpg'),
  require('./assets/streetart.jpg'),
];

export default function ProfileScreen({ navigation }: any) {
  const [activeTab, setActiveTab] = useState<'All' | 'Photos' | 'Videos'>('All');

  const renderPost = ({ item }: { item: any }) => {
    if (item === 'addButton') {
      return (
        <TouchableOpacity
          style={[styles.gridItem, styles.addPostTile]}
          onPress={() => navigation.navigate('CreatePost')}
        >
          <Ionicons name="add" size={70} color="#FFD700" />
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity
        style={styles.gridItem}
        onPress={() => navigation.navigate('FeedScreen', { filter: 'mine' })}
      >
        <Image source={item} style={styles.postImage} />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.banner}>
        <Image source={require('./assets/profile.jpg')} style={styles.avatar} />
        <Text style={styles.username}>@Catherine12</Text>
        <Text style={styles.bio}>My name is Catherine. I like dancing to techno in the rain and traveling all around the world.</Text>
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>1k</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>342</Text>
            <Text style={styles.statLabel}>Following</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumberHighlight}>12</Text>
            <Text style={styles.statLabelHighlight}>Events Attended</Text>
          </View>
        </View>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editText}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingsButton}>
            <Feather name="settings" size={17} color="#990000" />
          </TouchableOpacity>
        </View>
        <View style={styles.tabRow}>
          {['All', 'Photos', 'Videos'].map((tab) => (
            <TouchableOpacity key={tab} onPress={() => setActiveTab(tab as any)}>
              <Text style={[styles.tab, activeTab === tab && styles.activeTab]}>{tab}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={(_, index) => index.toString()}
        numColumns={3}
        contentContainerStyle={styles.grid}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  banner: { alignItems: 'center', padding: 20 },
  avatar: { width: 80, height: 80, borderRadius: 40, marginBottom: 8 },
  username: { fontSize: 16, fontWeight: 'bold', color: '#000' },
  bio: { color: '#555', textAlign: 'center', marginVertical: 8 },
  statsRow: { flexDirection: 'row', justifyContent: 'center', gap: 20, marginVertical: 8 },
  statBox: { alignItems: 'center' },
  statBoxHighlight: {
    alignItems: 'center',
    backgroundColor: '#99000010',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  statNumber: { fontWeight: 'bold', fontSize: 16 },
  statLabel: { fontSize: 12, color: 'gray' },
  statLabelHighlight: { fontSize: 12, color: '#990000' },
  statNumberHighlight: { fontWeight: 'bold', fontSize: 16, color: '#FFD700' },
  buttonRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginVertical: 10 },
  editButton: { backgroundColor: '#FFD700', paddingVertical: 6, paddingHorizontal: 16, borderRadius: 20 },
  editText: { color: '#990000', fontWeight: 'bold' },
  settingsButton: { borderWidth: 1, borderColor: '#990000', borderRadius: 20, padding: 4, backgroundColor: '#FFD700'},
  tabRow: { flexDirection: 'row', justifyContent: 'center', marginVertical: 10 },
  tab: { marginHorizontal: 12, fontSize: 14, color: '#999' },
  activeTab: { color: '#990000', fontWeight: 'bold', textDecorationLine: 'underline' },
  grid: { paddingHorizontal: 10 },
  gridItem: {
    width: tileSize,
    height: tileSize,
    margin: 4,
    borderRadius: 10,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  postImage: { width: '100%', height: '100%' },
  addPostTile: {
    borderWidth: 2,
    borderColor: '#990000',
    backgroundColor: '#fff9f9',
  },
});