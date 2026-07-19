# Setup Guide

## Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)

## Quick Start

1. Go to [suz41.github.io/logit](https://suz41.github.io/logit)
2. Start logging movies

**Or use locally:**
1. Download the ZIP from GitHub
2. Extract it
3. Open `index.html` in your browser

No build tools, no installation required.

---

## TMDB API Key (Required for Movie Search)

1. Go to [themoviedb.org](https://www.themoviedb.org/)
2. Create a free account
3. Go to **Settings → API**
4. Request an API key (choose "Personal" use)
5. Copy your API key
6. In Log!t, click **Settings** and paste your key

---

## Cloud Sync (Optional)

Log!t uses Supabase for optional cloud sync. The default staging database is pre-configured — no setup needed.

### To use your own Supabase:

1. Create a project at [supabase.com](https://supabase.com)
2. Go to **Project Settings → API**
3. Copy the **Project URL** and **anon/public key**
4. Open `js/config.js` and update:
   ```javascript
   SUPABASE_URL: 'your-project-url',
   SUPABASE_KEY: 'your-anon-key'
   ```

### Database Schema

Create these tables in your Supabase SQL editor:

```sql
-- Movies table
CREATE TABLE movies (
  id TEXT PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  t TEXT,
  r NUMERIC,
  sp TEXT,
  g TEXT,
  yr TEXT,
  rt NUMERIC,
  d TEXT,
  w TEXT,
  dr TEXT,
  c TEXT,
  lg TEXT,
  ct TEXT,
  tmdb_id TEXT,
  imdb_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Settings table
CREATE TABLE settings (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id),
  avatar TEXT,
  favorites JSONB,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE movies ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can manage own movies"
  ON movies FOR ALL
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own settings"
  ON settings FOR ALL
  USING (auth.uid() = user_id);
```

---

## Project Structure

```
logit/
├── index.html          # Main library page
├── profile.html        # User profile
├── PS.html             # Stats page
├── about.html          # About page
├── welcome.html        # Welcome/auth page
├── config.html         # Supabase config page
├── reset.html          # Password reset
├── css/
│   ├── main.css        # Global styles
│   ├── components.css  # Reusable components
│   ├── library.css     # Library grid
│   ├── modal.css       # Modal styles
│   ├── desktop.css     # Desktop overrides
│   ├── animations.css  # Animations
│   ├── auth.css        # Auth pages
│   ├── stats.css       # Stats page
│   ├── profile.css     # Profile page
│   └── about.css       # About page
├── js/
│   ├── app.js          # Main app init
│   ├── config.js       # API keys, Supabase config
│   ├── constants.js    # Language/genre maps
│   ├── storage.js      # localStorage helpers
│   ├── utils.js        # Utility functions
│   ├── movies.js       # Movie CRUD operations
│   ├── search.js       # TMDB search
│   ├── movieFactory.js # Movie object builder
│   ├── modals.js       # Modal logic
│   ├── ui.js           # UI rendering
│   ├── library.js      # Library page logic
│   ├── stats.js        # Stats page logic
│   ├── statutils.js    # Stats calculations
│   ├── profile.js      # Profile page logic
│   ├── auth.js         # Authentication
│   ├── supabase.js     # Supabase client
│   ├── sync.js         # Cloud sync engine
│   ├── offline.js      # Offline queue
│   ├── import.js       # Import logic
│   ├── export.js       # Export logic
│   ├── overlays.js     # Overlay UI
│   ├── posterPicker.js # Poster selection
│   └── about.js        # About page
├── assets/
│   ├── logo.svg        # App logo
│   └── favicon.svg     # Tab icon
├── JSON/               # Sample data
├── docs/               # Documentation
└── LICENSE
```

---

## Development

No build tools required. Edit files directly and refresh the browser.

### Tips

- Use Chrome DevTools for debugging
- Check localStorage in Application tab
- Test on mobile using device emulation
- Clear localStorage to reset app state

### Common Issues

**CORS errors with images:**
- TMDB images may be blocked in some browsers
- Use a local proxy or CORS extension for development

**localStorage full:**
- Max size is ~5MB
- Compress avatar images before saving
- Export and clear old data periodically
