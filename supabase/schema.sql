create table if not exists public.aura_user_state (
  user_id uuid primary key references auth.users(id) on delete cascade,
  payload jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default timezone('utc', now())
);

alter table public.aura_user_state enable row level security;

drop policy if exists "Users can read own state" on public.aura_user_state;
create policy "Users can read own state"
  on public.aura_user_state
  for select
  using (auth.uid() = user_id);

drop policy if exists "Users can upsert own state" on public.aura_user_state;
create policy "Users can upsert own state"
  on public.aura_user_state
  for insert
  with check (auth.uid() = user_id);

drop policy if exists "Users can update own state" on public.aura_user_state;
create policy "Users can update own state"
  on public.aura_user_state
  for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
