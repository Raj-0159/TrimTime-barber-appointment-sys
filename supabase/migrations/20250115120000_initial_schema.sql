/*
# [Initial Schema Setup]
This script sets up the initial database schema for the TrimTime application, including tables for profiles, services, and appointments. It also enables Row Level Security (RLS) and defines policies to protect user data. A trigger is created to automatically populate user profiles upon sign-up.

## Query Description: This operation is structural and sets up the foundational tables for the application. It does not modify or delete any existing data but creates new structures. It is safe to run on a new project.

## Metadata:
- Schema-Category: "Structural"
- Impact-Level: "Medium"
- Requires-Backup: false
- Reversible: true (by dropping tables)

## Structure Details:
- Tables created: `profiles`, `services`, `appointments`
- Columns added: Standard columns for user profiles, services, and appointment details.
- Constraints added: Primary keys, foreign keys to link tables.

## Security Implications:
- RLS Status: Enabled on `profiles` and `appointments`.
- Policy Changes: Yes, new policies are created for data access control.
- Auth Requirements: Policies are based on `auth.uid()` to ensure users can only access their own data.

## Performance Impact:
- Indexes: Primary keys and foreign keys are indexed by default.
- Triggers: A trigger `on_auth_user_created` is added to `auth.users` to create user profiles.
- Estimated Impact: Low performance impact on a new database.
*/

-- 1. PROFILES TABLE
-- Stores public user data for both customers and barbers.
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  updated_at TIMESTAMPTZ,
  full_name TEXT,
  phone TEXT,
  role TEXT NOT NULL DEFAULT 'customer',
  -- Customer specific
  total_visits INT DEFAULT 0,
  loyalty_status TEXT DEFAULT 'Bronze',
  -- Barber specific
  experience TEXT,
  specialties TEXT[],
  rating NUMERIC(2, 1),
  working_hours TEXT,
  bio TEXT
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile."
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile."
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Authenticated users can see barber profiles."
  ON public.profiles FOR SELECT
  TO authenticated
  USING (role = 'barber');


-- 2. FUNCTION & TRIGGER FOR NEW USER PROFILES
-- This function automatically creates a profile entry when a new user signs up.
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, role, phone)
  VALUES (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'role',
    new.raw_user_meta_data->>'phone'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- This trigger calls the function after a new user is created in the auth schema.
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();


-- 3. SERVICES TABLE
-- Stores all available services.
CREATE TABLE public.services (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC(10, 2) NOT NULL,
  duration_minutes INT NOT NULL,
  icon TEXT,
  is_popular BOOLEAN DEFAULT FALSE
);

ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view services."
  ON public.services FOR SELECT
  TO authenticated;


-- 4. APPOINTMENTS TABLE
-- Stores all appointment bookings.
CREATE TABLE public.appointments (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  customer_id UUID NOT NULL REFERENCES public.profiles(id),
  barber_id UUID NOT NULL REFERENCES public.profiles(id),
  service_id BIGINT NOT NULL REFERENCES public.services(id),
  appointment_time TIMESTAMPTZ NOT NULL,
  status TEXT NOT NULL DEFAULT 'confirmed' -- e.g., confirmed, completed, cancelled
);

ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own appointments."
  ON public.appointments FOR SELECT
  USING (auth.uid() = customer_id OR auth.uid() = barber_id);

CREATE POLICY "Customers can create their own appointments."
  ON public.appointments FOR INSERT
  WITH CHECK (auth.uid() = customer_id);

CREATE POLICY "Users can update their own appointments (e.g., cancel or complete)."
  ON public.appointments FOR UPDATE
  USING (auth.uid() = customer_id OR auth.uid() = barber_id);


-- 5. SEED DATA FOR SERVICES
-- Inserts the default list of services into the database.
INSERT INTO public.services (name, description, price, duration_minutes, icon, is_popular) VALUES
('Classic Haircut', 'Traditional scissor cut with professional styling and finishing', 28, 30, '✂️', true),
('Beard Trim', 'Professional beard shaping, trimming and grooming', 18, 20, '🧔', true),
('Hair Wash & Style', 'Luxury shampoo, conditioning and professional styling', 22, 25, '🧴', false),
('Full Service', 'Complete grooming package - haircut, beard trim, and styling', 48, 60, '⭐', true),
('Hot Towel Shave', 'Traditional straight razor shave with hot towel treatment', 35, 45, '🪒', false),
('Kids Cut', 'Fun and gentle haircut for children under 12', 20, 20, '👶', true),
('Fade Cut', 'Modern fade haircut with precision blending', 32, 40, '🔥', true),
('Hair Design', 'Creative hair patterns and designs', 40, 50, '🎨', false);
