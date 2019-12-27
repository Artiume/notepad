import {
  Column,
  CreatedAt,
  HasMany,
  IsEmail,
  IsUUID,
  Model,
  PrimaryKey,
  Scopes,
  Table,
  Unique,
  UpdatedAt,
} from "sequelize-typescript"

import { Article } from "./Article"

@Scopes(() => ({
  withoutPassword: {
    attributes: {
      exclude: ["password"],
    },
  },
}))
@Table
export class User extends Model<User> {
  @IsUUID(4)
  @PrimaryKey
  @Column
  id!: string

  @Column
  firstName!: string

  @Column
  lastName!: string

  @Unique
  @IsEmail
  @Column
  email: string

  @Column
  password!: string

  @HasMany(() => Article)
  articles!: Article[]

  @CreatedAt
  @Column
  createdAt!: Date

  @UpdatedAt
  @Column
  updatedAt!: Date
}
