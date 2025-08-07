import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function EventList({ events }: { events: string[] }) {
  return (
    <View style={styles.container}>
      {events.map((event, idx) => (
        <View key={idx} style={styles.eventBox}>
          <Text style={styles.eventText}>{event}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  eventBox: {
    backgroundColor: '#F5F5F5',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  eventText: { color: '#333', fontWeight: '600' },
});
