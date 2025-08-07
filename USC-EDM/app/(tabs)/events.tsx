// EDMA:USC Events Screen - With Avatars + Toggle Filters
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';


const categories = ['All', 'Techno', 'Academic', 'Social'];

const staffPicks = [
  {
    id: '1',
    title: 'RE/FORM presents AZYR',
    date: '5.9.2025',
    location: 'Location TBA',
    attendees: 91,
    image: require('./assets/azyr.jpg'),
  },
  {
    id: '2',
    title: 'USC Techno Takeover',
    date: '9.23.2025',
    location: 'Greek Row',
    attendees: 80,
    image: require('./assets/techno.jpg'),
  },
];

const upcomingEvents = [
  {
    id: '3',
    title: 'Trojan Taverns Bar Crawl',
    date: '5.7.2025',
    location: 'University Park',
    interest: 30,
    category: 'Social',
    image: require('./assets/barcrawl.jpg'),
  },
  {
    id: '4',
    title: 'Finals Study Session',
    date: '5.14.2025',
    location: 'Leavey Library',
    interest: 15,
    category: 'Academic',
    image: require('./assets/study.jpg'),
  },
  {
    id: '5',
    title: 'Sunset Beats Rooftop',
    date: '6.3.2025',
    location: 'Downtown LA',
    interest: 42,
    category: 'Techno',
    image: require('./assets/sunsetbeats.jpg'),
  },
];

export default function EventsScreen() {
  const [showAll, setShowAll] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filtersVisible, setFiltersVisible] = useState(false);
  const router = useRouter();

  const filteredEvents = selectedCategory === 'All'
    ? upcomingEvents
    : upcomingEvents.filter(e => e.category === selectedCategory);

  return (
    <ScrollView style={styles.container}>
      {/* Search and Filter */}
      <Text style={styles.title}>Discover New Events</Text>
      <View style={styles.searchRow}>
        <Ionicons name="search" size={20} color="gray" style={{ marginRight: 8 }} />
        <TextInput
          placeholder="Keyword Search"
          placeholderTextColor="#999"
          style={styles.searchInput}
        />
        <TouchableOpacity
          style={[styles.filterToggle, filtersVisible && styles.filterToggleActive]}
          onPress={() => setFiltersVisible(!filtersVisible)}
        >
          <Ionicons name="options" size={20} color={filtersVisible ? '#fff' : '#990000'} />
        </TouchableOpacity>
      </View>

      {/* Filters */}
      {filtersVisible && (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[styles.filterChip, selectedCategory === cat && styles.activeChip]}
              onPress={() => setSelectedCategory(cat)}
            >
              <Text style={[styles.filterText, selectedCategory === cat && styles.activeChipText]}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      {/* Staff Picks */}
      <Text style={styles.sectionTitle}>Staff Picks</Text>
      <View style={styles.cardRow}>
        {staffPicks.map((event) => (
          <TouchableOpacity 
            key={event.id} 
            style={styles.eventCard} 
            onPress={() => router.push(`/event/${event.id}`)}
          >
            <Image source={event.image} style={styles.eventImage} />
            <Text style={styles.eventDate}>{event.date}</Text>
            <Text style={styles.eventTitle}>{event.title}</Text>
            <Text style={styles.eventLocation}>{event.location}</Text>
            <View style={styles.tagRow}>
              <Image source={require('./assets/benjamin.jpg')} style={styles.avatarPreview} />
              <Image source={require('./assets/farita.jpg')} style={styles.avatarPreview} />
              <Image source={require('./assets/marie.jpg')} style={styles.avatarPreview} />
              <Text style={styles.interested}>+80</Text>
            </View>
          </TouchableOpacity>
        ))}

      </View>

      {/* Upcoming Events */}
      <View style={styles.upcomingHeader}>
        <Text style={styles.sectionTitle}>Upcoming Events</Text>
        <TouchableOpacity onPress={() => setShowAll(!showAll)}>
          <Text style={styles.seeAll}>see all</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardColumn}>
        {(showAll ? filteredEvents : filteredEvents.slice(0, 2)).map((event) => (
        <TouchableOpacity 
          key={event.id} 
          style={styles.upcomingCard} 
          onPress={() => router.push(`/event/${event.id}`)}
        >
          <Image source={event.image} style={styles.upcomingImage} />
          <View style={styles.upcomingDetails}>
            <Text style={styles.eventDate}>{event.date}</Text>
            <Text style={styles.eventTitle}>{event.title}</Text>
            <Text style={styles.eventLocation}>{event.location}</Text>
            <View style={styles.tagRow}>
              <Image source={require('./assets/benjamin.jpg')} style={styles.avatarPreview} />
              <Image source={require('./assets/farita.jpg')} style={styles.avatarPreview} />
              <Image source={require('./assets/marie.jpg')} style={styles.avatarPreview} />
              <Text style={styles.interested}>+40</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: {color: '#990000', fontWeight: 'bold', fontSize: 50, marginTop: 50, marginBottom: 20},
  container: { flex: 1, backgroundColor: '#ffffffff', paddingHorizontal: 16, paddingTop: 24 },
  searchRow: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingHorizontal: 12,
    marginBottom: 16,
    borderColor: '#F5B50F',
    borderWidth: 1,
    borderRadius: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: '#333',
  
    paddingHorizontal: 5,
    backgroundColor: '#fff',
  },  
  filterToggle: {
    paddingLeft: 8,
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderLeftWidth: 1,
    borderColor: '#ddd',
    marginLeft: 8,
    borderRadius: 6,
    backgroundColor: '#fff',
  },
  filterToggleActive: {
    backgroundColor: '#990000',
  },
  filterScroll: { marginBottom: 16 },
  filterChip: {
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#990000',
  },
  activeChip: {
    backgroundColor: '#FFD700',
    borderColor: '#FFD700',
  },
  filterText: { color: '#990000', fontSize: 13 },
  activeChipText: { color: '#8c0000', fontWeight: 'bold' },
  sectionTitle: { color: '#990000', fontSize: 18, fontWeight: 'bold', marginBottom: 12 },
  cardRow: { flexDirection: 'row', gap: 12, marginBottom: 24 },
  eventCard: {
    backgroundColor: '#FFD700',
    padding: 10,
    borderRadius: 10,
    width: 160,
  },
  eventImage: { width: '100%', height: 80, borderRadius: 6, marginBottom: 6 },
  eventDate: { fontSize: 12, color: '#990000' },
  eventTitle: { fontSize: 14, fontWeight: 'bold', color: '#222' },
  eventLocation: { fontSize: 12, color: '#444' },
  attending: { fontSize: 12, marginTop: 4, color: '#990000' },
  upcomingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  seeAll: { color: '#FFD700', fontSize: 14 },
  cardColumn: { gap: 16, marginBottom: 40 },
  upcomingCard: {
    backgroundColor: '#FFD700',
    borderRadius: 10,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  upcomingImage: { width: 100, height: 100 },
  upcomingDetails: { flex: 1, padding: 10 },
  tagRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 10 },
  avatarPreview: { width: 22, height: 22, borderRadius: 11, borderWidth: 1, borderColor: '#fff' },
  interested: { color: '#990000', fontSize: 12, marginLeft: 6 },
});