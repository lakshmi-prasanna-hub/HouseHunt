import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Inquiry } from '../types';

export const useInquiries = (userId?: string) => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchInquiries = async () => {
    if (!userId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('inquiries')
        .select(`
          *,
          properties (
            title,
            price,
            city,
            state
          ),
          profiles:renter_id (
            name,
            email
          )
        `)
        .or(`renter_id.eq.${userId},property_id.in.(${await getOwnerPropertyIds(userId)})`)
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;

      // Transform data to match frontend Inquiry interface
      const transformedInquiries: Inquiry[] = (data || []).map(item => ({
        id: item.id,
        propertyId: item.property_id,
        renterId: item.renter_id,
        renterName: item.profiles?.name || 'Unknown',
        renterEmail: item.profiles?.email || '',
        renterPhone: item.phone,
        message: item.message,
        status: item.status,
        createdAt: item.created_at
      }));

      setInquiries(transformedInquiries);
    } catch (err: any) {
      setError(err.message);
      console.error('Error fetching inquiries:', err);
    } finally {
      setLoading(false);
    }
  };

  const getOwnerPropertyIds = async (ownerId: string): Promise<string> => {
    const { data } = await supabase
      .from('properties')
      .select('id')
      .eq('owner_id', ownerId);
    
    return (data || []).map(p => p.id).join(',') || 'none';
  };

  const createInquiry = async (inquiryData: {
    propertyId: string;
    message: string;
    phone: string;
  }) => {
    try {
      const { data, error } = await supabase
        .from('inquiries')
        .insert({
          property_id: inquiryData.propertyId,
          message: inquiryData.message,
          phone: inquiryData.phone
        })
        .select()
        .single();

      if (error) throw error;
      return { success: true, data };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  const updateInquiryStatus = async (id: string, status: 'pending' | 'approved' | 'rejected' | 'contacted') => {
    try {
      const { error } = await supabase
        .from('inquiries')
        .update({ status })
        .eq('id', id);

      if (error) throw error;
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, [userId]);

  return {
    inquiries,
    loading,
    error,
    createInquiry,
    updateInquiryStatus,
    refetch: fetchInquiries
  };
};