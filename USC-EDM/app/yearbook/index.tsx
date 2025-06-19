// YearbookPage.tsx
import React from 'react';
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
  },
  {
    id: '2',
    name: 'Farita Smith',
    username: '@SmithFa',
    image: require('./assets/farita.jpg'),
    likes: 89,
    timestamp: '5h ago',
  },
];

const YearbookPage = () => {
  const router = useRouter();

  const handleOpenPost = (postId: string) => {
    router.push(`/yearbook/${postId}`);
  };

  const renderPost = ({ item }: any) => (
    <TouchableOpacity onPress={() => handleOpenPost(item.id)} style={styles.postCard}>
      <Image source={item.image} style={styles.postImage} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={USC_COLORS.cardinal} />
        </TouchableOpacity>
        <Text style={styles.header}>Yearbook</Text>
      </View>

      <FlatList
        data={yearbookPosts}
        keyExtractor={(item) => item.id}
        renderItem={renderPost}
        numColumns={3}
        contentContainerStyle={styles.grid}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: USC_COLORS.white,
    padding: 16,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
    marginTop: 8,
    gap: 12,
    paddingHorizontal: 16,
  },
  header: {
    fontSize: 24,
    color: USC_COLORS.cardinal,
    fontWeight: 'bold'
  },
  grid: {
    paddingHorizontal: 16,
    gap: 12
  },
  postCard: {
    flex: 1,
    aspectRatio: 1,
    margin: 4,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: USC_COLORS.cardinal
  },
  postImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
  }
});

export default YearbookPage;
