// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DBTables } from "./db"

declare module "knex/types/tables" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Tables extends DBTables {}
}

declare module "lipy-ai" {
  export interface Test {
    id: string
  }
}
