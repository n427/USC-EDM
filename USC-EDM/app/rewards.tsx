import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Linking, Platform, ScrollView, Image } from 'react-native';
import { Link } from 'expo-router';
import { ChevronLeft, Share2 } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';

export default function RewardsScreen() {
  const openMessagesApp = () => {
    const message = "I’d like to add you to my guest list for an event. Use my referral link to join us";
    // Set up 3rd party referral managment, include that in message when done
    if (Platform.OS === 'ios') {
      Linking.openURL(`sms:&body=${encodeURIComponent(message)}`);
    } else if (Platform.OS === 'android') {
      Linking.openURL(`sms:?body=${encodeURIComponent(message)}`);
    } else {
      // Web fallback
      alert("Message sharing is not available on this platform");
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={styles.header}>
        <Link href="/" asChild>
          <TouchableOpacity style={styles.backButton}>
            <ChevronLeft size={24} color="#B22222" />
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>
        </Link>
        <Text style={styles.headerTitle}>Rewards</Text>
        <View style={styles.placeholder} />
      </View>
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Red Banner */}
        <LinearGradient
          colors={['#B22222', '#8B0000']}
          style={styles.banner}
        >
          <Text style={styles.bannerText}>Total Completed Referrals: 12/15</Text>
          
          <Text style={styles.referTitle}>Refer a Friend</Text>
          
          <Text style={styles.referSubtitle}>
            Earn a FREE Guest List Spot for{'\n'}
            every 10 successful Referrals
          </Text>
          
          {/* Free Event Button */}
          <TouchableOpacity 
            style={styles.freeEventButton}
            onPress={openMessagesApp}
          >
            <Text style={styles.freeEventText}>You have 1 FREE event remaining!</Text>
            <Share2 size={20} color="#666" />
          </TouchableOpacity>
          
          {/* Progress Bar */}
          <View style={styles.progressBarContainer}>
            <View style={styles.progressBarBackground}>
              <View style={[styles.progressBar, { width: '80%' }]} />
            </View>
            <Text style={styles.progressText}>80%</Text>
          </View>
        </LinearGradient>
        
        {/* How It Works Section */}
        <View style={styles.howItWorksContainer}>
          <Text style={styles.howItWorksTitle}>How Your Guest List Works</Text>
          
          {/* Step 1 */}
          <View style={styles.stepContainer}>
            <View style={styles.stepIconContainer}>
              <View style={styles.stepIcon}>
                <Text style={styles.iconText}>🔗</Text>
              </View>
              <View style={styles.stepLine} />
            </View>
            
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Invite Your Friends</Text>
              <Text style={styles.stepDescription}>
                Share your referral link with 10 friends. They must register to EDMA:USC as official members on EngageSC and download the app.
              </Text>
            </View>
          </View>
          
          {/* Step 2 */}
          <View style={styles.stepContainer}>
            <View style={styles.stepIconContainer}>
              <View style={styles.stepIcon}>
                <Text style={styles.iconText}>👥</Text>
              </View>
              <View style={styles.stepLine} />
            </View>
            
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Add Friends To Your Guest List</Text>
              <Text style={styles.stepDescription}>
                Use the app to find EDMA:USC members attending the same event and build your party crew.
              </Text>
            </View>
          </View>
          
          {/* Step 3 */}
          <View style={styles.stepContainer}>
            <View style={styles.stepIconContainer}>
              <View style={styles.stepIcon}>
                <Text style={styles.iconText}>🎟️</Text>
              </View>
              <View style={styles.stepLine} />
            </View>
            
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Lock In Your Spot</Text>
              <Text style={styles.stepDescription}>
                Earn one FREE guest list admission to an event for every 10 confirmed referrals. No cover, no hassle. Sold out events count as blackout dates and you can redeem your Guest List Spot at another event.
              </Text>
            </View>
          </View>
          
          {/* Bonus */}
          <View style={styles.stepContainer}>
            <View style={styles.stepIconContainer}>
              <View style={styles.stepIcon}>
                <Text style={styles.iconText}>🎫</Text>
              </View>
            </View>
            
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>BONUS</Text>
              <Text style={styles.stepDescription}>
                If all 10 members on your Guest List arrive together and attend the event, you'll receive a free drink ticket - and your entire group gets FREE admission. Unity has its perks.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backText: {
    fontSize: 16,
    color: '#B22222',
    fontWeight: '500',
    marginLeft: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  placeholder: {
    width: 60,
  },
  banner: {
    padding: 20,
    paddingBottom: 30,
  },
  bannerText: {
    color: '#FFD700',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 10,
  },
  referTitle: {
    color: '#FFD700',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  referSubtitle: {
    color: '#FFD700',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 24,
  },
  freeEventButton: {
    backgroundColor: 'white',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  freeEventText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  progressBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBarBackground: {
    flex: 1,
    height: 12,
    backgroundColor: '#666',
    borderRadius: 6,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#FFD700',
  },
  progressText: {
    marginLeft: 10,
    color: '#FFD700',
    fontWeight: 'bold',
    fontSize: 16,
  },
  howItWorksContainer: {
    padding: 20,
  },
  howItWorksTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  stepContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  stepIconContainer: {
    alignItems: 'center',
    marginRight: 15,
    width: 50,
  },
  stepIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#B22222',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  iconText: {
    fontSize: 24,
  },
  stepLine: {
    width: 2,
    flex: 1,
    backgroundColor: '#ddd',
    marginVertical: 5,
    borderStyle: 'dotted',
    borderWidth: 1,
    borderColor: '#999',
    height: '100%',
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  stepDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});
