# Log!t Cloud Sync - Quick Start

## For Users

### Option 1: Offline Only (No Account Needed)
1. Open Log!t at https://logit.app (or your hosted URL)
2. Click "Continue Offline"
3. Add movies, rate them, get stats
4. Everything is stored locally on your device

### Option 2: Cloud Sync Enabled

#### First Time
1. Open Log!t
2. Click "Sign in with Google" or "Sign in with GitHub" (or Email)
3. Create an account or sign in
4. Your local movies are automatically uploaded
5. Done! Your data syncs automatically

#### Multi-Device Sync
1. Sign in on another device
2. All your movies appear automatically
3. Changes on either device sync in real-time (when online)

#### Manually Sync
- Go to Profile (👤 icon in header)
- Click "Manual Sync"

### Offline Changes
- When you're offline, changes are saved locally
- They sync automatically when you go online
- No data is lost

---

## For Developers

### Quick Setup

```bash
# 1. Clone the repo
git clone https://github.com/suz41/logitv4.git
cd logitv4

# 2. Create Supabase project
# - Go to app.supabase.com
# - Create new project
# - Copy Project URL and Anon Key

# 3. Configure Log!t
# - Open config.html in browser
# - Paste Project URL and Anon Key
# - Click "Configure Supabase"

# 4. Create database schema
# - Go to Supabase SQL Editor
# - Run the SQL from CLOUD_SETUP.md (Setup Instructions → Step 4)

# 5. Enable OAuth (optional)
# - Google: Add credentials in Supabase
# - GitHub: Add credentials in Supabase

# 6. Start using!
# - Open index.html
# - Click "Sign in with Google" (or create offline account)
```

### File Structure

```
logitv4/
├── js/
│   ├── supabase.js       ← Supabase client config
│   ├── auth.js           ← Authentication logic
│   ├── sync.js           ← Sync engine
│   ├── offline.js        ← Offline queue
│   ├── profile.js        ← Profile page
│   └── (existing files...)
├── css/
│   ├── auth.css          ← Auth UI styles
│   └── (existing files...)
├── welcome.html          ← First-time login flow
├── profile.html          ← User profile & settings
├── config.html           ← Supabase configuration
├── CLOUD_SETUP.md        ← Full setup guide
└── index.html            ← Main app (unchanged)
```

### Key APIs

```javascript
// Check if user is authenticated
if (Logit.Auth.isAuthenticated()) {
  // Show profile button
}

// Get pending sync changes
const pending = Logit.Offline.getPending();

// Manually trigger sync
await Logit.Sync.sync();

// Listen for sync status
Logit.Sync.onSyncStatusChange((status) => {
  console.log('Sync status:', status); // 'offline', 'syncing', 'synced'
});
```

### Testing Offline-First Behavior

```javascript
// Simulate offline
localStorage.setItem('logit_offline_mode', 'true');

// Make changes - they'll queue for sync

// Simulate going online
localStorage.setItem('logit_offline_mode', 'false');

// Trigger sync
await Logit.Sync.sync();

// Check if changes were synced
console.log(Logit.Offline.getPending()); // Should be empty
```

### Debugging Sync Issues

```javascript
// View all pending changes
console.table(Logit.Offline.getPending());

// View sync statistics
console.log(Logit.Offline.getStats());

// Clear local cache (CAUTION!)
localStorage.clear();

// Check last sync time
console.log(Logit.Sync.getLastSyncTime());

// Get full formatted queue
console.table(Logit.Offline.getFormattedQueue());
```

### Common Customizations

**Change auto-sync interval** (in `sync.js`):
```javascript
const syncInterval = 5 * 60 * 1000; // Change this (ms)
```

**Disable auto-sync**:
```javascript
localStorage.setItem('logit_auto_sync', 'false');
```

**Change conflict resolution** (in `sync.js` `resolveConflict`):
```javascript
// Modify which fields to preserve from local vs remote
```

### Environment Variables

All settings are stored in localStorage (no server-side .env needed):

```javascript
// Set credentials
localStorage.setItem('supabase_url', 'https://xxxx.supabase.co');
localStorage.setItem('supabase_anon_key', 'your_key_here');

// Or configure via UI at /config.html
```

---

## Troubleshooting

### "Cloud features not configured"
→ Open `/config.html` and enter your Supabase credentials

### "No internet connection"
→ Changes save locally; sync when you're online

### "Sign in failed"
→ Check OAuth provider is enabled in Supabase
→ Verify redirect URIs are correct

### Movies not syncing
→ Check Network tab in DevTools
→ Verify user has permission (RLS policies)
→ Check Supabase database for errors

### Duplicate movies after sync
→ This shouldn't happen
→ If it does: export data, clear cache, re-import

---

## Architecture

```
Browser
  ↓
localStorage (primary)
  ↓
Sync Queue (if authenticated)
  ↓
Internet check
  ↓
Supabase API
  ↓
PostgreSQL + RLS
```

**Key Principle**: Local first, cloud when authenticated & online

---

## Performance Tips

- Auto-sync every 5 minutes (configurable)
- Sync only on Wi-Fi (optional setting)
- Manual sync button always available
- Conflicts resolved server-side for consistency
- Indexes on frequently queried fields

---

**Need help?** See [CLOUD_SETUP.md](CLOUD_SETUP.md) for full documentation.
