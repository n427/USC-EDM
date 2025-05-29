import React, { JSX, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  ScrollView,
  Modal,
  Dimensions,
  TextInput,
  Share,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons, Feather, AntDesign } from '@expo/vector-icons';
import type { ImageSourcePropType } from 'react-native';

const { width, height } = Dimensions.get('window');

// Type Definitions
type Comment = {
  user: string;
  comment: string;
  avatar: ImageSourcePropType;
};

type Post = {
  id: string;
  name: string;
  username: string;
  image: ImageSourcePropType;
  comments: Comment[];
  likes: number;
  timestamp: string;
};

type Story = {
  id: string;
  name: string;
  image: ImageSourcePropType;
};

const stories: Story[] = [
  { id: 'you', name: 'You', image: require('./assets/you.jpg') },
  { id: 'benjamin', name: 'Benjamin', image: require('./assets/benjamin.jpg') },
  { id: 'farita', name: 'Farita', image: require('./assets/farita.jpg') },
  { id: 'marie', name: 'Marie', image: require('./assets/marie.jpg') },
];

const defaultPosts: Post[] = [
  {
    id: '1',
    name: 'Claire Dangais',
    username: '@ClaireD15',
    image: require('./assets/claire.jpg'),
    comments: [],
    likes: 122,
    timestamp: '2h ago',
  },
  {
    id: '2',
    name: 'Farita Smith',
    username: '@SmithFa',
    image: require('./assets/farita.jpg'),
    comments: [],
    likes: 89,
    timestamp: '5h ago',
  },
];

const users = {
  benjamin: { name: 'Benjamin Lee', avatar: require('./assets/benjamin.jpg') },
  farita: { name: 'Farita Smith', avatar: require('./assets/farita.jpg') },
  marie: { name: 'Marie Chen', avatar: require('./assets/marie.jpg') },
};

const defaultComments: { [key: string]: { user: string; comment: string; avatar: ImageSourcePropType }[] } = {
  '1': [
    { user: users.benjamin.name, comment: 'Love the lighting in this shot!', avatar: users.benjamin.avatar },
    { user: users.farita.name, comment: 'Where was this taken? 😍', avatar: users.farita.avatar },
  ],
  '2': [
    { user: users.marie.name, comment: 'This gives me summer vibes!', avatar: users.marie.avatar },
    { user: users.benjamin.name, comment: 'Invite me next time 👌', avatar: users.benjamin.avatar },
  ],
};

export default function HomeScreen(): JSX.Element {
  const [activePost, setActivePost] = useState<string | null>(null);
  const [showStoryViewer, setShowStoryViewer] = useState(false);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [likes, setLikes] = useState<{ [key: string]: boolean }>({});
  const [comments, setComments] = useState<{ [key: string]: Comment[] }>(defaultComments);
  const [commentInputs, setCommentInputs] = useState<{ [key: string]: string }>({});
  const [posts] = useState<Post[]>(defaultPosts);

  const toggleComments = (postId: string) => {
    setActivePost(activePost === postId ? null : postId);
  };

  const openStory = (index: number) => {
    setCurrentStoryIndex(index);
    setShowStoryViewer(true);
  };

  const nextStory = () => {
    if (currentStoryIndex < stories.length - 1) {
      setCurrentStoryIndex(currentStoryIndex + 1);
    } else {
      setShowStoryViewer(false);
    }
  };

  const handleLike = (postId: string) => {
    setLikes((prev) => ({ ...prev, [postId]: !prev[postId] }));
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: 'Check out this post on EDMA:USC!',
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleCommentSend = (postId: string) => {
    if (!commentInputs[postId]) return;
    const newComment: Comment = {
      user: 'You',
      comment: commentInputs[postId],
      avatar: require('./assets/you.jpg'),
    };
    setComments((prev) => ({
      ...prev,
      [postId]: [...(prev[postId] || []), newComment],
    }));
    setCommentInputs((prev) => ({ ...prev, [postId]: '' }));
  };

  const handleDeleteComment = (postId: string, index: number) => {
    setComments((prev) => {
      const updated = [...(prev[postId] || [])];
      updated.splice(index, 1);
      return { ...prev, [postId]: updated };
    });
  };

  const renderPost = ({ item }: { item: Post }) => {
    const isLiked = likes[item.id] || false;
    const allComments = [...item.comments, ...(comments[item.id] || [])];

    return (
      <View style={styles.postContainer}>
        <View style={styles.userRow}>
          <Image source={item.image} style={styles.profilePic} />
          <View>
            <Text style={styles.username}>{item.name}</Text>
            <Text style={styles.handle}>{item.username}</Text>
            <Text style={styles.timestamp}>{item.timestamp}</Text>
          </View>
        </View>
        <Image source={item.image} style={styles.postImage} />
        <View style={styles.interactions}>
          <TouchableOpacity onPress={() => toggleComments(item.id)}>
            <Ionicons
              name={activePost === item.id ? 'chatbubble-ellipses-sharp' : 'chatbubble-ellipses-outline'}
              size={20}
              color={activePost === item.id ? '#FFD700' : '#990000'}
            />
          </TouchableOpacity>
          <Text>{allComments.length}</Text>
          <TouchableOpacity onPress={() => handleLike(item.id)}>
            <Ionicons
              name={isLiked ? 'heart' : 'heart-outline'}
              size={20}
              color={isLiked ? '#FFD700' : '#990000'}
            />
          </TouchableOpacity>
          <Text>{item.likes + (isLiked ? 1 : 0)}</Text>
          <TouchableOpacity onPress={handleShare}>
            <Feather name="send" size={20} color="#990000" />
          </TouchableOpacity>
        </View>
        {activePost === item.id && (
          <View style={styles.commentBox}>
            {allComments.map((c, index) => (
              <View key={index} style={styles.commentRow}>
                <Image source={c.avatar} style={styles.commentAvatar} />
                <Text>
                  <Text style={styles.commentName}>{c.user}: </Text>
                  {c.comment}
                </Text>
                {c.user === 'You' && (
                  <TouchableOpacity onPress={() => handleDeleteComment(item.id, index)}>
                    <Ionicons name="trash" size={16} color="gray" style={{ marginLeft: 8 }} />
                  </TouchableOpacity>
                )}
              </View>
            ))}
            <View style={styles.commentInputRow}>
              <Image source={require('./assets/you.jpg')} style={styles.commentAvatar} />
              <TextInput
                placeholder="Write a comment..."
                value={commentInputs[item.id] || ''}
                onChangeText={(text) =>
                  setCommentInputs((prev) => ({ ...prev, [item.id]: text }))
                }
                style={styles.commentInput}
                placeholderTextColor="#888"
              />
              <TouchableOpacity onPress={() => handleCommentSend(item.id)}>
                <Ionicons name="send" size={15} color="#990000" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="camera" size={24} color="#990000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>EDMA:USC</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity onPress={() => router.push('/shop')}>
            <Feather name="shopping-cart" size={22} color="#990000" />
          </TouchableOpacity>
          <TouchableOpacity>
            <AntDesign name="notification" size={22} color="#990000" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.storyScroll}>
        {stories.map((story, index) => (
          <TouchableOpacity
            key={story.id}
            style={styles.storyContainer}
            onPress={() => openStory(index)}
          >
            <Image source={story.image} style={styles.storyImage} />
            <Text style={styles.storyName}>{story.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <FlatList data={Object.values(posts)} keyExtractor={(item) => item.id} renderItem={renderPost} />

      <Modal visible={showStoryViewer} transparent animationType="fade">
        <TouchableOpacity style={styles.storyModal} onPress={nextStory} activeOpacity={1}>
          <Image source={stories[currentStoryIndex].image} style={styles.fullScreenStory} />
          <View style={styles.storyHeader}>
            <Image source={stories[currentStoryIndex].image} style={styles.storyHeaderAvatar} />
            <Text style={styles.storyHeaderName}>{stories[currentStoryIndex].name}</Text>
          </View>
          <TouchableOpacity style={styles.storyClose} onPress={() => setShowStoryViewer(false)}>
            <Ionicons name="close" size={30} color="#fff" />
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16 },
  headerTitle: { color: '#990000', fontSize: 20, fontWeight: 'bold', marginLeft: 30},
  headerIcons: { flexDirection: 'row', gap: 12 },
  storyScroll: { paddingHorizontal: 10 },
  storyContainer: { alignItems: 'center', marginRight: 12 },
  storyImage: { width: 60, height: 60, borderRadius: 30, borderWidth: 2, borderColor: '#FFD700' },
  storyName: { fontSize: 12, marginTop: 4, marginBottom: 30},
  postContainer: { borderBottomWidth: 1, borderBottomColor: '#ddd', padding: 12 },
  userRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  profilePic: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  username: { fontWeight: 'bold' },
  handle: { color: 'gray', fontSize: 12 },
  postImage: { width: '100%', height: 240, borderRadius: 10, marginVertical: 10 },
  interactions: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 6 },
  commentToggle: { color: '#990000', marginBottom: 6 },
  commentBox: { backgroundColor: '#f2f2f2', padding: 8, borderRadius: 6 },
  commentRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  commentAvatar: { width: 20, height: 20, borderRadius: 10, marginRight: 6 },
  commentName: { fontWeight: '600' },
  commentInputRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  commentInput: { backgroundColor: '#fff', padding: 8, borderRadius: 20, flex: 1, marginRight: 6 },
  storyModal: { flex: 1, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center' },
  fullScreenStory: { width, height, resizeMode: 'cover' },
  storyClose: { position: 'absolute', top: 50, right: 20 },
  storyHeader: { position: 'absolute', top: 50, left: 20, flexDirection: 'row', alignItems: 'center' },
  storyHeaderAvatar: { width: 30, height: 30, borderRadius: 15, marginRight: 8 },
  storyHeaderName: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  timestamp: { color: '#999', fontSize: 10 },
  iconButton: {borderWidth: 1, borderColor: '#990000', borderRadius: 16, padding: 4,},
  
});
