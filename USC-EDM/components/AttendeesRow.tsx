import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

interface Attendee {
  id: string;
  image: string;
}

interface AttendeesRowProps {
  attendees: Attendee[];
  totalGoing: number;
}

export default function AttendeesRow({ attendees, totalGoing }: AttendeesRowProps) {
  // Limit to showing max 4 attendees in the UI
  const displayAttendees = attendees.slice(0, 4);
  const remainingCount = totalGoing - displayAttendees.length;

  return (
    <View style={styles.container}>
      <View style={styles.avatarsContainer}>
        {displayAttendees.map((attendee, index) => (
          <View 
            key={attendee.id} 
            style={[
              styles.avatarWrapper, 
              { zIndex: 10 - index, marginLeft: index > 0 ? -15 : 0 }
            ]}
          >
            <Image 
              source={{ uri: attendee.image }} 
              style={styles.avatar} 
            />
          </View>
        ))}
      </View>
      
      <Text style={styles.goingText}>
        {totalGoing} Going
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  avatarsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#2A2A2A',
    overflow: 'hidden',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  goingText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
  },
});