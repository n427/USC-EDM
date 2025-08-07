import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

export default function UserProfileHeader({ user }: { user: any }) {
  return (
    <View style={styles.banner}>
      <Image source={user.avatar} style={styles.avatar} />
      <Text style={styles.username}>@{user.username}</Text>
      <Text style={styles.bio}>{user.bio}</Text>
      <Text style={styles.classTag}>Class of {user.classYear}</Text>

      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{user.followers}</Text>
          <Text style={styles.statLabel}>Followers</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{user.following}</Text>
          <Text style={styles.statLabel}>Following</Text>
        </View>
      </View>

      {!user.isCurrentUser && (
        <TouchableOpacity style={styles.followButton}>
          <Text style={styles.followText}>Follow</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  banner: { alignItems: 'center', padding: 20 },
  avatar: { width: 80, height: 80, borderRadius: 40, marginBottom: 8 },
  username: { fontSize: 16, fontWeight: 'bold', color: '#000' },
  bio: { color: '#555', textAlign: 'center', marginVertical: 8 },
  classTag: { color: '#990000', fontWeight: 'bold', fontSize: 14 },
  statsRow: { flexDirection: 'row', gap: 20, marginVertical: 8 },
  statBox: { alignItems: 'center' },
  statNumber: { fontWeight: 'bold', fontSize: 16 },
  statLabel: { fontSize: 12, color: 'gray' },
  followButton: {
    backgroundColor: '#FFD700',
    paddingHorizontal: 24,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: 10,
  },
  followText: { color: '#990000', fontWeight: 'bold' },
});
