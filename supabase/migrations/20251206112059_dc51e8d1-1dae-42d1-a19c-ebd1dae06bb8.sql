-- Create user roles enum
CREATE TYPE public.app_role AS ENUM ('client', 'owner', 'broker', 'admin');

-- Create gender enum
CREATE TYPE public.gender_type AS ENUM ('male', 'female', 'other');

-- Create PG type enum
CREATE TYPE public.pg_type AS ENUM ('boys', 'girls', 'co-ed');

-- Create booking status enum
CREATE TYPE public.booking_status AS ENUM ('pending', 'confirmed', 'cancelled', 'completed');

-- Create visit status enum
CREATE TYPE public.visit_status AS ENUM ('scheduled', 'completed', 'cancelled', 'no_show');

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  full_name TEXT,
  email TEXT,
  phone TEXT,
  avatar_url TEXT,
  gender gender_type,
  profession TEXT,
  company_or_college TEXT,
  budget_min INTEGER,
  budget_max INTEGER,
  preferred_cities TEXT[],
  sharing_preference INTEGER[],
  food_preference TEXT,
  business_name TEXT,
  gst_number TEXT,
  id_proof_url TEXT,
  bank_account_number TEXT,
  bank_ifsc TEXT,
  bank_name TEXT,
  kyc_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create user_roles table (separate from profiles for security)
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, role)
);

-- Create cities table
CREATE TABLE public.cities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  state TEXT NOT NULL,
  image_url TEXT,
  pg_count INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create localities table
CREATE TABLE public.localities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  city_id UUID REFERENCES public.cities(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  landmark TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create pgs table
CREATE TABLE public.pgs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  address TEXT NOT NULL,
  city_id UUID REFERENCES public.cities(id) NOT NULL,
  locality_id UUID REFERENCES public.localities(id),
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  pg_type pg_type NOT NULL,
  images TEXT[],
  amenities TEXT[],
  house_rules TEXT[],
  curfew_time TEXT,
  visitor_policy TEXT,
  is_verified BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  min_price INTEGER,
  max_price INTEGER,
  rating DECIMAL(2, 1) DEFAULT 0,
  total_reviews INTEGER DEFAULT 0,
  nearby_landmarks TEXT[],
  nearby_colleges TEXT[],
  food_included BOOLEAN DEFAULT FALSE,
  food_type TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create room_types table
CREATE TABLE public.room_types (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pg_id UUID REFERENCES public.pgs(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  occupancy INTEGER NOT NULL,
  is_ac BOOLEAN DEFAULT FALSE,
  rent_per_bed INTEGER NOT NULL,
  security_deposit INTEGER NOT NULL,
  total_beds INTEGER NOT NULL,
  available_beds INTEGER NOT NULL,
  amenities TEXT[],
  images TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create bookings table
CREATE TABLE public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_number TEXT UNIQUE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  pg_id UUID REFERENCES public.pgs(id) ON DELETE CASCADE NOT NULL,
  room_type_id UUID REFERENCES public.room_types(id) ON DELETE CASCADE NOT NULL,
  status booking_status DEFAULT 'pending',
  move_in_date DATE NOT NULL,
  tenure_months INTEGER NOT NULL,
  rent_amount INTEGER NOT NULL,
  security_deposit INTEGER NOT NULL,
  platform_fee INTEGER DEFAULT 0,
  total_amount INTEGER NOT NULL,
  payment_status TEXT DEFAULT 'pending',
  tenant_name TEXT NOT NULL,
  tenant_phone TEXT NOT NULL,
  tenant_email TEXT NOT NULL,
  tenant_id_proof_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create visits table
CREATE TABLE public.visits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  pg_id UUID REFERENCES public.pgs(id) ON DELETE CASCADE NOT NULL,
  scheduled_date DATE NOT NULL,
  scheduled_time TEXT NOT NULL,
  status visit_status DEFAULT 'scheduled',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create enquiries table
CREATE TABLE public.enquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  pg_id UUID REFERENCES public.pgs(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  message TEXT,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create reviews table
CREATE TABLE public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  pg_id UUID REFERENCES public.pgs(id) ON DELETE CASCADE NOT NULL,
  booking_id UUID REFERENCES public.bookings(id) ON DELETE SET NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  images TEXT[],
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, pg_id)
);

-- Create wishlists table
CREATE TABLE public.wishlists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  pg_id UUID REFERENCES public.pgs(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, pg_id)
);

-- Create payments table
CREATE TABLE public.payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID REFERENCES public.bookings(id) ON DELETE CASCADE NOT NULL,
  amount INTEGER NOT NULL,
  payment_method TEXT,
  transaction_id TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create coupons table
CREATE TABLE public.coupons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT UNIQUE NOT NULL,
  description TEXT,
  discount_type TEXT NOT NULL,
  discount_value INTEGER NOT NULL,
  min_booking_amount INTEGER DEFAULT 0,
  max_discount INTEGER,
  valid_from TIMESTAMPTZ NOT NULL,
  valid_until TIMESTAMPTZ NOT NULL,
  usage_limit INTEGER,
  used_count INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  city_ids UUID[],
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.localities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pgs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.room_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.visits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wishlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coupons ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check user role
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Create function to get user's primary role
CREATE OR REPLACE FUNCTION public.get_user_role(_user_id UUID)
RETURNS app_role
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT role FROM public.user_roles
  WHERE user_id = _user_id
  LIMIT 1
$$;

-- Profiles policies
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all profiles"
  ON public.profiles FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

-- User roles policies
CREATE POLICY "Users can view their own roles"
  ON public.user_roles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all roles"
  ON public.user_roles FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- Cities policies (public read)
CREATE POLICY "Anyone can view cities"
  ON public.cities FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage cities"
  ON public.cities FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- Localities policies (public read)
CREATE POLICY "Anyone can view localities"
  ON public.localities FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage localities"
  ON public.localities FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- PGs policies
CREATE POLICY "Anyone can view active PGs"
  ON public.pgs FOR SELECT
  USING (is_active = true);

CREATE POLICY "Owners can view their own PGs"
  ON public.pgs FOR SELECT
  USING (auth.uid() = owner_id);

CREATE POLICY "Owners can insert their own PGs"
  ON public.pgs FOR INSERT
  WITH CHECK (auth.uid() = owner_id AND (public.has_role(auth.uid(), 'owner') OR public.has_role(auth.uid(), 'broker')));

CREATE POLICY "Owners can update their own PGs"
  ON public.pgs FOR UPDATE
  USING (auth.uid() = owner_id);

CREATE POLICY "Admins can manage all PGs"
  ON public.pgs FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- Room types policies
CREATE POLICY "Anyone can view room types"
  ON public.room_types FOR SELECT
  USING (true);

CREATE POLICY "Owners can manage their PG room types"
  ON public.room_types FOR ALL
  USING (EXISTS (SELECT 1 FROM public.pgs WHERE pgs.id = room_types.pg_id AND pgs.owner_id = auth.uid()));

-- Bookings policies
CREATE POLICY "Users can view their own bookings"
  ON public.bookings FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own bookings"
  ON public.bookings FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own bookings"
  ON public.bookings FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Owners can view bookings for their PGs"
  ON public.bookings FOR SELECT
  USING (EXISTS (SELECT 1 FROM public.pgs WHERE pgs.id = bookings.pg_id AND pgs.owner_id = auth.uid()));

CREATE POLICY "Owners can update bookings for their PGs"
  ON public.bookings FOR UPDATE
  USING (EXISTS (SELECT 1 FROM public.pgs WHERE pgs.id = bookings.pg_id AND pgs.owner_id = auth.uid()));

-- Visits policies
CREATE POLICY "Users can manage their own visits"
  ON public.visits FOR ALL
  USING (auth.uid() = user_id);

CREATE POLICY "Owners can view visits for their PGs"
  ON public.visits FOR SELECT
  USING (EXISTS (SELECT 1 FROM public.pgs WHERE pgs.id = visits.pg_id AND pgs.owner_id = auth.uid()));

CREATE POLICY "Owners can update visits for their PGs"
  ON public.visits FOR UPDATE
  USING (EXISTS (SELECT 1 FROM public.pgs WHERE pgs.id = visits.pg_id AND pgs.owner_id = auth.uid()));

-- Enquiries policies
CREATE POLICY "Anyone can create enquiries"
  ON public.enquiries FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can view their own enquiries"
  ON public.enquiries FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Owners can view enquiries for their PGs"
  ON public.enquiries FOR SELECT
  USING (EXISTS (SELECT 1 FROM public.pgs WHERE pgs.id = enquiries.pg_id AND pgs.owner_id = auth.uid()));

-- Reviews policies
CREATE POLICY "Anyone can view reviews"
  ON public.reviews FOR SELECT
  USING (true);

CREATE POLICY "Users can create their own reviews"
  ON public.reviews FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own reviews"
  ON public.reviews FOR UPDATE
  USING (auth.uid() = user_id);

-- Wishlists policies
CREATE POLICY "Users can manage their own wishlists"
  ON public.wishlists FOR ALL
  USING (auth.uid() = user_id);

-- Payments policies
CREATE POLICY "Users can view their own payments"
  ON public.payments FOR SELECT
  USING (EXISTS (SELECT 1 FROM public.bookings WHERE bookings.id = payments.booking_id AND bookings.user_id = auth.uid()));

CREATE POLICY "Owners can view payments for their PGs"
  ON public.payments FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.bookings 
    JOIN public.pgs ON pgs.id = bookings.pg_id 
    WHERE bookings.id = payments.booking_id AND pgs.owner_id = auth.uid()
  ));

-- Coupons policies (public read for active)
CREATE POLICY "Anyone can view active coupons"
  ON public.coupons FOR SELECT
  USING (is_active = true AND valid_until > NOW());

CREATE POLICY "Admins can manage coupons"
  ON public.coupons FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name')
  );
  
  -- Default role is client
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, COALESCE((NEW.raw_user_meta_data->>'role')::app_role, 'client'));
  
  RETURN NEW;
END;
$$;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- Add update triggers
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_pgs_updated_at BEFORE UPDATE ON public.pgs FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_room_types_updated_at BEFORE UPDATE ON public.room_types FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON public.bookings FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_visits_updated_at BEFORE UPDATE ON public.visits FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Generate unique booking number function
CREATE OR REPLACE FUNCTION public.generate_booking_number()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.booking_number := 'PGF' || TO_CHAR(NOW(), 'YYMMDD') || LPAD(FLOOR(RANDOM() * 10000)::TEXT, 4, '0');
  RETURN NEW;
END;
$$;

CREATE TRIGGER generate_booking_number_trigger
  BEFORE INSERT ON public.bookings
  FOR EACH ROW
  EXECUTE FUNCTION public.generate_booking_number();