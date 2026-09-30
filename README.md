# Vue + Supabase Auth

1. Crea un proyecto en supabase.com y ejecuta `supabase/schema.sql` en el SQL Editor.
2. Authentication > URL Configuration:
   - Site URL: `http://localhost:5173`
   - Redirect URLs: `http://localhost:5173/login` y `http://localhost:5173/reset-password`
3. Copia `.env.example` a `.env` y pon tu URL y anon key (Project Settings > API).
4. `npm install && npm run dev`
