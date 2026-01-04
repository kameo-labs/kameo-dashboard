-- Add business_name column if it doesn't exist
alter table public.kameo_artisans 
add column if not exists business_name text;

-- Ensure the trigger checks for existing rows to avoid conflicts (optional but good practice)
-- (The previous trigger was fine, but just in case)
