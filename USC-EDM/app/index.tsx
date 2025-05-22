import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Calendar, MapPin } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';

// Mock data for upcoming events
const upcomingEvents = [
  {
    id: '1',
    title: 'Back 222 SChool USC Boiler Room',
    location: 'Greek Row',
    date: '18th Nov 2022',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    attendees: 100
  },
  {
    id: '2',
    title: 'New Year Celebration',
    location: 'Downtown LA',
    date: '31st Dec 2022',
    image: 'https://images.unsplash.com/photo-1467810563316-b5476525c0f9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80',
    attendees: 250
  },
  {
    id: '3',
    title: 'Music Festival',
    location: 'Santa Monica Beach',
    date: '15th Dec 2022',
    image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    attendees: 180
  }
];

export default function HomeScreen() {
  const router = useRouter();

  const handleEventPress = (id: string) => {
    router.push(`/event-details?id=${id}`);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <LinearGradient
        colors={['#B22222', '#8B0000']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>EDMA:USC</Text>
      </LinearGradient>
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Upcoming Events</Text>
        
        {upcomingEvents.map((event) => (
          <TouchableOpacity 
            key={event.id} 
            style={styles.eventCard}
            onPress={() => handleEventPress(event.id)}
          >
            <Image 
              source={{ uri: event.image }} 
              style={styles.eventImage}
            />
            <LinearGradient
              colors={['transparent', 'rgba(0,0,0,0.7)']}
              style={styles.eventGradient}
            />
            <View style={styles.eventContent}>
              <Text style={styles.eventTitle}>{event.title}</Text>
              <View style={styles.eventDetails}>
                <View style={styles.eventDetail}>
                  <MapPin size={16} color="#FFD700" />
                  <Text style={styles.eventDetailText}>{event.location}</Text>
                </View>
                <View style={styles.eventDetail}>
                  <Calendar size={16} color="#FFD700" />
                  <Text style={styles.eventDetailText}>{event.date}</Text>
                </View>
              </View>
              <View style={styles.attendeesContainer}>
                <Text style={styles.attendeesText}>{event.attendees} Going</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
        
        <Text style={styles.sectionTitle}>Popular Events</Text>
        
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.horizontalScrollView}
        >
          {upcomingEvents.map((event) => (
            <TouchableOpacity 
              key={event.id} 
              style={styles.horizontalEventCard}
              onPress={() => handleEventPress(event.id)}
            >
              <Image 
                source={{ uri: event.image }} 
                style={styles.horizontalEventImage}
              />
              <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.7)']}
                style={styles.horizontalEventGradient}
              />
              <View style={styles.horizontalEventContent}>
                <Text style={styles.horizontalEventTitle}>{event.title}</Text>
                <View style={styles.horizontalEventDetail}>
                  <MapPin size={12} color="#FFD700" />
                  <Text style={styles.horizontalEventDetailText}>{event.location}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFD700',
  },
  scrollView: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#B22222',
    margin: 16,
  },
  eventCard: {
    height: 200,
    marginHorizontal: 16,
    marginBottom: 24,
    borderRadius: 12,
    overflow: 'hidden',
  },
  eventImage: {
    width: '100%',
    height: '100%',
  },
  eventGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '70%',
  },
  eventContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  eventDetails: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  eventDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  eventDetailText: {
    fontSize: 14,
    color: 'white',
    marginLeft: 4,
  },
  attendeesContainer: {
    backgroundColor: 'rgba(255, 215, 0, 0.3)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  attendeesText: {
    fontSize: 12,
    color: '#FFD700',
    fontWeight: 'bold',
  },
  horizontalScrollView: {
    paddingLeft: 16,
    marginBottom: 24,
  },
  horizontalEventCard: {
    width: 200,
    height: 150,
    marginRight: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  horizontalEventImage: {
    width: '100%',
    height: '100%',
  },
  horizontalEventGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '50%',
  },
  horizontalEventContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
  },
  horizontalEventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  horizontalEventDetail: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  horizontalEventDetailText: {
    fontSize: 12,
    color: 'white',
    marginLeft: 4,
  },
});