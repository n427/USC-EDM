import React from 'react';
import { View, Image, StyleSheet, FlatList, TouchableOpacity, Dimensions } from 'react-native';

const tileSize = Dimensions.get('window').width / 3 - 12;

export default function PostGrid({ posts }: { posts: any[] }) {
  return (
    <FlatList
      data={posts}
      numColumns={3}
      keyExtractor={(_, index) => index.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.tile}>
          <Image source={item} style={styles.image} />
        </TouchableOpacity>
      )}
      contentContainerStyle={styles.grid}
    />
  );
}

const styles = StyleSheet.create({
  grid: { paddingHorizontal: 10 },
  tile: {
    width: tileSize,
    height: tileSize,
    margin: 4,
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: { width: '100%', height: '100%' },
});
