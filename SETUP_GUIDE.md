# CollegeBuzz - Setup Guide

## Database Setup (Supabase)

The app uses Supabase for authentication and user profiles. When you open the app for the first time, it will automatically create the necessary tables.

### If you're using your own Supabase project:

1. **Get your Supabase credentials:**
   - Go to https://supabase.com and create a project
   - Navigate to Settings > API
   - Copy your `Project URL` and `anon public key`

2. **Update `.env` file:**
   ```
   VITE_SUPABASE_URL=your_project_url
   VITE_SUPABASE_ANON_KEY=your_anon_key
   ```

3. **Create database tables** (run in Supabase SQL Editor):
   ```sql
   CREATE TABLE IF NOT EXISTS user_profiles (
     id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
     email text NOT NULL,
     full_name text NOT NULL,
     college_name text DEFAULT '',
     created_at timestamptz DEFAULT now()
   );

   ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

   CREATE POLICY "Users can read own profile"
     ON user_profiles FOR SELECT
     TO authenticated
     USING (auth.uid() = id);

   CREATE POLICY "Users can update own profile"
     ON user_profiles FOR UPDATE
     TO authenticated
     USING (auth.uid() = id)
     WITH CHECK (auth.uid() = id);

   CREATE POLICY "Users can insert own profile"
     ON user_profiles FOR INSERT
     TO authenticated
     WITH CHECK (auth.uid() = id);
   ```

## Running Locally

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

## Features

- **Sign Up / Sign In**: Create accounts with full name and college name
- **Browse Posts**: View announcements, events, sports, gigs, and memes
- **Create Posts**: Share updates with the campus community
- **Interact**: Like posts and add comments
- **Filter**: View posts by category
- **User Profile**: See logged-in user info in the header

## Notes

- Authentication is handled by Supabase Auth (email/password)
- All posts are stored in local state (you can add a database table for persistence)
- User data is synced with the database for future features
