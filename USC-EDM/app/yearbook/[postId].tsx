// /app/yearbook/[postId].tsx
import React, { JSX, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Share,
  ScrollView,
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';

const USC_COLORS = {
  cardinal: '#990000',
  gold: '#FFCC00',
  white: '#FFFFFF',
  black: '#000000'
};

const users = {
  benjamin: { name: 'Benjamin Lee', avatar: require('./assets/benjamin.jpg') },
  farita: { name: 'Farita Smith', avatar: require('./assets/farita.jpg') },
  marie: { name: 'Marie Chen', avatar: require('./assets/marie.jpg') },
};

type Post = {
  id: string;
  name: string;
  username: string;
  image: any;
  likes: number;
  timestamp: string;
  comments: { user: string; comment: string; avatar: any }[];
};

const posts: Record<string, Post> = {
  '1': {
    id: '1',
    name: 'Claire Dangais',
    username: '@ClaireD15',
    image: require('./assets/claire.jpg'),
    likes: 122,
    timestamp: '2h ago',
    comments: [
      { user: users.benjamin.name, comment: 'Love the lighting!', avatar: users.benjamin.avatar },
      { user: users.farita.name, comment: 'Where was this taken? 😍', avatar: users.farita.avatar }
    ]
  },
  '2': {
    id: '2',
    name: 'Farita Smith',
    username: '@SmithFa',
    image: require('./assets/farita.jpg'),
    likes: 89,
    timestamp: '5h ago',
    comments: [
      { user: users.marie.name, comment: 'This gives me summer vibes!', avatar: users.marie.avatar },
      { user: users.benjamin.name, comment: 'Invite me next time 👌', avatar: users.benjamin.avatar }
    ]
  },
  '3': {
    id: '3',
    name: 'Benajamin Lee',
    username: '@BenajminL',
    image: require('./assets/benjamin.jpg'),
    likes: 89,
    timestamp: '1d ago',
    comments: [
      { user: users.farita.name, comment: 'Stop this is so me!!', avatar: users.marie.avatar }
    ]
  }
};

export default function YearbookPostScreen(): JSX.Element {
  const { postId } = useLocalSearchParams();
  const router = useRouter();
  const post = posts[postId as keyof typeof posts] || posts['1'];
  const [likes, setLikes] = useState(false);
  const [commentInput, setCommentInput] = useState('');
  const [comments, setComments] = useState(post.comments);

  const handleLike = () => {
    setLikes(!likes);
  };

  const handleCommentSend = () => {
    if (!commentInput) return;
    const newComment = {
      user: 'You',
      comment: commentInput,
      avatar: require('./assets/you.jpg')
    };
    setComments((prev) => [...prev, newComment]);
    setCommentInput('');
  };

  const handleShare = async () => {
    try {
      await Share.share({ message: 'Check out this memory on EDMA:USC!' });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color={USC_COLORS.cardinal} />
          </TouchableOpacity>
          <Text style={styles.header}>Post</Text>
        </View>

        <View style={styles.userRow}>
          <Image source={post.image} style={styles.profilePic} />
          <View>
            <Text style={styles.username}>{post.name}</Text>
            <Text style={styles.handle}>{post.username}</Text>
            <Text style={styles.timestamp}>{post.timestamp}</Text>
          </View>
        </View>

        <Image source={post.image} style={styles.postImage} />

        <View style={styles.interactions}>
          <TouchableOpacity onPress={handleLike}>
            <Ionicons
              name={likes ? 'heart' : 'heart-outline'}
              size={20}
              color={likes ? USC_COLORS.gold : USC_COLORS.cardinal}
            />
          </TouchableOpacity>
          <Text>{post.likes + (likes ? 1 : 0)}</Text>
          <TouchableOpacity onPress={handleShare}>
            <Feather name="send" size={20} color={USC_COLORS.cardinal} />
          </TouchableOpacity>
        </View>

        <View style={styles.commentBox}>
          {comments.map((c, index) => (
            <View key={index} style={styles.commentRow}>
              <Image source={c.avatar} style={styles.commentAvatar} />
              <Text><Text style={styles.commentName}>{c.user}: </Text>{c.comment}</Text>
            </View>
          ))}
          <View style={styles.commentInputRow}>
            <Image source={require('./assets/you.jpg')} style={styles.commentAvatar} />
            <TextInput
              placeholder="Write a comment..."
              value={commentInput}
              onChangeText={setCommentInput}
              style={styles.commentInput}
              placeholderTextColor="#888"
            />
            <TouchableOpacity onPress={handleCommentSend}>
              <Ionicons name="send" size={15} color={USC_COLORS.cardinal} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: USC_COLORS.white
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 32
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 8,
    gap: 12
  },
  header: {
    fontSize: 24,
    color: USC_COLORS.cardinal,
    fontWeight: 'bold'
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10
  },
  username: {
    fontWeight: 'bold'
  },
  handle: {
    color: 'gray',
    fontSize: 12
  },
  timestamp: {
    color: '#999',
    fontSize: 10
  },
  postImage: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    marginVertical: 10
  },
  interactions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12
  },
  commentBox: {
    backgroundColor: '#f2f2f2',
    padding: 8,
    borderRadius: 6
  },
  commentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6
  },
  commentAvatar: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 6
  },
  commentName: {
    fontWeight: '600'
  },
  commentInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8
  },
  commentInput: {
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 20,
    flex: 1,
    marginRight: 6
  }
});
