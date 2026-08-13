-- ============================================================
-- Portfolio DB setup
-- Run this whole file in Supabase Dashboard -> SQL Editor -> New query
-- WARNING: this drops the existing tables in this project first.
-- ============================================================

-- 1. Drop old (unrelated) tables
drop table if exists cache cascade;
drop table if exists cache_locks cascade;
drop table if exists failed_jobs cascade;
drop table if exists inboxes cascade;
drop table if exists job_batches cascade;
drop table if exists jobs cascade;
drop table if exists messages cascade;
drop table if exists migrations cascade;
drop table if exists password_reset_tokens cascade;
drop table if exists sessions cascade;
drop table if exists users cascade;

-- 2. Portfolio schema
create table profile (
  id uuid primary key default gen_random_uuid(),
  name text not null default '',
  title text not null default '',
  bio text not null default '',
  email text default '',
  phone text default '',
  location text default '',
  avatar_url text default '',
  resume_url text default '',
  github_url text default '',
  linkedin_url text default '',
  twitter_url text default '',
  website_url text default '',
  updated_at timestamptz not null default now()
);

create table projects (
  id uuid primary key default gen_random_uuid(),
  title text not null default '',
  description text default '',
  tech_stack text default '',
  image_url text default '',
  project_url text default '',
  repo_url text default '',
  featured boolean not null default false,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table experience (
  id uuid primary key default gen_random_uuid(),
  company text not null default '',
  role text not null default '',
  start_date text default '',
  end_date text default '',
  description text default '',
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table education (
  id uuid primary key default gen_random_uuid(),
  school text not null default '',
  degree text default '',
  start_date text default '',
  end_date text default '',
  description text default '',
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table skills (
  id uuid primary key default gen_random_uuid(),
  name text not null default '',
  category text default 'General',
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- 3. Seed one empty profile row so the site always has a record to update
insert into profile (name, title, bio) values ('Your Name', 'Your Title', 'Write a short bio about yourself here.');

-- 4. Row Level Security: public can read, only logged-in users can write
alter table profile enable row level security;
alter table projects enable row level security;
alter table experience enable row level security;
alter table education enable row level security;
alter table skills enable row level security;

create policy "public read profile" on profile for select using (true);
create policy "public read projects" on projects for select using (true);
create policy "public read experience" on experience for select using (true);
create policy "public read education" on education for select using (true);
create policy "public read skills" on skills for select using (true);

create policy "auth write profile" on profile for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "auth write projects" on projects for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "auth write experience" on experience for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "auth write education" on education for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "auth write skills" on skills for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- 5. Storage bucket for uploaded images (avatar, project screenshots)
insert into storage.buckets (id, name, public)
values ('portfolio-media', 'portfolio-media', true)
on conflict (id) do nothing;

create policy "public read portfolio-media" on storage.objects
  for select using (bucket_id = 'portfolio-media');

create policy "auth write portfolio-media" on storage.objects
  for insert with check (bucket_id = 'portfolio-media' and auth.role() = 'authenticated');

create policy "auth update portfolio-media" on storage.objects
  for update using (bucket_id = 'portfolio-media' and auth.role() = 'authenticated');

create policy "auth delete portfolio-media" on storage.objects
  for delete using (bucket_id = 'portfolio-media' and auth.role() = 'authenticated');
