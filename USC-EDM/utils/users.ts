type UserProfile = {
  username: string;
  name: string;
  avatar: any;
  bio: string;
  classYear: number;
  followers: number;
  following: number;
  posts: any[];
  events: string[];
  tickets: string[];
  isCurrentUser: boolean;
};

const mockUsers: Record<string, UserProfile> = {
  claired15: {
    username: 'claired15',
    name: 'Claire Dangais',
    avatar: require('../app/(tabs)/assets/claire.jpg'),
    bio: 'Dancing to techno in the rain.',
    classYear: 2029,
    followers: 1043,
    following: 342,
    posts: [
      require('../app/(tabs)/assets/azyr.jpg'),
      require('../app/(tabs)/assets/barcrawl.jpg'),
      require('../app/(tabs)/assets/sunset.jpg'),
    ],
    events: ['Welcome Week', 'Techno Night', 'Bar Crawl'],
    tickets: ['EDM Underground Pass', 'Sunset Beats Entry'],
    isCurrentUser: false,
  },
  me: {
    username: 'me',
    name: 'You',
    avatar: require('../app/(tabs)/assets/you.jpg'),
    bio: 'Just me being me.',
    classYear: 2029,
    followers: 800,
    following: 300,
    posts: [require('../app/(tabs)/assets/sunset.jpg')],
    events: ['First Friday'],
    tickets: ['Move-In Pass'],
    isCurrentUser: true,
  },
};

export const getUserByUsername = (username: string): UserProfile | null => {
  return mockUsers[username.toLowerCase()] ?? null;
};
