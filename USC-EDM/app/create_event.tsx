import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput, Image } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { ChevronLeft, Calendar, Clock, Plus } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';

export default function CreateEventScreen() {
  const router = useRouter();
  const [eventName, setEventName] = useState('Back 222 SChool USC Boiler Room');
  const [date, setDate] = useState('9/25/2025');
  const [time, setTime] = useState('9:00 AM');
  const [description, setDescription] = useState(
    'Cruise to our annual Trojan welcome and party the night away with new and returning students looking forward to seeing their friends again!'
  );

  const handleCreateEvent = () => {
    // In a real app, this would save the event data
    router.push('/tickets');
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
        <Text style={styles.headerTitle}>Create Event</Text>
        <View style={styles.placeholder} />
      </LinearGradient>
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Event Image */}
        <Image 
          source={{ uri: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80' }} 
          style={styles.eventImage}
        />
        
        {/* Event Name */}
        <View style={styles.eventNameContainer}>
          <Text style={styles.eventNameLabel}>Event Name</Text>
          <Text style={styles.eventNameText}>{eventName}</Text>
        </View>
        
        {/* Date and Time */}
        <View style={styles.dateTimeContainer}>
          <View style={styles.dateContainer}>
            <Text style={styles.dateTimeLabel}>Date</Text>
            <View style={styles.dateTimeValueContainer}>
              <Text style={styles.dateTimeValue}>{date}</Text>
              <Calendar size={20} color="#FFD700" />
            </View>
          </View>
          
          <View style={styles.timeContainer}>
            <Text style={styles.dateTimeLabel}>Time</Text>
            <View style={styles.dateTimeValueContainer}>
              <Text style={styles.dateTimeValue}>{time}</Text>
              <Clock size={20} color="#FFD700" />
            </View>
          </View>
        </View>
        
        {/* Event Description */}
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionLabel}>Event Description</Text>
          <Text style={styles.descriptionText}>{description}</Text>
        </View>
        
        {/* Invite People */}
        <View style={styles.inviteContainer}>
          <Text style={styles.inviteLabel}>Invite people</Text>
          <View style={styles.avatarsContainer}>
            <Image 
              source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }} 
              style={styles.avatar}
            />
            <Image 
              source={{ uri: 'https://randomuser.me/api/portraits/women/44.jpg' }} 
              style={styles.avatar}
            />
            <Image 
              source={{ uri: 'https://randomuser.me/api/portraits/men/86.jpg' }} 
              style={styles.avatar}
            />
            <Image 
              source={{ uri: 'https://randomuser.me/api/portraits/women/63.jpg' }} 
              style={styles.avatar}
            />
            <TouchableOpacity style={styles.addAvatarButton}>
              <Plus size={24} color="#B22222" />
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Create Event Button */}
        <TouchableOpacity 
          style={styles.createEventButton}
          onPress={handleCreateEvent}
        >
          <Text style={styles.createEventButtonText}>Create Event</Text>
        </TouchableOpacity>
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
  },
  eventImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  eventNameContainer: {
    padding: 16,
    backgroundColor: 'rgba(178, 34, 34, 0.8)',
  },
  eventNameLabel: {
    fontSize: 14,
    color: '#FFD700',
    marginBottom: 4,
  },
  eventNameText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  dateTimeContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(178, 34, 34, 0.7)',
    padding: 16,
  },
  dateContainer: {
    flex: 1,
    marginRight: 8,
  },
  timeContainer: {
    flex: 1,
    marginLeft: 8,
  },
  dateTimeLabel: {
    fontSize: 14,
    color: '#FFD700',
    marginBottom: 4,
  },
  dateTimeValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    padding: 12,
  },
  dateTimeValue: {
    fontSize: 16,
    color: 'white',
  },
  descriptionContainer: {
    padding: 16,
  },
  descriptionLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#B22222',
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
  inviteContainer: {
    padding: 16,
  },
  inviteLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#B22222',
    marginBottom: 16,
  },
  avatarsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 8,
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  addAvatarButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#B22222',
    borderStyle: 'dashed',
  },
  createEventButton: {
    backgroundColor: '#B22222',
    borderRadius: 8,
    padding: 16,
    margin: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  createEventButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});