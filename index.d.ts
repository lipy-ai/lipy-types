// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DBTables } from "./db"

declare module "knex/types/tables" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Tables extends DBTables {}
}

export interface Lipy_Test {
  id: string
}
