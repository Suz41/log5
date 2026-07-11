# Log!t Design System

## Fonts

- **Primary:** Inter (400, 500, 600, 700)
- **Display:** Poppins (600, 700) — logo, headings, stat numbers
- Loaded via Google Fonts

## Colors

| Token         | Value              | Usage                          |
|---------------|--------------------|--------------------------------|
| `--bg`        | `#000`             | Page background, pure black    |
| `--surface`   | `#1c1c1e`          | Cards, inputs, modals          |
| `--surface2`  | `#2c2c2e`          | Secondary surface, slider track|
| `--text`      | `#fff`             | Primary text                   |
| `--muted`     | `#98989d` / `#636366` | Secondary text, labels     |
| `--dim`       | `#48484a`          | Tertiary text, arrows, dots    |
| `--border`    | `rgba(255,255,255,0.06)` | Subtle borders           |
| `--pink`      | `#ff375f`          | Rewatch badge, toggle active   |
| `--red`       | `#ff453a`          | Destructive actions            |
| `--accent`    | `#0a84ff`          | Links (about page only)        |

**Rule:** No blue, purple, or gray tinted backgrounds. Pure black `#000` only. Warm earthy tones preferred.

## Typography Sizes

| Element          | Size   | Weight | Case       |
|------------------|--------|--------|------------|
| Logo             | 22px   | 700    | Normal     |
| Section title    | 11px   | 600    | Uppercase  |
| Month header     | 11px   | 600    | Uppercase  |
| Movie date       | 10px   | 500    | Normal     |
| Day number       | 10px   | 700    | Normal     |
| Stat number      | 26px   | 700    | Normal     |
| Stat label       | 11px   | 600    | Uppercase  |
| Meta value       | 13px   | 500    | Normal     |
| Meta label       | 10px   | 600    | Uppercase  |
| Person name      | 12px   | 500    | Normal     |

## Layout

### Header
- Height: 52px
- Sticky, frosted glass: `rgba(0,0,0,0.85)` + `backdrop-filter: blur(20px)`
- Border: `0.5px solid rgba(255,255,255,0.06)`
- Logo: left-aligned, plain white, no gradient
- Settings: bare gear icon (SVG), no pill/badge container

### Bottom Nav
- Fixed bottom, height 56px
- Frosted glass: `rgba(13,13,13,0.88)` + `backdrop-filter: blur(20px)`
- Three items: Library (grid icon) | **Flush Add** (white circle, 44px) | Stats (bar chart)
- No nav bar on stats page
- Auto-hides on scroll down, shows on scroll up
- Transition: `cubic-bezier(0.2, 0, 0, 1)`

### Poster Grid
- Gap: 3px (tight)
- Columns: configurable 3–10 via slider, stored in localStorage
- Aspect ratio: 2/3
- Border radius: 3px
- Shadow: `0 2px 8px rgba(0,0,0,0.3)`
- Dates below poster: 18px height row with day (bold white) + month (muted)
- Rewatch indicator: pink "R" next to date, not on poster

### Month Sections
- Gap between sections: 6px (tight)
- Month header: only month name, no year (e.g. "May" not "May 2026")
- Arrow indicator rotates 90deg when open
- Expand/collapse: `grid-template-rows: 0fr → 1fr` transition
- Count badge: muted, right-aligned

## Components

### iOS Toggle Switch
- Size: 51×31px (meta sheet) / 36×20px (settings panel)
- Track: `#39393d` → `#34c759` (settings) or `#ff375f` (rewatch)
- Knob: white, 27px (large) / 16px (small), circular
- Transition: `0.3s cubic-bezier(0.25, 0.1, 0.25, 1)`
- Shadow on knob: `0 1px 4px rgba(0,0,0,0.4)`

### Cards
- Background: `#1c1c1e`
- Border radius: 14px (stats cards) / 10px (compact cards)
- Padding: 12–14px
- Borders: `0.5px solid rgba(255,255,255,0.06)`

### Buttons
- Action: 44px height, 12px radius, Inter 600
- Destructive: `#ff453a` text, `rgba(255,69,58,0.2)` border
- Primary (add): white bg, black text, 50px height, 14px radius
- Close: 32px circle, `#1c1c1e` bg

### Modals / Sheets
- Full-screen: `position: fixed; inset: 0; background: #000`
- Bottom sheets: slide up with `translateY`, 20px top radius
- Backdrop: `rgba(0,0,0,0.65)` + `backdrop-filter: blur(8px)`
- Handle bar: 36×4px, `#48484a`, centered

### Overlay Navigation
- All overlays use `history.pushState` / `popstate`
- Android back button closes overlays in LIFO order
- Stack tracked in `overlayStack` array

## Settings Panel
- Inline expand below header (not a separate page)
- Max height transition: `0 → 50px`
- Contains: Dates toggle + Grid columns slider
- Slider: `step="any"`, range 3–10, tick dots at each position
- Closes on click outside header area

## Stats Page

### Hero Stats
- 3-column grid: Films | Runtime | Average
- Runtime box is tappable (expands to show min/days/years)
- Numbers: 26px, bold, white

### People Cards
- 2-column grid: Directors | Actors
- Circular avatar: 30px
- Expandable movie list on tap
- Movie chips: 10px, muted text

### Meta Cards (Genres, Languages, Regions)
- 2-column grid
- Expandable items with `max-height: none` (flexbox, not inline)
- Movie list: `· ` prefix before each title

## Data Model

Movies stored in `localStorage.movies` as JSON array. Fields:

| Key       | Type   | Description           |
|-----------|--------|-----------------------|
| `id`      | string | UUID                  |
| `tmdb_id` | string | TMDB movie ID         |
| `imdb_id` | string | IMDb ID               |
| `t`       | string | Title                 |
| `yr`      | string | Year                  |
| `rt`      | number | Runtime (minutes)     |
| `g`       | string | Genres (comma-separated) |
| `dr`      | string | Director name         |
| `c`       | string | Cast (comma-separated) |
| `lg`      | string | Language code         |
| `ct`       | string | Country              |
| `r`       | number | Rating (0.5–5)       |
| `w`       | string | Watch type            |
| `d`       | string | Date (YYYY-MM-DD)    |
| `sp`      | string | Poster path           |

Poster arrays (`p`) are stripped from storage and fetched on-demand from TMDB.

## Import Formats

- **JSON export** — direct array import
- **Slim export** — re-fetches full data from TMDB using `tmdb_id`
- **Freeform text** — one movie per line with optional rating/date/ID
- **Pipe format** — `Title | Rating | ID | Date | Rewatch`
- **File upload** — `.json` file via file input

## Pages

| File        | Purpose              |
|-------------|----------------------|
| `index.html`| Library + Add movie  |
| `PS.html`   | Stats + Import/Export |
| `about.html`| App info + Storage   |

Each page is a standalone single HTML file with inline CSS and JS. No build tools, no frameworks, no dependencies.
