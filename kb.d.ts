import { AssistantKnowledgeBaseTable } from "./db"

export type FAQ = AssistantKnowledgeBaseTable & {
  data: {
    question: string
    answer: string
  }
}
