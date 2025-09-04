export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          name: string;
          email: string;
          role: 'renter' | 'owner' | 'admin';
          phone: string | null;
          avatar_url: string | null;
          verified: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          name: string;
          email: string;
          role?: 'renter' | 'owner' | 'admin';
          phone?: string | null;
          avatar_url?: string | null;
          verified?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          role?: 'renter' | 'owner' | 'admin';
          phone?: string | null;
          avatar_url?: string | null;
          verified?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      properties: {
        Row: {
          id: string;
          title: string;
          description: string;
          type: 'apartment' | 'house' | 'room' | 'studio';
          price: number;
          address: string;
          city: string;
          state: string;
          zip_code: string;
          latitude: number | null;
          longitude: number | null;
          bedrooms: number;
          bathrooms: number;
          area: number;
          amenities: string[];
          images: string[];
          owner_id: string;
          available: boolean;
          furnished: boolean;
          pet_friendly: boolean;
          parking: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          type: 'apartment' | 'house' | 'room' | 'studio';
          price: number;
          address: string;
          city: string;
          state: string;
          zip_code: string;
          latitude?: number | null;
          longitude?: number | null;
          bedrooms: number;
          bathrooms: number;
          area: number;
          amenities?: string[];
          images?: string[];
          owner_id: string;
          available?: boolean;
          furnished?: boolean;
          pet_friendly?: boolean;
          parking?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          type?: 'apartment' | 'house' | 'room' | 'studio';
          price?: number;
          address?: string;
          city?: string;
          state?: string;
          zip_code?: string;
          latitude?: number | null;
          longitude?: number | null;
          bedrooms?: number;
          bathrooms?: number;
          area?: number;
          amenities?: string[];
          images?: string[];
          owner_id?: string;
          available?: boolean;
          furnished?: boolean;
          pet_friendly?: boolean;
          parking?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      inquiries: {
        Row: {
          id: string;
          property_id: string;
          renter_id: string;
          message: string;
          phone: string;
          status: 'pending' | 'approved' | 'rejected' | 'contacted';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          property_id: string;
          renter_id: string;
          message: string;
          phone: string;
          status?: 'pending' | 'approved' | 'rejected' | 'contacted';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          property_id?: string;
          renter_id?: string;
          message?: string;
          phone?: string;
          status?: 'pending' | 'approved' | 'rejected' | 'contacted';
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      user_role: 'renter' | 'owner' | 'admin';
      property_type: 'apartment' | 'house' | 'room' | 'studio';
      inquiry_status: 'pending' | 'approved' | 'rejected' | 'contacted';
    };
  };
}