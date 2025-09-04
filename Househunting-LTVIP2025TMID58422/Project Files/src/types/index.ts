export interface User {
  id: string;
  name: string;
  email: string;
  role: 'renter' | 'owner' | 'admin';
  phone?: string;
  avatar?: string;
  verified: boolean;
  createdAt: string;
}

export interface Property {
  id: string;
  title: string;
  description: string;
  type: 'apartment' | 'house' | 'room' | 'studio';
  price: number;
  location: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  bedrooms: number;
  bathrooms: number;
  area: number;
  amenities: string[];
  images: string[];
  ownerId: string;
  ownerName: string;
  ownerContact: string;
  available: boolean;
  furnished: boolean;
  petFriendly: boolean;
  parking: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Inquiry {
  id: string;
  propertyId: string;
  renterId: string;
  renterName: string;
  renterEmail: string;
  renterPhone: string;
  message: string;
  status: 'pending' | 'approved' | 'rejected' | 'contacted';
  createdAt: string;
}

export interface SearchFilters {
  location: string;
  minPrice: number;
  maxPrice: number;
  bedrooms: number;
  propertyType: string;
  furnished: boolean;
  petFriendly: boolean;
  parking: boolean;
}