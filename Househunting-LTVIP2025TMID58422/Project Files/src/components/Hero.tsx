import React from 'react';
import { Search, Home, Users, Shield } from 'lucide-react';

interface HeroProps {
  onSearchClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onSearchClick }) => {
  return (
    <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-black opacity-20"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-transparent"></div>
      
      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6">
              Find Your Perfect
              <span className="block text-yellow-300">Rental Home</span>
            </h1>
            <p className="text-xl lg:text-2xl text-blue-100 mb-8 leading-relaxed">
              Discover thousands of verified rental properties from trusted owners. 
              Your dream home is just a search away.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button 
                onClick={onSearchClick}
                className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-semibold px-8 py-4 rounded-lg transition-colors flex items-center justify-center space-x-2 shadow-lg"
              >
                <Search className="h-5 w-5" />
                <span>Start Searching</span>
              </button>
              <button className="border-2 border-white hover:bg-white hover:text-blue-900 font-semibold px-8 py-4 rounded-lg transition-colors">
                Learn More
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-300">10K+</div>
                <div className="text-blue-100">Properties</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-300">5K+</div>
                <div className="text-blue-100">Happy Tenants</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-300">500+</div>
                <div className="text-blue-100">Verified Owners</div>
              </div>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="relative">
              <img 
                src="https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800" 
                alt="Beautiful home" 
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white text-gray-900 p-6 rounded-xl shadow-xl max-w-xs">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Home className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <div className="font-semibold">Property Verified</div>
                    <div className="text-sm text-gray-600">Trusted & Safe</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Bar */}
      <div className="relative bg-white/10 backdrop-blur-sm border-t border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
                <Search className="h-6 w-6 text-blue-900" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Easy Search</h3>
                <p className="text-blue-100">Advanced filters to find exactly what you need</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-900" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Verified Owners</h3>
                <p className="text-blue-100">All property owners are verified for your safety</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
                <Shield className="h-6 w-6 text-blue-900" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Secure Platform</h3>
                <p className="text-blue-100">Safe and secure rental process</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;