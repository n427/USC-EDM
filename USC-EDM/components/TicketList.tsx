import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function TicketList({ tickets }: { tickets: string[] }) {
  return (
    <View style={styles.container}>
      {tickets.map((ticket, idx) => (
        <View key={idx} style={styles.ticketBox}>
          <Text style={styles.ticketText}>{ticket}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  ticketBox: {
    backgroundColor: '#FFF2E2',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  ticketText: { color: '#990000', fontWeight: '600' },
});
