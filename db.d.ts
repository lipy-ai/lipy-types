/* eslint-disable no-use-before-define */

import {
  Channels,
  KnowledgeBaseType,
  MessageData,
  MessageSender,
  OrgUsage,
  TicketActivity,
  UserType,
} from './common'

export interface UserListTable {
  id: string
  email: string
  country: string
  created_at?: string | Date
  updated_at?: string | Date
}

export interface OrgAccessTable {
  user_id: UserListTable['id']
  ord_id: OrgListTable['id']
  type: UserType
}

export interface OrgListTable {
  id: string
  name: string
  picture: string
  usage: OrgUsage
  created_at?: string | Date
  updated_at?: string | Date
}

export interface OrgTicketsTable {
  id: string
  org_id: OrgListTable['id']
  platform: Channels
  activity: TicketActivity
  closed_by: UserListTable['id']
  closed_at: string | Date
  created_at?: string | Date
  updated_at?: string | Date
  archived_at: string | Date
}

export interface OrgMessagesTable {
  id: string
  ticket_id: OrgTicketsTable['id']
  sender_id: string
  sender_type: MessageSender
  data: MessageData
  sent_at: string | Date
}

export interface OrgCustomersTable {
  id: string
  data: Record<string, any>
  blacklisted: boolean
  cooldown: boolean
  platform: MessageChannel
  created_at?: string | Date
  updated_at?: string | Date
}

export interface AssistantKnowledgeBaseTable {
  id: string
  org_id: OrgListTable['id']
  type: KnowledgeBaseType
  data: Record<string, any>
  created_at?: string | Date
  updated_at?: string | Date
}

export interface AssistantIntentsTable {
  id: string
  kb_id: AssistantKnowledgeBaseTable['id']
  action: Record<string, any>
  created_at?: string | Date
  updated_at?: string | Date
}

export interface AssistantTriggersTable {
  id: string
  kb_id: AssistantKnowledgeBaseTable['id']
  intent_id: AssistantIntentsTable['id']
  text: string
  vector: number[]
  embbeding_model: string
  created_at?: string | Date
  updated_at?: string | Date
}

export interface DBTables {
  //User
  'users.list': UserListTable

  //Org
  'orgs.list': OrgListTable
  'orgs.access': OrgAccessTable
  'orgs.tickets': OrgTicketsTable
  'orgs.messages': OrgMessagesTable
  'orgs.customers': OrgCustomersTable

  // Assistant
  'assistants.intents': AssistantIntentsTable
  'assistants.knowledge_base': AssistantKnowledgeBaseTable
  'assistants.triggers': AssistantTriggersTable
}
