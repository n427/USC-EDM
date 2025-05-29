import React, { useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Calendar, Clock } from 'lucide-react-native';

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  image: string;
  venue: string;
  description: string;
  coordinates?: { latitude: number; longitude: number };
  attendees?: { id: string; image: string }[];
  totalGoing?: number;
}

interface EventCardProps {
  event: Event;
  isMine: boolean;
}

export default function EventCard({ event, isMine }: EventCardProps) {
  const router = useRouter();
  const scaleAnim = useRef(new Animated.Value(1)).current;
  
  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.97,
      speed: 20,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      speed: 20,
      useNativeDriver: true,
    }).start();
  };

  const navigateToEvent = () => {
    router.push(`/event/${event.id}`);
  };

  return (
    <Animated.View
      style={[
        styles.container,
        { transform: [{ scale: scaleAnim }] }
      ]}
    >
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={navigateToEvent}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.cardTouchable}
      >
        <View style={styles.card}>
          <Image source={{ uri: event.image }} style={styles.image} />
          <View style={styles.contentContainer}>
            <Text style={styles.title} numberOfLines={1}>
              {event.title}
            </Text>
            
            <View style={styles.detailsContainer}>
              <View style={styles.detailItem}>
                <Calendar size={14} color="#F5B50F" />
                <Text style={styles.detailText}>
                  {event.date}
                </Text>
              </View>
              
              <View style={styles.detailItem}>
                <Clock size={14} color="#F5B50F" />
                <Text style={styles.detailText}>
                  {event.time}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
    borderRadius: 16,
    overflow: 'hidden',
  },
  cardTouchable: {
    borderRadius: 16,
  },
  card: {
    backgroundColor: '#B81D24',
    borderRadius: 16,
    overflow: 'hidden',
    flexDirection: 'row',
    height: 90,
  },
  image: {
    width: 90,
    height: 90,
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
  },
  contentContainer: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
    fontFamily: 'Poppins-SemiBold',
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 12,
    color: 'white',
    marginLeft: 4,
    fontFamily: 'Poppins-Regular',
  },
});