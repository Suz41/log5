# Log!t Design System

## Typography
- **Primary Font**: Inter (400, 500, 600, 700)
- **Display Font**: Poppins (600, 700) — logo, headings, stats numbers

## Colors (Pure Black Theme Only)

| Token | Value | Usage |
|---|---|---|
| `--bg` | `#000` | Page background |
| `--surface` | `#1c1c1e` | Cards, inputs, modals |
| `--surface2` | `#2c2c2e` | Slider tracks, buttons |
| `--text` | `#fff` | Primary text |
| `--muted` | `#98989d` / `#636366` | Secondary labels, descriptions |
| `--pink` | `#ff375f` | Rewatch indicator |
| `--red` | `#ff453a` | Destructive buttons |
| `--accent` | `#0a84ff` | Standard links |

## Layout Essentials
- **Header**: 52px sticky header, frosted glass background (`backdrop-filter: blur(20px)`), `0.5px solid rgba(255,255,255,0.06)` border.
- **Bottom Navigation**: 56px height, hides on scroll down, contains *Library*, *Add (44px white pill button)*, and *Stats* options.
- **Grid Layout**: 4 to 10 configurable columns with a tight 3px gap and 3px border-radius posters.
- **Data Model**: Movies stored in `localStorage.movies` as a JSON array with attributes: `id`, `tmdb_id`, `imdb_id`, `t` (title), `yr` (year), `rt` (runtime), `g` (genres), `dr` (director), `c` (cast), `lg` (language), `ct` (country), `r` (rating), `w` (watch type), `d` (date), `sp` (poster path).
