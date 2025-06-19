import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Animated } from 'react-native';
import EventCard from '@/components/EventCard';
import { myTickets } from '@/utils/mockData';

export default function MyTickets() {
  // For animation of list items
  const fadeAnim = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>Upcoming</Text>
      
      <Animated.View style={{ opacity: fadeAnim, flex: 1 }}>
        <FlatList
          data={myTickets}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <Animated.View
              style={{
                opacity: fadeAnim,
                transform: [
                  {
                    translateY: fadeAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [50 * (index + 1), 0],
                    }),
                  },
                ],
              }}
            >
              <EventCard event={item} isMine={true} />
            </Animated.View>
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    marginBottom: 15,
    fontFamily: 'Poppins-SemiBold',
  },
  listContent: {
    paddingBottom: 20,
  },
});