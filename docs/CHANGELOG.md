# Changelog

All notable changes to Log!t will be documented in this file.

## [3.0.0] - 2026-07-20

### Added
- Cloud-only architecture (removed localStorage)
- Runtime editing in movie details
- Storage usage display in profile
- Exponential backoff for failed operations
- Queue compaction for sync
- Schema versioning for migrations

### Changed
- All data now stored in Supabase cloud database
- Removed offline mode — authentication required
- Removed push/pull sync buttons
- Simplified sync engine
- Improved error handling with user-facing messages
- Added image fallbacks for broken posters
- Added ARIA labels and keyboard navigation
- Performance improvements with incremental DOM updates

### Removed
- localStorage storage
- Offline queue system
- Push/pull manual sync buttons
- Offline mode

## [2.0.0] - 2026-07-19

### Added
- Cloud sync via Supabase
- User authentication (email/password)
- Profile page with avatar and favorites
- Stats page with directors, actors, genres, languages
- Export/Import (JSON and text)
- Responsive desktop layout

### Changed
- Full UI redesign
- Removed old banner/cover feature

## [1.0.0] - 2026-05-22

### Added
- Initial release
- Offline movie logging
- TMDB search integration
- Local storage
