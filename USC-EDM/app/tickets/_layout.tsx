import React from 'react';
import { Stack } from 'expo-router';
import { SafeAreaView, Platform, View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { usePathname, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function TicketsLayout() {
  const router = useRouter();
  const pathname = usePathname();
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Tickets</Text>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, pathname === '/tickets/my-tickets' && styles.activeTab]}
          onPress={() => router.push('/tickets/my-tickets')}
        >
          <Text style={[styles.tabText, pathname === '/tickets/my-tickets' && styles.activeTabText]}>My Tickets</Text>
          {pathname === '/tickets/my-tickets' && <View style={styles.activeIndicator} />}
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, pathname === '/tickets/all-tickets' && styles.activeTab]}
          onPress={() => router.push('/tickets/all-tickets')}
        >
          <Text style={[styles.tabText, pathname === '/tickets/all-tickets' && styles.activeTabText]}>All Tickets</Text>
          {pathname === '/tickets/all-tickets' && <View style={styles.activeIndicator} />}
        </TouchableOpacity>
      </View>

      <Stack 
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#1A1A1A' }
        }}
      />
      <StatusBar style="light" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 10 : 40,
    paddingBottom: 10,
    backgroundColor: '#1A1A1A',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'Poppins-Bold',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#1A1A1A',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  tab: {
    paddingVertical: 15,
    marginRight: 20,
    position: 'relative',
  },
  activeTab: {
    borderBottomColor: '#B81D24',
  },
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
    color: 'white',
    fontFamily: 'Poppins-SemiBold',
  },
});