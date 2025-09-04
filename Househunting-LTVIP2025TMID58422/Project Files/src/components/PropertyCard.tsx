import React from 'react';
import { MapPin, Bed, Bath, Square, Heart, Car, Dog } from 'lucide-react';
import { Property } from '../types';

interface PropertyCardProps {
  property: Property;
  onViewDetails: (property: Property) => void;
  showOwnerInfo?: boolean;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ 
  property, 
  onViewDetails, 
  showOwnerInfo = false 
}) => {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <img
          src={property.images[0]}
          alt={property.title}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            property.available 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {property.available ? 'Available' : 'Rented'}
          </span>
        </div>
        <div className="absolute top-4 right-4">
          <button className="p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
            <Heart className="h-4 w-4 text-gray-600" />
          </button>
        </div>
        <div className="absolute bottom-4 right-4">
          <span className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm font-semibold">
            ${property.price.toLocaleString()}/mo
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="mb-3">
          <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-1">
            {property.title}
          </h3>
          <div className="flex items-center text-gray-600 mb-2">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="text-sm">
              {property.location.city}, {property.location.state}
            </span>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {property.description}
        </p>

        {/* Property Details */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <Bed className="h-4 w-4" />
              <span>{property.bedrooms} bed</span>
            </div>
            <div className="flex items-center space-x-1">
              <Bath className="h-4 w-4" />
              <span>{property.bathrooms} bath</span>
            </div>
            <div className="flex items-center space-x-1">
              <Square className="h-4 w-4" />
              <span>{property.area} sqft</span>
            </div>
          </div>
        </div>

        {/* Amenities Icons */}
        <div className="flex items-center space-x-2 mb-4">
          {property.parking && (
            <div className="flex items-center space-x-1 px-2 py-1 bg-gray-100 rounded-full">
              <Car className="h-3 w-3 text-gray-600" />
              <span className="text-xs text-gray-600">Parking</span>
            </div>
          )}
          {property.petFriendly && (
            <div className="flex items-center space-x-1 px-2 py-1 bg-gray-100 rounded-full">
              <Dog className="h-3 w-3 text-gray-600" />
              <span className="text-xs text-gray-600">Pet Friendly</span>
            </div>
          )}
          {property.furnished && (
            <div className="px-2 py-1 bg-gray-100 rounded-full">
              <span className="text-xs text-gray-600">Furnished</span>
            </div>
          )}
        </div>

        {/* Owner Info */}
        {showOwnerInfo && (
          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">
              Owner: <span className="font-medium text-gray-900">{property.ownerName}</span>
            </p>
          </div>
        )}

        {/* View Details Button */}
        <button
          onClick={() => onViewDetails(property)}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default PropertyCard;