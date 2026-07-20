# Setup Guide

## Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- A Supabase account (for cloud storage)

## Quick Start

1. Go to [suz41.github.io/logit](https://suz41.github.io/logit)
2. Create an account or sign in
3. Set your TMDB API key in Settings
4. Start logging movies

---

## Note for Indian Users

TMDB API is blocked in India. You need a VPN to:
- Search and add movies
- Change movie posters

Once added, movies work without VPN.

---

## TMDB API Key (Required for Movie Search)

1. Go to [themoviedb.org](https://www.themoviedb.org/)
2. Create a free account
3. Go to **Settings → API**
4. Request an API key (choose "Personal" use)
5. Copy your API key
6. In Log!t, click **Settings** and paste your key

---

## Cloud Storage

All data is stored in Supabase cloud database. Sign up from the welcome page to get started. Your data is synced automatically and accessible from any device.

### Database Setup

Run the SQL in `migrations.sql` in your Supabase SQL Editor to set up the required tables and RLS policies.

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
├── migrations.sql      # Database setup SQL
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
│   ├── storage.js      # Cloud storage operations
│   ├── utils.js        # Utility functions
│   ├── movies.js       # Movie helpers
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
│   ├── import.js       # Import logic
│   ├── export.js       # Export logic
│   ├── overlays.js     # Overlay UI
│   └── posterPicker.js # Poster selection
├── docs/               # Documentation
└── LICENSE
```

---

## Development

No build tools required. Edit files directly and refresh the browser.

### Tips

- Use Chrome DevTools for debugging
- Check Supabase dashboard for data
- Test on mobile using device emulation
