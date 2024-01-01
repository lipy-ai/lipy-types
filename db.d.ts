/* eslint-disable no-use-before-define */

export interface User_List {
  id: string
  email: string
  country: string
  created_at: string | Date
  updated_at: string | Date
}

export interface User_Orgs {
  id: string
  name: string
  picture: string
  owner_id: User_List["id"]
  created_at: string | Date
  updated_at: string | Date
}

export interface User_Org_Access {
  user_id: User_List["id"]
  ord_id: User_Orgs["id"]
  type: "agent" | "admin" | "owner"
}

export interface User_Org_Usage {
  id: string
  token_used: number
  credits: number
  user_id: User_List["id"]
}

export interface Assistant_Intents {
  id: string
  org_id: User_Orgs["id"]
  type: "faq" | "website" | "document"
  data: Record<string, any>
  created_at: string | Date
  updated_at: string | Date
}

export interface Assistant_KnowledgeBase {
  id: string
  org_id: User_Orgs["id"]
  type: "faq" | "website" | "document"
  data: Record<string, any>
  created_at: string | Date
  updated_at: string | Date
}

export interface Assistant_Triggers {
  id: string
  knowledge_base: Assistant_KnowledgeBase["id"]
  text: string
  vector: number[]
  dimension: number
}

export interface Support_Tickets {
  id: string
  org_id: User_Orgs["id"]
  closed_by: User_List["id"]
  closed_at: string | Date
  created_at: string | Date
  updated_at: string | Date
  archived_at: string | Date
}

export interface Support_Messages {
  id: string
  org_id: User_Orgs["id"]
  agent_id: User_List["id"]
  customer_id: string
  type: "instagram" | "facebook" | "whatsapp" | "web-chat" | "email"
  data: Record<string, any>
  sent_at: string | Date
}

export interface Support_Customers {
  id: string
  ref: string
  data: Record<string, any>
  blacklisted: Boolean
  cooldown_till: string | Date
  platform: "web" | "facebook" | "instagram" | "email" | "whatsapp"
}

export interface DBTables {
  //User
  "user.list": User_List
  "user.orgs": User_Orgs
  "user.org_access": User_Org_Access
  "user.org_usage": User_Org_Usage

  // Assistant
  "assistants.intents": Assistant_Intents
  "assistants.knowledge_base": Assistant_KnowledgeBase
  "assistants.triggers": Assistant_Triggers

  // Support
  "support.tickets": Support_Tickets
  "support.messages": Support_Messages
  "support.customers": Support_Customers
}
