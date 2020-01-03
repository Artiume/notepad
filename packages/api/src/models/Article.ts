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
  HasMany,
} from "sequelize-typescript"

import { User } from "./User"
import { View } from "./View"

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
  author!: User

  @ForeignKey(() => User)
  authorId!: string

  @HasMany(() => View)
  views!: View[]

  @CreatedAt
  @Column
  createdAt!: Date

  @UpdatedAt
  @Column
  updatedAt!: Date
}
