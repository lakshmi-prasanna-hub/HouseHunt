import React, { useState } from 'react';
import { X, MapPin, Bed, Bath, Square, Car, Dog, Star, Send } from 'lucide-react';
import { Property } from '../types';
import { useAuth } from '../context/AuthContext';
import { useInquiries } from '../hooks/useInquiries';

interface PropertyDetailsProps {
  property: Property | null;
  isOpen: boolean;
  onClose: () => void;
}

const PropertyDetails: React.FC<PropertyDetailsProps> = ({ property, isOpen, onClose }) => {
  const { user, isAuthenticated } = useAuth();
  const { createInquiry } = useInquiries(user?.id);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [inquiryForm, setInquiryForm] = useState({
    message: '',
    phone: user?.phone || ''
  });
  const [inquirySent, setInquirySent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen || !property) return null;

  const handleInquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setSubmitting(true);
    
    const result = await createInquiry({
      propertyId: property.id,
      message: inquiryForm.message,
      phone: inquiryForm.phone
    });

    if (result.success) {
      setInquirySent(true);
      setTimeout(() => {
        setInquirySent(false);
        onClose();
      }, 2000);
    } else {
      alert('Failed to send inquiry. Please try again.');
    }
    
    setSubmitting(false);
  };

  const amenityIcons: { [key: string]: React.ReactNode } = {
    'Air Conditioning': '❄️',
    'Dishwasher': '🍽️',
    'In-unit Laundry': '👕',
    'Balcony': '🏞️',
    'Gym Access': '💪',
    'Backyard': '🌳',
    'Garage': '🚗',
    'Fireplace': '🔥',
    'Modern Kitchen': '🍳',
    'Hardwood Floors': '🪵',
    'High Ceilings': '⬆️',
    'Exposed Brick': '🧱',
    'Natural Light': '☀️',
    'Creative Space': '🎨',
    'City Views': '🏙️',
    'Concierge': '🛎️',
    'Pool': '🏊',
    'Spa': '🧘',
    'Premium Finishes': '✨',
    'Private Elevator': '🛗'
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">{property.title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-2"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          {/* Image Gallery */}
          <div className="mb-6">
            <div className="relative">
              <img
                src={property.images[currentImageIndex]}
                alt={property.title}
                className="w-full h-96 object-cover rounded-lg"
              />
              {property.images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {property.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-3 h-3 rounded-full ${
                        index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
            {property.images.length > 1 && (
              <div className="flex space-x-2 mt-4 overflow-x-auto">
                {property.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${property.title} ${index + 1}`}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-20 h-20 object-cover rounded-lg cursor-pointer ${
                      index === currentImageIndex ? 'ring-2 ring-blue-500' : ''
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Property Info */}
            <div className="lg:col-span-2">
              {/* Price and Status */}
              <div className="flex items-center justify-between mb-4">
                <div className="text-3xl font-bold text-blue-600">
                  ${property.price.toLocaleString()}/month
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  property.available 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {property.available ? 'Available' : 'Rented'}
                </span>
              </div>

              {/* Location */}
              <div className="flex items-center text-gray-600 mb-4">
                <MapPin className="h-5 w-5 mr-2" />
                <span>
                  {property.location.address}, {property.location.city}, {property.location.state} {property.location.zipCode}
                </span>
              </div>

              {/* Property Details */}
              <div className="flex items-center space-x-6 mb-6 text-gray-600">
                <div className="flex items-center space-x-2">
                  <Bed className="h-5 w-5" />
                  <span>{property.bedrooms} Bedrooms</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Bath className="h-5 w-5" />
                  <span>{property.bathrooms} Bathrooms</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Square className="h-5 w-5" />
                  <span>{property.area} sqft</span>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Description</h3>
                <p className="text-gray-600 leading-relaxed">{property.description}</p>
              </div>

              {/* Amenities */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Amenities</h3>
                <div className="grid grid-cols-2 gap-3">
                  {property.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center space-x-2 text-gray-600">
                      <span className="text-lg">{amenityIcons[amenity] || '✓'}</span>
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                {property.furnished && (
                  <div className="bg-blue-50 p-3 rounded-lg text-center">
                    <div className="text-2xl mb-1">🪑</div>
                    <div className="text-sm font-medium text-blue-900">Furnished</div>
                  </div>
                )}
                {property.parking && (
                  <div className="bg-green-50 p-3 rounded-lg text-center">
                    <Car className="h-6 w-6 mx-auto mb-1 text-green-600" />
                    <div className="text-sm font-medium text-green-900">Parking</div>
                  </div>
                )}
                {property.petFriendly && (
                  <div className="bg-orange-50 p-3 rounded-lg text-center">
                    <Dog className="h-6 w-6 mx-auto mb-1 text-orange-600" />
                    <div className="text-sm font-medium text-orange-900">Pet Friendly</div>
                  </div>
                )}
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 p-6 rounded-lg sticky top-32">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Owner</h3>
                
                {/* Owner Info */}
                <div className="mb-4 p-3 bg-white rounded-lg">
                  <p className="font-medium text-gray-900">{property.ownerName}</p>
                  <p className="text-sm text-gray-600">{property.ownerContact}</p>
                </div>

                {isAuthenticated && user?.role === 'renter' ? (
                  <form onSubmit={handleInquiry}>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={inquiryForm.phone}
                        onChange={(e) => setInquiryForm({ ...inquiryForm, phone: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Message
                      </label>
                      <textarea
                        value={inquiryForm.message}
                        onChange={(e) => setInquiryForm({ ...inquiryForm, message: e.target.value })}
                        placeholder="I'm interested in this property..."
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={inquirySent || submitting}
                      className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center space-x-2 disabled:opacity-50"
                    >
                      {inquirySent ? (
                        <>
                          <Star className="h-4 w-4" />
                          <span>Inquiry Sent!</span>
                        </>
                      ) : submitting ? (
                        <span>Sending...</span>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          <span>Send Inquiry</span>
                        </>
                      )}
                    </button>
                  </form>
                ) : (
                  <div className="text-center">
                    <p className="text-gray-600 mb-4">
                      {!isAuthenticated 
                        ? 'Please log in as a renter to contact the owner'
                        : 'Only renters can send inquiries'
                      }
                    </p>
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-800">
                        Email: {property.ownerContact}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;