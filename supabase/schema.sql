-- Ejecutar en Supabase > SQL Editor

-- 1. Tabla de perfiles (1 a 1 con auth.users)
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  email text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 2. Seguridad a nivel de fila (RLS)
alter table public.profiles enable row level security;

create policy "Ver mi perfil" on public.profiles
  for select using (auth.uid() = id);

create policy "Actualizar mi perfil" on public.profiles
  for update using (auth.uid() = id) with check (auth.uid() = id);

-- 3. Crear perfil automáticamente al registrarse
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data ->> 'full_name');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- 4. Actualizar updated_at
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end;
$$;

create trigger profiles_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();
