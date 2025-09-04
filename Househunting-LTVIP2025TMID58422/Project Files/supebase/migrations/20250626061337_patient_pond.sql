/*
  # Seed Sample Data for HouseHunt

  This migration adds sample data for testing and demonstration purposes.
  
  1. Sample Properties
    - Various property types across different cities
    - Different price ranges and amenities
    - Realistic property data for testing filters
*/

-- Insert sample properties (these will be owned by the first user who signs up)
-- Note: owner_id will need to be updated with actual user IDs after signup

INSERT INTO properties (
  title, description, type, price, address, city, state, zip_code,
  bedrooms, bathrooms, area, amenities, images, owner_id,
  available, furnished, pet_friendly, parking
) VALUES 
(
  'Modern Downtown Apartment',
  'Beautiful 2-bedroom apartment in the heart of downtown with stunning city views, modern amenities, and walking distance to restaurants and shopping.',
  'apartment',
  2500,
  '123 Main Street',
  'New York',
  'NY',
  '10001',
  2,
  2,
  1200,
  ARRAY['Air Conditioning', 'Dishwasher', 'In-unit Laundry', 'Balcony', 'Gym Access'],
  ARRAY[
    'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800'
  ],
  '00000000-0000-0000-0000-000000000000', -- Placeholder, will be updated
  true,
  true,
  false,
  true
),
(
  'Cozy Family House',
  'Spacious 3-bedroom house perfect for families, featuring a large backyard, modern kitchen, and quiet neighborhood setting.',
  'house',
  3200,
  '456 Oak Avenue',
  'Los Angeles',
  'CA',
  '90210',
  3,
  2,
  1800,
  ARRAY['Backyard', 'Garage', 'Fireplace', 'Modern Kitchen', 'Hardwood Floors'],
  ARRAY[
    'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=800'
  ],
  '00000000-0000-0000-0000-000000000000',
  true,
  false,
  true,
  true
),
(
  'Studio Loft in Arts District',
  'Trendy studio loft in the vibrant arts district with exposed brick walls, high ceilings, and creative community atmosphere.',
  'studio',
  1800,
  '789 Art Street',
  'Chicago',
  'IL',
  '60601',
  1,
  1,
  800,
  ARRAY['High Ceilings', 'Exposed Brick', 'Natural Light', 'Creative Space'],
  ARRAY[
    'https://images.pexels.com/photos/1428348/pexels-photo-1428348.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=800'
  ],
  '00000000-0000-0000-0000-000000000000',
  true,
  true,
  false,
  false
),
(
  'Luxury Penthouse',
  'Exceptional penthouse with panoramic city views, premium finishes, and access to exclusive building amenities.',
  'apartment',
  5500,
  '101 Skyline Drive',
  'Miami',
  'FL',
  '33101',
  3,
  3,
  2200,
  ARRAY['City Views', 'Concierge', 'Pool', 'Spa', 'Premium Finishes', 'Private Elevator'],
  ARRAY[
    'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=800'
  ],
  '00000000-0000-0000-0000-000000000000',
  true,
  true,
  true,
  true
),
(
  'Charming Garden Apartment',
  'Ground floor apartment with private garden access, perfect for those who love outdoor space and natural light.',
  'apartment',
  2100,
  '234 Garden Lane',
  'Portland',
  'OR',
  '97201',
  2,
  1,
  1000,
  ARRAY['Private Garden', 'Natural Light', 'Updated Kitchen', 'Storage Space'],
  ARRAY[
    'https://images.pexels.com/photos/1571470/pexels-photo-1571470.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1428348/pexels-photo-1428348.jpeg?auto=compress&cs=tinysrgb&w=800'
  ],
  '00000000-0000-0000-0000-000000000000',
  false,
  false,
  true,
  true
),
(
  'Executive Single Room',
  'Professional single room in shared house, perfect for young professionals with all utilities included and common area access.',
  'room',
  950,
  '567 Professional Plaza',
  'Austin',
  'TX',
  '78701',
  1,
  1,
  400,
  ARRAY['Shared Kitchen', 'WiFi Included', 'Utilities Included', 'Professional Environment'],
  ARRAY[
    'https://images.pexels.com/photos/1454804/pexels-photo-1454804.jpeg?auto=compress&cs=tinysrgb&w=800'
  ],
  '00000000-0000-0000-0000-000000000000',
  true,
  true,
  false,
  false
);