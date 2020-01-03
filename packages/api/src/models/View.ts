import { Table, Model, IsUUID, PrimaryKey, Column, CreatedAt, BelongsTo, ForeignKey } from "sequelize-typescript"
import { Article } from "./Article"

@Table
export class View extends Model<View> {
  @IsUUID(4)
  @PrimaryKey
  @Column
  id!: string

  @Column
  ip: string

  @CreatedAt
  @Column
  createdAt!: Date

  @BelongsTo(() => Article)
  article!: Article

  @ForeignKey(() => Article)
  articleId!: string
}
