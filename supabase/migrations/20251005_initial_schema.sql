-- User Profiles Table
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  goal TEXT CHECK (goal IN ('podcasts', 'courses', 'shadowing', 'analysis')),
  subscription_status TEXT CHECK (subscription_status IN ('free', 'subscribed')) DEFAULT 'free',
  streak INTEGER DEFAULT 0
);

-- Courses/Podcasts Table (Audio Course View)
CREATE TABLE IF NOT EXISTS courses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  duration TEXT,
  audio_url TEXT,
  preview_url TEXT,
  price DECIMAL DEFAULT 2.00,
  category TEXT CHECK (category IN ('podcast', 'course')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tracks Table (Voice Shadowing Screen)
CREATE TABLE IF NOT EXISTS tracks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  artist TEXT,
  audio_url TEXT,
  phrase_segments JSONB, -- Array of 5-6 word phrases
  pitch_adjustable BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Purchases Table (Payment/Subscription, Profile)
CREATE TABLE IF NOT EXISTS purchases (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES user_profiles(id),
  course_id UUID REFERENCES courses(id),
  purchase_type TEXT CHECK (purchase_type IN ('item', 'subscription')),
  amount DECIMAL NOT NULL,
  transaction_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  stripe_payment_id TEXT UNIQUE,
  status TEXT CHECK (status IN ('pending', 'completed', 'failed')) DEFAULT 'pending',
  FOREIGN KEY (user_id) REFERENCES user_profiles(id) ON DELETE CASCADE,
  FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE SET NULL
);

-- Voice Analyses Table (Voice Analysis Screen)
CREATE TABLE IF NOT EXISTS voice_analyses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES user_profiles(id),
  recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  voice_age INTEGER,
  tension_percentage DECIMAL CHECK (tension_percentage BETWEEN 0 AND 100),
  influence_score INTEGER CHECK (influence_score BETWEEN 0 AND 100),
  celebrity_match TEXT,
  exercise_suggestion TEXT,
  premium_access BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  FOREIGN KEY (user_id) REFERENCES user_profiles(id) ON DELETE CASCADE
);
