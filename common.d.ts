export type UserType = 'agent' | 'admin'

export type Channels =
  | 'instagram'
  | 'facebook'
  | 'whatsapp'
  | 'web-chat'
  | 'email'

export type OrgUsage = {
  token_used: number
  available_credits: number
}

export type TicketActivity = {
  type: string
  data: {
    text: string
  }
  timestamp: string | Date
}

export type MessageSender = 'bot' | 'agent' | 'customer'

export type MessageData = {
  text: string
}

export type KnowledgeBaseType = 'faq' | 'website' | 'document'