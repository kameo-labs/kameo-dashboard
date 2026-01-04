-- Allow users to insert their own profile
-- This is necessary for 'upsert' to work if the row doesn't exist yet (e.g. if the initial trigger failed)
create policy "Users can insert own profile" on public.kameo_artisans
  for insert with check (auth.uid() = id);
