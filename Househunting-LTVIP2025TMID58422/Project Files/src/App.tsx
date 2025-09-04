import React, { useState, useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import Hero from './components/Hero';
import SearchFilters from './components/SearchFilters';
import PropertyCard from './components/PropertyCard';
import PropertyDetails from './components/PropertyDetails';
import AuthModal from './components/AuthModal';
import { Property, SearchFilters as SearchFiltersType } from './types';
import { useProperties } from './hooks/useProperties';

function AppContent() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [showPropertyDetails, setShowPropertyDetails] = useState(false);
  const [showHero, setShowHero] = useState(true);
  const [filters, setFilters] = useState<SearchFiltersType>({
    location: '',
    minPrice: 0,
    maxPrice: 10000,
    bedrooms: 0,
    propertyType: '',
    furnished: false,
    petFriendly: false,
    parking: false
  });

  const { properties, loading, error, fetchProperties } = useProperties();

  const handleSearch = () => {
    setShowHero(false);
    fetchProperties(filters);
    // Scroll to search section
    setTimeout(() => {
      const searchElement = document.getElementById('search-section');
      if (searchElement) {
        searchElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleViewDetails = (property: Property) => {
    setSelectedProperty(property);
    setShowPropertyDetails(true);
  };

  const handleHeroSearchClick = () => {
    setShowHero(false);
    // Scroll to search section
    setTimeout(() => {
      const searchElement = document.getElementById('search-section');
      if (searchElement) {
        searchElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleAddProperty = () => {
    // In a real app, this would open a form to add a new property
    alert('Add Property feature would open here. This requires implementing a property creation form.');
  };

  const resetFilters = () => {
    setFilters({
      location: '',
      minPrice: 0,
      maxPrice: 10000,
      bedrooms: 0,
      propertyType: '',
      furnished: false,
      petFriendly: false,
      parking: false
    });
    setShowHero(true);
    fetchProperties();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        onAuthClick={() => setShowAuthModal(true)} 
        onAddPropertyClick={handleAddProperty}
      />
      
      {showHero && <Hero onSearchClick={handleHeroSearchClick} />}
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div id="search-section">
          <SearchFilters 
            filters={filters}
            onFiltersChange={setFilters}
            onSearch={handleSearch}
          />
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {showHero ? 'Featured Properties' : 'Search Results'}
            <span className="text-gray-500 font-normal ml-2">
              ({properties.length} {properties.length === 1 ? 'property' : 'properties'})
            </span>
          </h2>
          {!showHero && (
            <button
              onClick={resetFilters}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              ← Back to Home
            </button>
          )}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="text-gray-600 mt-4">Loading properties...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <div className="text-red-600 mb-4">
              <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Error loading properties</h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={() => fetchProperties(filters)}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Try again
            </button>
          </div>
        )}

        {/* Properties Grid */}
        {!loading && !error && (
          <>
            {properties.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m0 0h2M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No properties found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your search filters to find more properties.</p>
                <button
                  onClick={resetFilters}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {properties.map((property) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    onViewDetails={handleViewDetails}
                    showOwnerInfo={false}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </main>

      {/* Modals */}
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
      
      <PropertyDetails
        property={selectedProperty}
        isOpen={showPropertyDetails}
        onClose={() => {
          setShowPropertyDetails(false);
          setSelectedProperty(null);
        }}
      />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;