-- Meta ads audit checklist (/meta-ads-audit): completed audits + email rate limit.

create table if not exists public.checklist_results (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null check (char_length(name) between 2 and 100),
  organisation text not null check (char_length(organisation) between 1 and 150),
  email text not null check (char_length(email) between 3 and 200),
  score int not null check (score between 0 and 60),
  section_scores jsonb not null,
  checked_items text[] not null default '{}',
  marketing_opt_in boolean not null default false
);

alter table public.checklist_results enable row level security;

-- The website (public key) may only add rows; no read/update/delete through the API.
grant insert on table public.checklist_results to anon;
create policy "Website can submit checklist results"
  on public.checklist_results for insert to anon with check (true);

-- Email log used only for rate limiting "Send to email". No API access at all.
create table if not exists public.checklist_email_log (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  email text not null
);
alter table public.checklist_email_log enable row level security;
create index if not exists checklist_email_log_email_time on public.checklist_email_log (lower(email), created_at);

-- Returns true (and logs the send) if this address has had fewer than 3 reports
-- in the last 24 hours. Callable by the public key; it only ever returns a boolean.
create or replace function public.allow_checklist_email(p_email text)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
declare
  recent int;
begin
  if p_email is null or char_length(p_email) not between 3 and 200 then
    return false;
  end if;
  select count(*) into recent
    from public.checklist_email_log
    where lower(email) = lower(p_email)
      and created_at > now() - interval '24 hours';
  if recent >= 3 then
    return false;
  end if;
  insert into public.checklist_email_log (email) values (lower(p_email));
  return true;
end;
$$;

revoke all on function public.allow_checklist_email(text) from public, authenticated;
grant execute on function public.allow_checklist_email(text) to anon;
