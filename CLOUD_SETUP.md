# Cloud Setup

Log!t uses **Supabase** for optional, offline-first authentication and database backup.

## 1. SQL Schema

Run this script in your Supabase project's **SQL Editor**:

```sql
-- Create users profile table
CREATE TABLE public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  username TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create movies library table
CREATE TABLE public.movies (
  id TEXT PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  year INTEGER,
  rating INTEGER,
  watched_date DATE,
  runtime INTEGER,
  director TEXT,
  language TEXT,
  country TEXT,
  notes TEXT,
  favorite BOOLEAN DEFAULT FALSE,
  rewatch BOOLEAN DEFAULT FALSE,
  poster_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create sync settings table
CREATE TABLE public.settings (
  user_id UUID PRIMARY KEY REFERENCES public.users(id) ON DELETE CASCADE,
  auto_sync BOOLEAN DEFAULT TRUE,
  sync_wifi_only BOOLEAN DEFAULT FALSE,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

## 2. Configuration
1. Obtain the **Project URL** and **Anon public key** from your Supabase Dashboard (**Project Settings** → **API**).
2. Configure Log!t by entering these credentials at `/config.html` or saving them via the browser console:
   ```javascript
   localStorage.setItem('supabase_url', 'https://your-project.supabase.co');
   localStorage.setItem('supabase_anon_key', 'your-anon-public-key');
   ```
3. Enable Email/Password or OAuth (Google, GitHub) providers in the **Authentication** settings of your Supabase dashboard.
