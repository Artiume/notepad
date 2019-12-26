import {
  BelongsTo,
  Column,
  CreatedAt,
  ForeignKey,
  IsUUID,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from "sequelize-typescript"

import { User } from "./User"

@Table
export class Article extends Model<Article> {
  @IsUUID(4)
  @PrimaryKey
  @Column
  id!: string

  @Column
  title!: string

  @Column
  slug!: string

  @Column
  content!: string

  @BelongsTo(() => User)
  author?: User

  @ForeignKey(() => User)
  authorId?: string

  @CreatedAt
  @Column
  createdAt!: Date

  @UpdatedAt
  @Column
  updatedAt!: Date
}
