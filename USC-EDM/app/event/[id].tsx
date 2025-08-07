import React, { useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  ScrollView, 
  TouchableOpacity,
  Animated,
  Dimensions,
  Platform
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ChevronLeft, MapPin, Clock, Calendar } from 'lucide-react-native';
import EventMap from '@/components/EventMap';
import AttendeesRow from '@/components/AttendeesRow';
import { getEventById } from '@/utils/mockEvents';

const { width } = Dimensions.get('window');

export default function EventDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const event = getEventById(id as string);
  
  const scrollY = useRef(new Animated.Value(0)).current;
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100, 150],
    outputRange: [0, 0.5, 1],
    extrapolate: 'clamp',
  });
  
  const imageScale = scrollY.interpolate({
    inputRange: [-100, 0, 100],
    outputRange: [1.2, 1, 0.8],
    extrapolate: 'clamp',
  });

  const buttonTranslateY = useRef(new Animated.Value(100)).current;
  const buttonOpacity = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    Animated.parallel([
      Animated.timing(buttonTranslateY, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
        delay: 300,
      }),
      Animated.timing(buttonOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
        delay: 300,
      }),
    ]).start();
  }, []);

  if (!event) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Event not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <Animated.View style={[
        styles.animatedHeader,
        { opacity: headerOpacity }
      ]}>
        <View style={styles.headerContent}>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => router.back()}
          >
            <ChevronLeft size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle} numberOfLines={1}>{event.title}</Text>
          <View style={{ width: 24 }} />
        </View>
      </Animated.View>
      
      <ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        <View style={styles.heroContainer}>
          <TouchableOpacity 
            style={styles.absoluteBackButton} 
            onPress={() => router.back()}
          >
            <View style={styles.backButtonCircle}>
              <ChevronLeft size={24} color="white" />
            </View>
          </TouchableOpacity>
          
          <Animated.View style={{ transform: [{ scale: imageScale }] }}>
            <Image 
              source={event.image} 
              style={styles.eventImage}
              resizeMode="cover"
            />
          </Animated.View>
          
          <View style={styles.eventTitleContainer}>
            <Text style={styles.eventTitle}>{event.title}</Text>
            <View style={styles.venueContainer}>
              <MapPin size={16} color="#F5B50F" style={{ marginRight: 5 }} />
              <Text style={styles.venueText}>{event.venue}</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.contentContainer}>
          <View style={styles.dateTimeContainer}>
            <View style={styles.infoItem}>
              <Calendar size={20} color="#F5B50F" style={{ marginRight: 8 }} />
              <View>
                <Text style={styles.infoLabel}>Date</Text>
                <Text style={styles.infoValue}>{event.date}</Text>
              </View>
            </View>
            
            <View style={styles.infoItem}>
              <Clock size={20} color="#F5B50F" style={{ marginRight: 8 }} />
              <View>
                <Text style={styles.infoLabel}>Time</Text>
                <Text style={styles.infoValue}>{event.time}</Text>
              </View>
            </View>
          </View>
          
          <View style={styles.attendeesContainer}>
            <AttendeesRow attendees={event.attendees || []} totalGoing={event.totalGoing || 0} />
          </View>
          
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Event Description</Text>
            <Text style={styles.descriptionText}>{event.description}</Text>
          </View>
          
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Venue Location</Text>
            <View style={styles.mapContainer}>
              <EventMap 
                latitude={event.coordinates?.latitude || 34.0224} 
                longitude={event.coordinates?.longitude || -118.2851} 
                title={event.venue || ''}
              />
            </View>
          </View>
          
          <View style={{ height: 100 }} />
        </View>
      </ScrollView>
      
      <Animated.View 
        style={[
          styles.buyButtonContainer,
          {
            transform: [{ translateY: buttonTranslateY }],
            opacity: buttonOpacity
          }
        ]}
      >
        <TouchableOpacity style={styles.buyButton} activeOpacity={0.8}>
          <Text style={styles.buyButtonText}>RSVP/Purchase Tickets</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
  },
  animatedHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    backgroundColor: '#B81D24',
    paddingTop: Platform.OS === 'ios' ? 50 : 40,
    paddingBottom: 10,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
    textAlign: 'center',
    fontFamily: 'Poppins-SemiBold',
  },
  backButton: {
    padding: 5,
  },
  heroContainer: {
    position: 'relative',
  },
  absoluteBackButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 40,
    left: 15,
    zIndex: 10,
  },
  backButtonCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  eventImage: {
    width: '100%',
    height: 300,
  },
  eventTitleContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#B81D24',
    padding: 15,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  eventTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    fontFamily: 'Poppins-Bold',
  },
  venueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  venueText: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
  },
  contentContainer: {
    backgroundColor: '#1A1A1A',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  dateTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#2A2A2A',
    borderRadius: 12,
    flex: 0.48,
  },
  infoLabel: {
    color: '#999999',
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
  },
  infoValue: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
  },
  attendeesContainer: {
    backgroundColor: '#2A2A2A',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    fontFamily: 'Poppins-SemiBold',
  },
  descriptionText: {
    color: '#DDDDDD',
    fontSize: 14,
    lineHeight: 22,
    fontFamily: 'Poppins-Regular',
  },
  mapContainer: {
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 5,
  },
  buyButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(26, 26, 26, 0.95)',
    paddingVertical: 15,
    paddingHorizontal: 20,
    paddingBottom: Platform.OS === 'ios' ? 35 : 15,
  },
  buyButton: {
    backgroundColor: '#F5B50F',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  buyButtonText: {
    color: '#1A1A1A',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Bold',
  },
  errorText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 200,
    fontFamily: 'Poppins-Medium',
  }
});