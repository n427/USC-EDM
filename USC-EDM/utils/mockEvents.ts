// utils/mockData.ts

export const dummyEvents = [
  {
    id: '1',
    title: 'RE/FORM presents AZYR',
    date: '5.9.2025',
    time: '10:00 AM',
    image: require('../app/(tabs)/assets/azyr.jpg'),
    description: 'AZYR is performing live for the RE/FORM series. Don’t miss it!',
    coordinates: { latitude: 34.0224, longitude: -118.2851 },
    venue: 'Location TBA',
    attendees: [
      { id: '1', image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=800' },
      { id: '2', image: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=800' },
      { id: '5', image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=800' },
      { id: '7', image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=800' }
    ],
    totalGoing: 90
  },
  {
    id: '2',
    title: 'USC Techno Takeover',
    date: '9.23.2025',
    time: '10:00 AM',
    image: require('../app/(tabs)/assets/techno.jpg'),
    description: 'A techno rave through Greek Row.',
    coordinates: { latitude: 34.026, longitude: -118.286 },
    venue: 'Greek Row',
    attendees: [
      { id: '1', image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=800' },
      { id: '2', image: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=800' },
      { id: '5', image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=800' },
      { id: '7', image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=800' }
    ],
    totalGoing: 30
  },
  {
    id: '3',
    title: 'Trojan Taverns Bar Crawl',
    date: '5.7.2025',
    time: '10:00 AM',
    image: require('../app/(tabs)/assets/barcrawl.jpg'),
    description: 'Join us for the annual Trojan bar crawl.',
    coordinates: { latitude: 34.024, longitude: -118.282 },
    venue: 'University Park',
    attendees: [
      { id: '1', image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=800' },
      { id: '2', image: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=800' },
      { id: '5', image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=800' },
      { id: '7', image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=800' }
    ],
    totalGoing: 50
  },
  {
    id: '4',
    title: 'Finals Study Session',
    date: '5.14.2025',
    time: '10:00 AM',
    image: require('../app/(tabs)/assets/study.jpg'),
    description: 'Get ready for finals with group study sessions.',
    coordinates: { latitude: 34.020, longitude: -118.289 },
    venue: 'Leavey Library',
    attendees: [
      { id: '1', image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=800' },
      { id: '2', image: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=800' },
      { id: '5', image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=800' },
      { id: '7', image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=800' }
    ],
    totalGoing: 15
  },
  {
    id: '5',
    title: 'Sunset Beats Rooftop',
    date: '6.3.2025',
    time: '10:00 AM',
    image: require('../app/(tabs)/assets/sunsetbeats.jpg'),
    description: 'Enjoy sunset techno beats on the rooftop.',
    coordinates: { latitude: 34.050, longitude: -118.250 },
    venue: 'Downtown LA',
    attendees: [
      { id: '1', image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=800' },
      { id: '2', image: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=800' },
      { id: '5', image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=800' },
      { id: '7', image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=800' }
    ],
    totalGoing: 10
  },
];

export const getEventById = (id: string) => {
  return dummyEvents.find((event) => event.id === id);
};
