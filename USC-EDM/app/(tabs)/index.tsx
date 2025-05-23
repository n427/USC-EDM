import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  Share,
  Pressable,
  Alert,
} from "react-native";
import { Ionicons, FontAwesome, Feather, MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

const stories = [
  { id: "you", name: "You", image: require("./assets/you.jpg") },
  { id: "benjamin", name: "Benjamin", image: require("./assets/benjamin.jpg") },
  { id: "farita", name: "Farita", image: require("./assets/farita.jpg") },
  { id: "marie", name: "Marie", image: require("./assets/marie.jpg") },
];

const initialPosts = [
  {
    id: "1",
    name: "Claire Dangais",
    username: "@ClaireD15",
    image: require("./assets/sunset.jpg"),
    likes: 122,
    comments: 10,
    liked: false,
  },
  {
    id: "2",
    name: "Farita Smith",
    username: "@SmithFa",
    image: require("./assets/streetart.jpg"),
    likes: 98,
    comments: 6,
    liked: false,
  },
];

export default function FeedScreen() {
  const [posts, setPosts] = useState(initialPosts);
  const [selectedPost, setSelectedPost] = useState<null | {id: string; name: string; username: string; image: any; likes: number; comments: number;}>(null);
  const [storyModal, setStoryModal] = useState<null | { id: string; name: string; image: any }>(null);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);

  const toggleLike = (postId: any) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              liked: !post.liked,
              likes: post.liked ? post.likes - 1 : post.likes + 1,
            }
          : post
      )
    );
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: "Check out this post on EDMA!",
      });
    } catch (error: any) {
      alert(error.message);
    }
  };

  const openImagePicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      Alert.alert("Selected Image", JSON.stringify(result.assets[0].uri));
    }
  };

  const takePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      Alert.alert("Captured Image", JSON.stringify(result.assets[0].uri));
    }
  };

  const choosePhotoOption = () => {
    Alert.alert("Select Option", "Choose an action", [
      { text: "Take Photo", onPress: takePhoto },
      { text: "Choose from Library", onPress: openImagePicker },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  const nextStory = () => {
    const nextIndex = (currentStoryIndex + 1) % stories.length;
    setCurrentStoryIndex(nextIndex);
    setStoryModal(stories[nextIndex]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={choosePhotoOption}>
          <Ionicons name="camera" size={24} color="#990000" />
        </TouchableOpacity>
        <Text style={styles.headerText}>EDMA:USC</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity>
            <MaterialIcons name="shopping-cart" size={24} color="#990000" style={{ marginRight: 12 }} />
          </TouchableOpacity>
          <Feather name="bell" size={24} color="#990000" />
        </View>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.storiesContainer}>
        {stories.map((story, index) => (
          <TouchableOpacity
            key={story.id}
            onPress={() => {
              setCurrentStoryIndex(index);
              setStoryModal(story);
            }}
            style={styles.storyItem}
          >
            <Image source={story.image} style={styles.storyImage} />
            <Text style={styles.storyText}>{story.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.postContainer}>
            <View style={styles.postHeader}>
              <Image source={item.image} style={styles.avatar} />
              <View>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.username}>{item.username}</Text>
              </View>
            </View>
            <Image source={item.image} style={styles.postImage} />
            <View style={styles.postActions}>
              <View style={styles.iconsRow}>
                <TouchableOpacity
                  style={styles.iconWithText}
                  onPress={() => setSelectedPost(item)}
                >
                  <FontAwesome name="comment" size={16} color="white" />
                  <Text style={styles.actionText}>{item.comments}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.iconWithText}
                  onPress={() => toggleLike(item.id)}
                >
                  <FontAwesome
                    name="heart"
                    size={16}
                    color={item.liked ? "#990000" : "white"}
                  />
                  <Text style={styles.actionText}>{item.likes}</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.rightIcons}>
                <TouchableOpacity onPress={handleShare}>
                  <Feather name="send" size={16} color="white" style={styles.icon} />
                </TouchableOpacity>
                <Feather name="bookmark" size={16} color="#FFC72C" style={styles.icon} />
              </View>
            </View>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      />

      {/* Comment Modal */}
      <Modal visible={!!selectedPost} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <Pressable style={styles.modalOverlay} onPress={() => setSelectedPost(null)} />
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Comments</Text>
            <Text style={{ color: "gray" }}>So cool!</Text>
            <Text style={{ color: "gray" }}>Let's go again!</Text>
            <Text style={{ color: "gray" }}>Lit af</Text>
            <Text style={{ color: "gray" }}>Invite me next time!</Text>
          </View>
        </View>
      </Modal>

      {/* Story Modal */}
      <Modal visible={!!storyModal} transparent animationType="fade">
        <View style={styles.storyModalContainer}>
          <Pressable style={styles.closeButton} onPress={() => setStoryModal(null)}>
            <Ionicons name="close-circle" size={32} color="white" />
          </Pressable>
          <Image source={storyModal?.image} style={styles.fullStoryImage} />
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#990000",
    marginLeft: 40,
  },
  storiesContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  storyItem: {
    alignItems: "center",
    marginRight: 16,
  },
  storyImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "#FFC72C",
  },
  storyText: {
    marginTop: 6,
    fontSize: 12,
    textAlign: "center",
    color: "#990000",
    marginBottom: 30,
  },
  postContainer: {
    backgroundColor: "white",
    margin: 12,
    borderRadius: 20,
    overflow: "hidden",
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  name: {
    fontWeight: "bold",
    color: "#990000",
  },
  username: {
    color: "gray",
    fontSize: 12,
  },
  postImage: {
    width: "100%",
    height: 250,
  },
  postActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#00000080",
    padding: 10,
  },
  iconsRow: {
    flexDirection: "row",
  },
  iconWithText: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 12,
  },
  actionText: {
    color: "white",
    marginLeft: 4,
    fontSize: 12,
  },
  rightIcons: {
    flexDirection: "row",
  },
  icon: {
    marginLeft: 12,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalOverlay: {
    flex: 1,
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#990000",
  },
  storyModalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.8)",
  },
  fullStoryImage: {
    width: "100%",
    height: "70%",
    borderRadius: 20,
    resizeMode: "cover",
    
  },
  closeButton: {
    position: "absolute",
    top: 150,
    right: 20,
    zIndex: 1,
  },
});
