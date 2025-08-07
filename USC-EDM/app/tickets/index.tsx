import React, { useState, useRef, useEffect } from 'react';
import { SafeAreaView, Platform, View, Text, StyleSheet, TouchableOpacity, Animated, FlatList } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import dayjs from 'dayjs';
import EventCard from '@/components/EventCard';
import { allEvents, myTickets } from '@/utils/mockData';

export default function TicketsScreen() {
  const [selectedTab, setSelectedTab] = useState<'my' | 'all'>('my');
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const upcomingTickets = myTickets.filter(ticket => dayjs(ticket.date).isAfter(dayjs()));

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [selectedTab]);

  const renderList = (data: any[], isMine: boolean) => {
    if (data.length === 0) {
      return <Text style={styles.empty}>No upcoming tickets.</Text>;
    }

    return (
      <Animated.View style={{ opacity: fadeAnim, flex: 1 }}>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <Animated.View
              style={{
                opacity: fadeAnim,
                transform: [
                  {
                    translateY: fadeAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [20 * (index + 1), 0],
                    }),
                  },
                ],
              }}
            >
              <EventCard event={item} isMine={isMine} />
            </Animated.View>
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Tickets</Text>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'my' && styles.activeTab]}
          onPress={() => setSelectedTab('my')}
        >
          <Text style={[styles.tabText, selectedTab === 'my' && styles.activeTabText]}>My Tickets</Text>
          {selectedTab === 'my' && <View style={styles.activeIndicator} />}
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, selectedTab === 'all' && styles.activeTab]}
          onPress={() => setSelectedTab('all')}
        >
          <Text style={[styles.tabText, selectedTab === 'all' && styles.activeTabText]}>All Tickets</Text>
          {selectedTab === 'all' && <View style={styles.activeIndicator} />}
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {selectedTab === 'my'
          ? renderList(upcomingTickets, true)
          : renderList(allEvents, false)}
      </View>

      <StatusBar style="dark" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 10 : 40,
    paddingBottom: 10,
    backgroundColor: '#FFFFFF',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#B81D24', // USC red
    fontFamily: 'Poppins-Bold',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  tab: {
    paddingVertical: 15,
    marginRight: 20,
    position: 'relative',
  },
  activeTab: {},
  activeIndicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: '#B81D24',
    borderRadius: 3,
  },
  tabText: {
    fontSize: 16,
    color: '#999999',
    fontFamily: 'Poppins-Medium',
  },
  activeTabText: {
    color: '#B81D24',
    fontFamily: 'Poppins-SemiBold',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  listContent: {
    paddingBottom: 20,
  },
  empty: {
    color: '#999999',
    textAlign: 'center',
    fontSize: 16,
    marginTop: 40,
    fontFamily: 'Poppins-Regular',
  },
});
