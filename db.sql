create schema assistants;
create schema orgs;
create schema users;

CREATE TABLE users.list (
  id text PRIMARY KEY,
  email text NOT NULL,
  country text NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);


CREATE TABLE orgs.list (
  id text PRIMARY KEY,
  name text NOT NULL,
  picture text NOT NULL,
  usage JSONB NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

CREATE TABLE orgs.access (
  user_id text REFERENCES users.list(id),
  org_id text REFERENCES orgs.list(id),
  type text CHECK(type IN ('agent', 'admin', 'owner')),
  PRIMARY KEY (user_id, org_id)
);


CREATE TABLE orgs.tickets (
  id text PRIMARY KEY,
  org_id text REFERENCES orgs.list(id) not null,
  platform text CHECK(platform IN ('instagram', 'facebook', 'whatsapp', 'web-chat', 'email')),
  activity JSONB NOT NULL,
  closed_by text REFERENCES users.list(id),
  closed_at timestamp with time zone DEFAULT now(),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  archived_at timestamp with time zone DEFAULT now()
);

CREATE TABLE orgs.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_id text REFERENCES orgs.tickets(id),
  sender_id text NOT NULL,
  sender_type text CHECK(sender_type IN ('bot', 'agent', 'customer')),
  data JSONB NOT NULL,
  sent_at timestamp with time zone DEFAULT now()
);

CREATE TABLE orgs.customers (
  id text PRIMARY KEY,
  data JSONB NOT NULL,
  blacklisted BOOLEAN NOT NULL,
  cooldown BOOLEAN NOT NULL,
  platform text CHECK(platform IN ('instagram', 'facebook', 'whatsapp', 'web-chat', 'email')),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

CREATE TABLE assistants.knowledge_base (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id text REFERENCES orgs.list(id),
  type text CHECK(type IN ('faq', 'website', 'document')),
  data JSONB NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

CREATE TABLE assistants.intents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  kb_id UUID REFERENCES assistants.knowledge_base(id),
  action JSONB NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

CREATE TABLE assistants.triggers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  kb_id UUID REFERENCES assistants.knowledge_base(id),
  intent_id UUID REFERENCES assistants.intents(id),
  text text NOT NULL,
  vector DOUBLE PRECISION ARRAY NOT NULL,
  embbeding_model text NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);
