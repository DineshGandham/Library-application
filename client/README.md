# Library Application

## Premium UI Setup

This project uses:
- Material-UI (MUI) for a modern, premium look
- Tailwind CSS for utility-first styling (optional, not required for MUI but can be used for custom styles)
- React Router for navigation

### Requirements
- Node.js (v16+ recommended)
- npm

### Installed Packages
- @mui/material
- @mui/icons-material
- @mui/lab
- @emotion/react
- @emotion/styled
- framer-motion
- react-router-dom
- tailwindcss (optional)
- postcss (optional)
- autoprefixer (optional)

### Setup Instructions

1. Install dependencies:
   ```sh
   cd client
   npm install
   ```

2. Start the development server:
   ```sh
   npm run dev
   ```

3. The app will be available at `http://localhost:5173` (or as specified by Vite).

### Project Structure
- `src/theme.ts` — Custom MUI theme
- `src/components/Layout.tsx` — Responsive sidebar and header
- `src/pages/Dashboard.tsx` — Modern dashboard
- `src/pages/Login.tsx` — Modern login page
- `src/pages/Books.tsx` — Books management
- `src/pages/Members.tsx` — Members management

### Customization
- Update the theme in `src/theme.ts` for branding
- Add more pages/routes as needed

---

For any issues, please check the dependencies and ensure your Node.js version is compatible.
