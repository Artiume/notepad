import { User } from "./user"

export interface Article {
  id: string
  title: string
  slug: string
  content: string
  createdAt: string
  updatedAt: string
  authorId: string
  author: User
}
