-- Create the table if it doesn't exist (Phase A requirements included)
create table if not exists public.kameo_artisans (
  id uuid references auth.users on delete cascade not null primary key,
  email text,
  business_type text, -- 'plumber', 'locksmith', etc.
  status text default 'trial',
  credits int default 10,
  settings jsonb default '{"notifications": true}',
  created_at timestamptz default now()
);

-- Enable RLS
alter table public.kameo_artisans enable row level security;

-- Policy: Users can view/edit their own profile
create policy "Users can view own profile" on public.kameo_artisans
  for select using (auth.uid() = id);

create policy "Users can update own profile" on public.kameo_artisans
  for update using (auth.uid() = id);

-- Function to handle new user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.kameo_artisans (id, email, status)
  values (new.id, new.email, 'trial');
  return new;
end;
$$ language plpgsql security definer;

-- Trigger to call the function on insert into auth.users
-- Drop first to allow re-running this script without error
drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
