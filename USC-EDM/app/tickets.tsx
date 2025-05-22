import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';

// Mock data for tickets
const tickets = [
  {
    id: '1',
    title: 'New year celebration',
    date: 'Fri nov 1 2022',
    time: '8:00AM',
    image: 'https://images.unsplash.com/photo-1467810563316-b5476525c0f9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80'
  },
  {
    id: '2',
    title: 'Birthday Event',
    date: 'sun nov 10 2022',
    time: '7:00AM',
    image: 'https://images.unsplash.com/photo-1496843916299-590492c751f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80'
  },
  {
    id: '3',
    title: 'Food festivals',
    date: 'Thu nov 11 2022',
    time: '6:00AM',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80'
  },
  {
    id: '4',
    title: 'Open mic',
    date: 'Fri nov 9 2022',
    time: '11:00AM',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80'
  },
  {
    id: '5',
    title: 'Music concerts',
    date: 'Fri nov 18 2022',
    time: '6:00AM',
    image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
  },
  {
    id: '6',
    title: 'Photographic',
    date: 'sat nov 12 2022',
    time: '12:00AM',
    image: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
  }
];

export default function TicketsScreen() {
  const router = useRouter();

  const handleTicketPress = (id: string) => {
    router.push(`/event-details?id=${id}`);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <LinearGradient
        colors={['#B22222', '#8B0000']}
        style={styles.header}
      >
        <Link href="/" asChild>
          <TouchableOpacity style={styles.backButton}>
            <ChevronLeft size={24} color="#FFD700" />
          </TouchableOpacity>
        </Link>
        <Text style={styles.headerTitle}>My Tickets</Text>
        <View style={styles.placeholder} />
      </LinearGradient>
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Upcoming</Text>
        
        {tickets.map((ticket) => (
          <TouchableOpacity 
            key={ticket.id} 
            style={styles.ticketCard}
            onPress={() => handleTicketPress(ticket.id)}
          >
            <Image 
              source={{ uri: ticket.image }} 
              style={styles.ticketImage}
            />
            <View style={styles.ticketInfo}>
              <Text style={styles.ticketTitle}>{ticket.title}</Text>
              <View style={styles.ticketDetails}>
                <View style={styles.ticketDetail}>
                  <Text style={styles.ticketDetailLabel}>Date</Text>
                  <Text style={styles.ticketDetailValue}>{ticket.date}</Text>
                </View>
                <View style={styles.ticketDetail}>
                  <Text style={styles.ticketDetailLabel}>Time</Text>
                  <Text style={styles.ticketDetailValue}>{ticket.time}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFD700',
  },
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#B22222',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    margin: 16,
  },
  ticketCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 16,
    overflow: 'hidden',
  },
  ticketImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    margin: 8,
  },
  ticketInfo: {
    flex: 1,
    padding: 12,
  },
  ticketTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  ticketDetails: {
    flexDirection: 'row',
  },
  ticketDetail: {
    marginRight: 24,
  },
  ticketDetailLabel: {
    fontSize: 12,
    color: '#FFD700',
    marginBottom: 2,
  },
  ticketDetailValue: {
    fontSize: 14,
    color: 'white',
  },
});