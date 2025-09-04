/*
  # HouseHunt Database Schema

  1. New Tables
    - `profiles` - User profiles linked to Supabase auth
      - `id` (uuid, references auth.users)
      - `name` (text)
      - `email` (text)
      - `role` (enum: renter, owner, admin)
      - `phone` (text, optional)
      - `avatar_url` (text, optional)
      - `verified` (boolean)
      - `created_at`, `updated_at` (timestamps)

    - `properties` - Rental property listings
      - `id` (uuid, primary key)
      - `title`, `description` (text)
      - `type` (enum: apartment, house, room, studio)
      - `price` (integer)
      - Location fields: `address`, `city`, `state`, `zip_code`
      - `latitude`, `longitude` (optional coordinates)
      - `bedrooms`, `bathrooms`, `area` (integers)
      - `amenities` (text array)
      - `images` (text array)
      - `owner_id` (uuid, references profiles)
      - Boolean flags: `available`, `furnished`, `pet_friendly`, `parking`
      - `created_at`, `updated_at` (timestamps)

    - `inquiries` - Rental inquiries from renters to owners
      - `id` (uuid, primary key)
      - `property_id` (uuid, references properties)
      - `renter_id` (uuid, references profiles)
      - `message`, `phone` (text)
      - `status` (enum: pending, approved, rejected, contacted)
      - `created_at`, `updated_at` (timestamps)

  2. Security
    - Enable RLS on all tables
    - Profiles: Users can read/update their own profile
    - Properties: Public read, owners can CRUD their own properties
    - Inquiries: Renters can create, owners can read their property inquiries

  3. Functions
    - Trigger to create profile on user signup
    - Updated timestamp triggers for all tables
*/

-- Create custom types
CREATE TYPE user_role AS ENUM ('renter', 'owner', 'admin');
CREATE TYPE property_type AS ENUM ('apartment', 'house', 'room', 'studio');
CREATE TYPE inquiry_status AS ENUM ('pending', 'approved', 'rejected', 'contacted');

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  email text NOT NULL,
  role user_role DEFAULT 'renter',
  phone text,
  avatar_url text,
  verified boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create properties table
CREATE TABLE IF NOT EXISTS properties (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  type property_type NOT NULL,
  price integer NOT NULL,
  address text NOT NULL,
  city text NOT NULL,
  state text NOT NULL,
  zip_code text NOT NULL,
  latitude decimal,
  longitude decimal,
  bedrooms integer NOT NULL DEFAULT 1,
  bathrooms integer NOT NULL DEFAULT 1,
  area integer NOT NULL,
  amenities text[] DEFAULT '{}',
  images text[] DEFAULT '{}',
  owner_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  available boolean DEFAULT true,
  furnished boolean DEFAULT false,
  pet_friendly boolean DEFAULT false,
  parking boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create inquiries table
CREATE TABLE IF NOT EXISTS inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id uuid NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  renter_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  message text NOT NULL,
  phone text NOT NULL,
  status inquiry_status DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can read own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Properties policies
CREATE POLICY "Anyone can read available properties"
  ON properties
  FOR SELECT
  TO authenticated
  USING (available = true);

CREATE POLICY "Owners can read their own properties"
  ON properties
  FOR SELECT
  TO authenticated
  USING (auth.uid() = owner_id);

CREATE POLICY "Owners can insert properties"
  ON properties
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Owners can update their own properties"
  ON properties
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = owner_id);

CREATE POLICY "Owners can delete their own properties"
  ON properties
  FOR DELETE
  TO authenticated
  USING (auth.uid() = owner_id);

-- Inquiries policies
CREATE POLICY "Renters can create inquiries"
  ON inquiries
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = renter_id);

CREATE POLICY "Renters can read their own inquiries"
  ON inquiries
  FOR SELECT
  TO authenticated
  USING (auth.uid() = renter_id);

CREATE POLICY "Owners can read inquiries for their properties"
  ON inquiries
  FOR SELECT
  TO authenticated
  USING (
    auth.uid() IN (
      SELECT owner_id FROM properties WHERE id = property_id
    )
  );

CREATE POLICY "Owners can update inquiries for their properties"
  ON inquiries
  FOR UPDATE
  TO authenticated
  USING (
    auth.uid() IN (
      SELECT owner_id FROM properties WHERE id = property_id
    )
  );

-- Create function to handle user signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO profiles (id, name, email)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'name', new.email),
    new.email
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_properties_updated_at
  BEFORE UPDATE ON properties
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_inquiries_updated_at
  BEFORE UPDATE ON inquiries
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_properties_city ON properties(city);
CREATE INDEX IF NOT EXISTS idx_properties_state ON properties(state);
CREATE INDEX IF NOT EXISTS idx_properties_type ON properties(type);
CREATE INDEX IF NOT EXISTS idx_properties_price ON properties(price);
CREATE INDEX IF NOT EXISTS idx_properties_bedrooms ON properties(bedrooms);
CREATE INDEX IF NOT EXISTS idx_properties_available ON properties(available);
CREATE INDEX IF NOT EXISTS idx_properties_owner_id ON properties(owner_id);
CREATE INDEX IF NOT EXISTS idx_inquiries_property_id ON inquiries(property_id);
CREATE INDEX IF NOT EXISTS idx_inquiries_renter_id ON inquiries(renter_id);
CREATE INDEX IF NOT EXISTS idx_inquiries_status ON inquiries(status);