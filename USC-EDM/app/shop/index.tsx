import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Modal,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';


// Type definition to fix "never" errors
type Item = {
  id: string;
  name: string;
  points: number;
  image: any;
  category: 'merch' | 'tickets' | 'misc';
};

export const options = {
  headerShown: false
};

const dummyItems: Item[] = [
  { id: '1', name: 'Techno Hat', points: 25, image: require('./assets/hat.png'), category: 'merch' },
  { id: '4', name: 'EDMA T-shirt', points: 30, image: require('./assets/shirt.png'), category: 'merch' },
  { id: '2', name: 'Event Ticket', points: 50, image: require('./assets/ticket.jpg'), category: 'tickets' },
  { id: '6', name: 'Backstage Pass', points: 100, image: require('./assets/pass.jpg'), category: 'tickets' },
  { id: '3', name: 'EDMA Sticker Pack', points: 10, image: require('./assets/stickers.png'), category: 'misc' },
  { id: '5', name: 'Glow Sticks', points: 5, image: require('./assets/glow.jpg'), category: 'misc' },
];

export default function ShopScreen() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [filterVisible, setFilterVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [modalItem, setModalItem] = useState<Item | null>(null);
  const [pointBalance] = useState(120);

  const categories = ['merch', 'tickets', 'misc'];

  const filtered = dummyItems.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = !activeFilter || item.category === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const groupedItems = categories.map((category) => ({
    title: category,
    data: filtered.filter((item) => item.category === category),
  })).filter((group) => group.data.length > 0);

  const renderItemCard = (item: Item) => (
    <TouchableOpacity style={styles.itemCard} onPress={() => setModalItem(item)}>
      <Image source={item.image} style={styles.itemImage} />
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemPoints}>{item.points} pts</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Redeem Points</Text>
      <View style={styles.balanceRow}>
        <Ionicons name="wallet" size={16} color="#FFD700" style={{ marginRight: 6 }} />
        <Text style={styles.balanceText}>Points: {pointBalance}</Text>
      </View>

      <View style={styles.searchRow}>
        <Ionicons name="search" size={18} color="#999" style={{ marginRight: 6 }} />
        <TextInput
          placeholder="Search shop..."
          value={search}
          onChangeText={setSearch}
          placeholderTextColor="#999"
          style={styles.searchBar}
        />
        <TouchableOpacity
          style={[styles.filterButton, filterVisible && styles.filterButtonActive]}
          onPress={() => setFilterVisible((prev) => !prev)}
        >
          <Ionicons name="options-outline" size={18} color={filterVisible ? '#fff' : '#990000'} />
        </TouchableOpacity>
      </View>

      {filterVisible && (
        <View style={styles.filterRow}>
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[styles.filterTag, activeFilter === cat && styles.activeTag]}
              onPress={() => setActiveFilter(activeFilter === cat ? null : cat)}
            >
              <Text style={[styles.filterText, activeFilter === cat && styles.activeFilterText]}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {groupedItems.map((group) => (
        <View key={group.title} style={{ marginBottom: 20 }}>
          <Text style={styles.sectionTitle}>{group.title.toUpperCase()}</Text>
          <FlatList
            data={group.data}
            horizontal
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => renderItemCard(item)}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingLeft: 10 }}
          />
        </View>
      ))}

      <Modal visible={!!modalItem} transparent animationType="fade">
        <TouchableOpacity style={styles.modalOverlay} onPress={() => setModalItem(null)}>
          {modalItem && (
            <View style={styles.modalContent}>
              <Image source={modalItem.image} style={styles.modalImage} />
              <Text style={styles.modalTitle}>{modalItem.name}</Text>
              <Text style={styles.modalPoints}>{modalItem.points} points</Text>
              <TouchableOpacity style={styles.modalButton}>
                <Text style={styles.modalButtonText}>Redeem</Text>
              </TouchableOpacity>
            </View>
          )}
        </TouchableOpacity>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: {color: '#FFD700', fontWeight: 'bold', fontSize: 50, marginTop: 10, marginBottom: 5},
  container: { flex: 1, backgroundColor: '#8c0000', paddingHorizontal: 16, paddingTop: 24 },
  backButton: { marginTop: 10, marginBottom: 4, alignSelf: 'flex-start' },
  balanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 6,
  },
  balanceText: { color: '#FFD700', fontWeight: 'bold' },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  searchBar: { flex: 1, fontSize: 14, color: '#000' },
  filterButton: {
    padding: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#990000',
    marginLeft: 8,
    backgroundColor: '#fff',
  },
  filterButtonActive: { backgroundColor: '#990000' },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
    gap: 12,
  },
  filterTag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#eee',
    borderRadius: 16,
  },
  activeTag: { backgroundColor: '#FFD700' },
  filterText: { color: '#000', fontSize: 12 },
  activeFilterText: { fontWeight: 'bold' },
  sectionTitle: {
    color: '#FFD700',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 6,
    textTransform: 'uppercase',
  },
  itemCard: {
    width: 140,
    alignItems: 'center',
    marginRight: 12,
    backgroundColor: '#FFDE59',
    padding: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#FFD700',
  },
  itemImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    marginBottom: 8,
    borderRadius: 10,
  },
  itemName: {
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 2,
    color: '#000',
  },
  itemPoints: {
    fontSize: 12,
    color: '#990000',
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: 260,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  modalImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    marginBottom: 12,
  },
  modalTitle: { fontWeight: 'bold', fontSize: 16, marginBottom: 4 },
  modalPoints: { color: '#990000', marginBottom: 12 },
  modalButton: {
    backgroundColor: '#990000',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  modalButtonText: { color: '#fff', fontWeight: 'bold' },
});