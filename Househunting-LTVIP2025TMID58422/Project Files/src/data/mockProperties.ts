import { Property } from '../types';

export const mockProperties: Property[] = [
  {
    id: '1',
    title: 'Modern Downtown Apartment',
    description: 'Beautiful 2-bedroom apartment in the heart of downtown with stunning city views, modern amenities, and walking distance to restaurants and shopping.',
    type: 'apartment',
    price: 2500,
    location: {
      address: '123 Main Street',
      city: 'New York',
      state: 'NY',
      zipCode: '10001'
    },
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    amenities: ['Air Conditioning', 'Dishwasher', 'In-unit Laundry', 'Balcony', 'Gym Access'],
    images: [
      'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    ownerId: '2',
    ownerName: 'Bob Smith',
    ownerContact: 'bob@example.com',
    available: true,
    furnished: true,
    petFriendly: false,
    parking: true,
    createdAt: '2024-01-20T10:00:00Z',
    updatedAt: '2024-01-20T10:00:00Z'
  },
  {
    id: '2',
    title: 'Cozy Family House',
    description: 'Spacious 3-bedroom house perfect for families, featuring a large backyard, modern kitchen, and quiet neighborhood setting.',
    type: 'house',
    price: 3200,
    location: {
      address: '456 Oak Avenue',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90210'
    },
    bedrooms: 3,
    bathrooms: 2,
    area: 1800,
    amenities: ['Backyard', 'Garage', 'Fireplace', 'Modern Kitchen', 'Hardwood Floors'],
    images: [
      'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    ownerId: '2',
    ownerName: 'Bob Smith',
    ownerContact: 'bob@example.com',
    available: true,
    furnished: false,
    petFriendly: true,
    parking: true,
    createdAt: '2024-01-18T10:00:00Z',
    updatedAt: '2024-01-18T10:00:00Z'
  },
  {
    id: '3',
    title: 'Studio Loft in Arts District',
    description: 'Trendy studio loft in the vibrant arts district with exposed brick walls, high ceilings, and creative community atmosphere.',
    type: 'studio',
    price: 1800,
    location: {
      address: '789 Art Street',
      city: 'Chicago',
      state: 'IL',
      zipCode: '60601'
    },
    bedrooms: 1,
    bathrooms: 1,
    area: 800,
    amenities: ['High Ceilings', 'Exposed Brick', 'Natural Light', 'Creative Space'],
    images: [
      'https://images.pexels.com/photos/1428348/pexels-photo-1428348.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    ownerId: '2',
    ownerName: 'Bob Smith',
    ownerContact: 'bob@example.com',
    available: true,
    furnished: true,
    petFriendly: false,
    parking: false,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '4',
    title: 'Luxury Penthouse',
    description: 'Exceptional penthouse with panoramic city views, premium finishes, and access to exclusive building amenities.',
    type: 'apartment',
    price: 5500,
    location: {
      address: '101 Skyline Drive',
      city: 'Miami',
      state: 'FL',
      zipCode: '33101'
    },
    bedrooms: 3,
    bathrooms: 3,
    area: 2200,
    amenities: ['City Views', 'Concierge', 'Pool', 'Spa', 'Premium Finishes', 'Private Elevator'],
    images: [
      'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    ownerId: '2',
    ownerName: 'Bob Smith',
    ownerContact: 'bob@example.com',
    available: true,
    furnished: true,
    petFriendly: true,
    parking: true,
    createdAt: '2024-01-12T10:00:00Z',
    updatedAt: '2024-01-12T10:00:00Z'
  },
  {
    id: '5',
    title: 'Charming Garden Apartment',
    description: 'Ground floor apartment with private garden access, perfect for those who love outdoor space and natural light.',
    type: 'apartment',
    price: 2100,
    location: {
      address: '234 Garden Lane',
      city: 'Portland',
      state: 'OR',
      zipCode: '97201'
    },
    bedrooms: 2,
    bathrooms: 1,
    area: 1000,
    amenities: ['Private Garden', 'Natural Light', 'Updated Kitchen', 'Storage Space'],
    images: [
      'https://images.pexels.com/photos/1571470/pexels-photo-1571470.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1428348/pexels-photo-1428348.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    ownerId: '2',
    ownerName: 'Bob Smith',
    ownerContact: 'bob@example.com',
    available: false,
    furnished: false,
    petFriendly: true,
    parking: true,
    createdAt: '2024-01-10T10:00:00Z',
    updatedAt: '2024-01-10T10:00:00Z'
  },
  {
    id: '6',
    title: 'Executive Single Room',
    description: 'Professional single room in shared house, perfect for young professionals with all utilities included and common area access.',
    type: 'room',
    price: 950,
    location: {
      address: '567 Professional Plaza',
      city: 'Austin',
      state: 'TX',
      zipCode: '78701'
    },
    bedrooms: 1,
    bathrooms: 1,
    area: 400,
    amenities: ['Shared Kitchen', 'WiFi Included', 'Utilities Included', 'Professional Environment'],
    images: [
      'https://images.pexels.com/photos/1454804/pexels-photo-1454804.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    ownerId: '2',
    ownerName: 'Bob Smith',
    ownerContact: 'bob@example.com',
    available: true,
    furnished: true,
    petFriendly: false,
    parking: false,
    createdAt: '2024-01-08T10:00:00Z',
    updatedAt: '2024-01-08T10:00:00Z'
  }
];