import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Property, SearchFilters } from '../types';

export const useProperties = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProperties = async (filters?: SearchFilters) => {
    try {
      setLoading(true);
      setError(null);

      let query = supabase
        .from('properties')
        .select(`
          *,
          profiles:owner_id (
            name,
            email
          )
        `)
        .eq('available', true);

      // Apply filters
      if (filters) {
        if (filters.location) {
          query = query.or(`city.ilike.%${filters.location}%,state.ilike.%${filters.location}%`);
        }
        if (filters.minPrice > 0) {
          query = query.gte('price', filters.minPrice);
        }
        if (filters.maxPrice < 10000) {
          query = query.lte('price', filters.maxPrice);
        }
        if (filters.bedrooms > 0) {
          query = query.gte('bedrooms', filters.bedrooms);
        }
        if (filters.propertyType) {
          query = query.eq('type', filters.propertyType);
        }
        if (filters.furnished) {
          query = query.eq('furnished', true);
        }
        if (filters.petFriendly) {
          query = query.eq('pet_friendly', true);
        }
        if (filters.parking) {
          query = query.eq('parking', true);
        }
      }

      const { data, error: fetchError } = await query.order('created_at', { ascending: false });

      if (fetchError) throw fetchError;

      // Transform data to match frontend Property interface
      const transformedProperties: Property[] = (data || []).map(item => ({
        id: item.id,
        title: item.title,
        description: item.description,
        type: item.type,
        price: item.price,
        location: {
          address: item.address,
          city: item.city,
          state: item.state,
          zipCode: item.zip_code,
          coordinates: item.latitude && item.longitude ? {
            lat: parseFloat(item.latitude.toString()),
            lng: parseFloat(item.longitude.toString())
          } : undefined
        },
        bedrooms: item.bedrooms,
        bathrooms: item.bathrooms,
        area: item.area,
        amenities: item.amenities || [],
        images: item.images || [],
        ownerId: item.owner_id,
        ownerName: item.profiles?.name || 'Unknown',
        ownerContact: item.profiles?.email || '',
        available: item.available,
        furnished: item.furnished,
        petFriendly: item.pet_friendly,
        parking: item.parking,
        createdAt: item.created_at,
        updatedAt: item.updated_at
      }));

      setProperties(transformedProperties);
    } catch (err: any) {
      setError(err.message);
      console.error('Error fetching properties:', err);
    } finally {
      setLoading(false);
    }
  };

  const createProperty = async (propertyData: Omit<Property, 'id' | 'ownerId' | 'ownerName' | 'ownerContact' | 'createdAt' | 'updatedAt'>) => {
    try {
      const { data, error } = await supabase
        .from('properties')
        .insert({
          title: propertyData.title,
          description: propertyData.description,
          type: propertyData.type,
          price: propertyData.price,
          address: propertyData.location.address,
          city: propertyData.location.city,
          state: propertyData.location.state,
          zip_code: propertyData.location.zipCode,
          latitude: propertyData.location.coordinates?.lat,
          longitude: propertyData.location.coordinates?.lng,
          bedrooms: propertyData.bedrooms,
          bathrooms: propertyData.bathrooms,
          area: propertyData.area,
          amenities: propertyData.amenities,
          images: propertyData.images,
          available: propertyData.available,
          furnished: propertyData.furnished,
          pet_friendly: propertyData.petFriendly,
          parking: propertyData.parking
        })
        .select()
        .single();

      if (error) throw error;
      return { success: true, data };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  const updateProperty = async (id: string, updates: Partial<Property>) => {
    try {
      const { error } = await supabase
        .from('properties')
        .update({
          title: updates.title,
          description: updates.description,
          type: updates.type,
          price: updates.price,
          address: updates.location?.address,
          city: updates.location?.city,
          state: updates.location?.state,
          zip_code: updates.location?.zipCode,
          bedrooms: updates.bedrooms,
          bathrooms: updates.bathrooms,
          area: updates.area,
          amenities: updates.amenities,
          images: updates.images,
          available: updates.available,
          furnished: updates.furnished,
          pet_friendly: updates.petFriendly,
          parking: updates.parking
        })
        .eq('id', id);

      if (error) throw error;
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  const deleteProperty = async (id: string) => {
    try {
      const { error } = await supabase
        .from('properties')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  return {
    properties,
    loading,
    error,
    fetchProperties,
    createProperty,
    updateProperty,
    deleteProperty,
    refetch: fetchProperties
  };
};