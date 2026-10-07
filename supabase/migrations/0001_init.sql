-- Mara Content Lab: initial schema
-- Run in Supabase SQL editor, or with `supabase db push`.
--
-- Access model: Row Level Security is enabled with NO policies, so the public
-- anon key cannot read or write anything. The Next.js server writes using the
-- service role key, which bypasses RLS. A future /admin view should also read
-- server-side with the service role key behind authentication.

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------------------
-- Project requests (submitted from /request)
-- ---------------------------------------------------------------------------
create table if not exists public.project_requests (
  id               uuid primary key default gen_random_uuid(),
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now(),

  status           text not null default 'new'
                   check (status in ('new', 'reviewing', 'accepted', 'declined', 'in_progress', 'delivered', 'archived')),

  -- About the requester
  name             text not null check (char_length(name) between 1 and 120),
  email            text not null check (char_length(email) between 3 and 254),
  role             text not null check (char_length(role) <= 80),
  company          text check (char_length(company) <= 160),
  website          text check (char_length(website) <= 500),

  -- About the source
  source_url       text not null check (char_length(source_url) <= 1000),
  audience         text not null check (char_length(audience) <= 500),
  goal             text not null check (char_length(goal) <= 1500),
  notes            text check (char_length(notes) <= 3000),

  -- Consent record
  consent_terms    boolean not null check (consent_terms = true),
  marketing_opt_in boolean not null default false,
  terms_version    text not null,
  consented_at     timestamptz not null default now(),

  -- Operational
  user_agent       text,
  internal_notes   text
);

create index if not exists project_requests_created_at_idx on public.project_requests (created_at desc);
create index if not exists project_requests_status_idx on public.project_requests (status);
create index if not exists project_requests_email_idx on public.project_requests (lower(email));

-- ---------------------------------------------------------------------------
-- Waitlist entries (submitted from the landing page)
-- ---------------------------------------------------------------------------
create table if not exists public.waitlist_entries (
  id               uuid primary key default gen_random_uuid(),
  created_at       timestamptz not null default now(),
  email            text not null check (char_length(email) between 3 and 254),
  consent          boolean not null check (consent = true),
  consent_text     text not null,
  source           text not null default 'landing',
  unsubscribed_at  timestamptz
);

-- One entry per email, case-insensitive. Duplicate sign-ups are treated as success.
create unique index if not exists waitlist_entries_email_key on public.waitlist_entries (lower(email));

-- ---------------------------------------------------------------------------
-- updated_at trigger
-- ---------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists project_requests_set_updated_at on public.project_requests;
create trigger project_requests_set_updated_at
  before update on public.project_requests
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- Lock down: RLS on, no policies
-- ---------------------------------------------------------------------------
alter table public.project_requests enable row level security;
alter table public.waitlist_entries enable row level security;

revoke all on public.project_requests from anon, authenticated;
revoke all on public.waitlist_entries from anon, authenticated;
