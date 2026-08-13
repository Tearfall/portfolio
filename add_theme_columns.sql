-- Run this once in Supabase SQL Editor. Adds theme selection + custom palette to the existing profile table.

alter table profile add column if not exists theme text not null default 'e';
alter table profile add column if not exists color_bg text not null default '#fafaf8';
alter table profile add column if not exists color_surface text not null default '#ffffff';
alter table profile add column if not exists color_ink text not null default '#1c1c1a';
alter table profile add column if not exists color_accent text not null default '#f29e4c';
alter table profile add column if not exists color_accent2 text not null default '#048ba8';
