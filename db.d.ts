/* eslint-disable no-use-before-define */
import { FaqData } from "./kb"
import {
  Channels,
  InvitationStatus,
  KnowledgeBaseType,
  MessageData,
  MessageSender,
  OrgUsage,
  TicketActivity,
  UserType,
} from "./common"

export interface UserListTable {
  id: string
  name: string
  email: string
  phone_number?: string
  country?: string
  picture?: string
  notifications?: {
    messages: "all" | "direct" | "none"
    communication_emails: boolean
    marketing_email: boolean
  }
  created_at?: string | Date
  updated_at?: string | Date
}

export interface OrgMembersTable {
  org_id: OrgListTable["id"]
  user_id: UserListTable["id"]
  type: UserType
}
export interface OrgInvitationTable {
  id: string
  org_id: OrgListTable["id"]
  user_id: UserListTable["id"]
  invited_by: UserListTable["id"]
  message_id?: string
  status: InvitationStatus
  type: UserType
  invited_at: string | Date
  updated_at?: string | Date
}

export interface OrgListTable {
  id: string
  name: string
  picture: string
  category: string
  bio: string
  usage: OrgUsage
  owner_id: string
  created_at?: string | Date
  updated_at?: string | Date
}

export interface OrgAPIKeysTable {
  org_id: OrgListTable["id"]
  webchat?: string
  openai?: string
  mistral?: string
}

export interface OrgTicketsTable {
  id: string
  org_id: OrgListTable["id"]
  assignee: UserListTable["id"]
  customer: OrgCustomersTable["id"]
  tags: string[]
  status: "open" | "closed"
  star: boolean
  channel: Channels
  activity: TicketActivity[]
  created_at?: string | Date
  updated_at?: string | Date
  archived_at: string | Date
}

export interface OrgMessagesTable {
  id: string
  ticket_id: OrgTicketsTable["id"]
  sender_id: string
  sender_type: MessageSender
  data: MessageData
  sent_at: string | Date
}

export interface OrgCustomersTable {
  id: string
  org_id: OrgListTable["id"]
  name: string | null
  email: string | null
  phone: string | null
  picture?: string
  ip: string
  user_agent: string
  data?: {
    address: {
      city: string
      country: string
      pincode: string
    }
  }
  blacklisted: boolean
  channel: Channels
  created_at?: string | Date
  updated_at?: string | Date
}

export interface AssistantListTable {
  id: string
  org_id: OrgListTable["id"]
  name: string
  description?: string
  picture?: string
  behaviour: "formal" | "casual" | "enthusiastic"
  webchat: {
    initial_message?: string
    quick_actions: Array<string>
    icon?: string
    theme: {
      colors?: { primary: string }
    }
  }
  created_at?: string | Date
  updated_at?: string | Date
}

export interface AssistantKnowledgeBaseTable<
  Type extends KnowledgeBaseType = KnowledgeBaseType
> {
  id: string
  org_id: OrgListTable["id"]
  type: Type
  data: Type extends "faq" ? FaqData : Record<string, any>
  created_at?: string | Date
  updated_at?: string | Date
}

export interface AssistantIntentsTable {
  id: string
  kb_id: AssistantKnowledgeBaseTable["id"]
  action: Record<string, any>
  created_at?: string | Date
  updated_at?: string | Date
}

export interface AssistantTriggersTable {
  id: string
  kb_id: AssistantKnowledgeBaseTable["id"]
  intent_id: AssistantIntentsTable["id"]
  text: string
  vector: number[]
  embbeding_model: string
  created_at?: string | Date
  updated_at?: string | Date
}

export interface DBTables {
  //User
  "users.list": UserListTable

  //Org
  "orgs.list": OrgListTable
  "orgs.members": OrgMembersTable
  "orgs.invitations": OrgInvitationTable
  "orgs.tickets": OrgTicketsTable
  "orgs.messages": OrgMessagesTable
  "orgs.customers": OrgCustomersTable
  "orgs.api_keys": OrgAPIKeysTable

  // Assistant
  "assistants.list": AssistantListTable
  "assistants.intents": AssistantIntentsTable
  "assistants.knowledge_base": AssistantKnowledgeBaseTable
  "assistants.triggers": AssistantTriggersTable
}
