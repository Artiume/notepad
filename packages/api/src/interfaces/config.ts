import { Options } from "sequelize"

export interface Config {
  secret: string
  database: Options
}
