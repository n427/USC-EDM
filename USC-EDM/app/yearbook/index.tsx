import React, { useState, useMemo } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const USC_COLORS = {
  cardinal: '#990000',
  gold: '#FFCC00',
  white: '#FFFFFF',
  black: '#000000'
};

const yearbookPosts = [
  {
    id: '1',
    name: 'Claire Dangais',
    username: '@ClaireD15',
    image: require('./assets/claire.jpg'),
    likes: 122,
    timestamp: '2h ago',
    eventName: 'Welcome Week',
  },
  {
    id: '2',
    name: 'Farita Smith',
    username: '@SmithFa',
    image: require('./assets/farita.jpg'),
    likes: 89,
    timestamp: '5h ago',
    eventName: 'Move-in Day',
  },
  {
    id: '3',
    name: 'Benjamin Lee',
    username: '@BenjaminL',
    image: require('./assets/benjamin.jpg'),
    likes: 112,
    timestamp: '1d ago',
    eventName: 'Welcome Week',
  },
];

const YearbookPage = () => {
  const router = useRouter();
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const eventOptions = useMemo(() => {
    return Array.from(new Set(yearbookPosts.map(p => p.eventName)));
  }, []);

  const filteredPosts = selectedEvent
    ? yearbookPosts.filter(p => p.eventName === selectedEvent)
    : yearbookPosts;

  const handleOpenPost = (postId: string) => {
    router.push(`/yearbook/${postId}`);
  };

  const renderPost = ({ item }: any) => {
    if (item.empty) {
      return <View style={styles.postCardPlaceholder} />;
    }

    return (
      <TouchableOpacity onPress={() => handleOpenPost(item.id)} style={styles.postCard}>
        <Image source={item.image} style={styles.postImage} />
      </TouchableOpacity>
    );
  };


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={USC_COLORS.cardinal} />
        </TouchableOpacity>
        <Text style={styles.header}>Yearbook</Text>
      </View>

      <View style={styles.dropdownWrapper}>
        <TouchableOpacity
          style={styles.dropdownButton}
          onPress={() => setShowDropdown(!showDropdown)}
        >
          <Text style={styles.dropdownText}>
            {selectedEvent ?? 'All Events'}
          </Text>
          <Ionicons
            name={showDropdown ? 'chevron-up' : 'chevron-down'}
            size={18}
            color={USC_COLORS.cardinal}
          />
        </TouchableOpacity>

        {showDropdown && (
          <View style={styles.dropdownMenu}>
            <TouchableOpacity
              onPress={() => {
                setSelectedEvent(null);
                setShowDropdown(false);
              }}
            >
              <Text style={styles.dropdownItem}>All Events</Text>
            </TouchableOpacity>
            {eventOptions.map(event => (
              <TouchableOpacity
                key={event}
                onPress={() => {
                  setSelectedEvent(event);
                  setShowDropdown(false);
                }}
              >
                <Text style={styles.dropdownItem}>{event}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      <FlatList
        data={formatGridData(filteredPosts, 3)}
        keyExtractor={(item) => item.id}
        renderItem={renderPost}
        numColumns={3}
        contentContainerStyle={styles.grid}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: USC_COLORS.white,
    paddingTop: 20,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 16,
    gap: 12,
  },
  header: {
    fontSize: 24,
    color: USC_COLORS.cardinal,
    fontWeight: 'bold'
  },
  dropdownWrapper: {
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  dropdownButton: {
    borderWidth: 1,
    borderColor: USC_COLORS.cardinal,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: USC_COLORS.cardinal,
  },
  dropdownMenu: {
    backgroundColor: '#FAFAFA',
    marginTop: 6,
    borderRadius: 6,
    borderColor: '#DDD',
    borderWidth: 1,
    paddingVertical: 6,
  },
  dropdownItem: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    fontFamily: 'Poppins-Regular',
    color: USC_COLORS.black,
  },
  grid: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  postCard: {
    flex: 1,
    aspectRatio: 1,
    margin: 4,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: USC_COLORS.cardinal,
  },
  postImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  postCardPlaceholder: {
    flex: 1,
    aspectRatio: 1,
    margin: 4,
    backgroundColor: 'transparent',
  },
});

function formatGridData(data: any[], columns: number) {
  const fullRows = Math.floor(data.length / columns);
  const totalItems = fullRows * columns;
  const remainder = data.length % columns;

  if (remainder === 0) return data;

  const padding = Array(columns - remainder).fill({ id: `empty-${Math.random()}`, empty: true });
  return [...data, ...padding];
}

export default YearbookPage;