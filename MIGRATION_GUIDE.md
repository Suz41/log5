# Log!t Migration Guide - Offline to Cloud

## For Existing Users

If you've been using Log!t offline and want to enable cloud sync, here's how:

### Step 1: Open Log!t

Go to your Log!t instance in the browser.

### Step 2: Go to Settings

Click the settings icon (⚙️) in the top right.

### Step 3: Enable Cloud Sync

Look for the "Cloud Sync" option in settings and toggle it on.

### Step 4: Sign In

You'll be redirected to the sign-in screen. Choose your preferred method:
- **Google** (recommended for easy access)
- **GitHub**
- **Email + Password**
- **Magic Link** (email only, no password)

### Step 5: Confirm

After signing in, you'll see a confirmation that your local movies are being uploaded. This happens automatically.

### Step 6: Done!

Your data is now synced to the cloud. You can:
- Access your movies on other devices
- Get automatic backups
- Sync changes across devices
- Still use the app offline

---

## What Happens During Migration?

1. **Local data preserved** - Nothing is deleted from your device
2. **Upload to cloud** - All your movies are sent to our server
3. **Settings merged** - Your preferences (grid columns, dates toggle, etc.) are remembered locally
4. **Automatic sync** - From now on, changes sync every 5 minutes

---

## FAQ

### Q: Will my movies be deleted?
**A:** No. They're uploaded to the cloud and kept on your device.

### Q: What if I want to go back to offline mode?
**A:** You can toggle cloud sync off in settings. Your device still has all your data.

### Q: Can I access my data from multiple devices?
**A:** Yes! Sign in on another device with the same account and your data appears automatically.

### Q: What if I lose internet connection?
**A:** No problem. Your changes save locally and sync when you're back online.

### Q: Is my data private?
**A:** Yes. Only you can see your movies. Everything is encrypted and secure.

### Q: Can I export my data?
**A:** Yes. Go to Profile → Data Management → Export as JSON.

### Q: How do I delete my cloud data?
**A:** Go to Profile → Account → Delete Account. This removes all cloud data but keeps your local copy.

---

## Troubleshooting

### "Upload failed"

**Try:**
1. Check your internet connection
2. Go to Profile → Manual Sync
3. If it still fails, check DevTools console for errors

### "Movies not appearing on another device"

**Try:**
1. Refresh the page
2. Manual sync on both devices (Profile → Manual Sync)
3. Clear browser cache and reload

### "I don't see a profile button"

**Try:**
1. Make sure you're signed in (check sign-in status in settings)
2. Refresh the page
3. Clear cache if it still doesn't appear

### "Cloud features not configured"

**This means:** Your admin hasn't set up Supabase yet

**Solution:** Ask your admin to follow the [Cloud Setup Guide](CLOUD_SETUP.md)

---

## After Migration

Your Log!t workflow is now:

```
Make changes
    ↓
Save locally (instant)
    ↓
Queue for sync (if authenticated)
    ↓
Auto-sync every 5 minutes (if online)
    ↓
Changes appear on other devices
```

Everything still works offline. You just get the bonus of cloud backup and multi-device sync!

---

## Need Help?

1. Check the [FAQ](CLOUD_SETUP.md#troubleshooting) in the Cloud Setup guide
2. Go to Profile and check sync status
3. Try manual sync
4. Clear browser cache and reload
5. Contact support if issues persist

---

**You're all set!** Your movies are now in the cloud. Enjoy using Log!t across devices! 🍿
