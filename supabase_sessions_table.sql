-- Run this in your Supabase SQL Editor
-- Dashboard: https://supabase.com/dashboard/project/lmbyzxcvjqmoemfaprzk/sql

create table if not exists sessions (
  id           uuid primary key default gen_random_uuid(),
  course_id    text not null,
  course_name  text,
  lecturer_name text,
  status       text not null default 'active',   -- 'active' | 'closed'
  started_at   timestamptz default now(),
  ended_at     timestamptz
);

-- Allow anonymous reads and writes (for the app)
alter table sessions enable row level security;

create policy "Allow anon read"  on sessions for select using (true);
create policy "Allow anon insert" on sessions for insert with check (true);
create policy "Allow anon update" on sessions for update using (true);
