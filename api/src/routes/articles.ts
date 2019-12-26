import { Router } from "express"
import { check, validationResult } from "express-validator"
import { BAD_REQUEST, NOT_FOUND, CREATED, INTERNAL_SERVER_ERROR, OK } from "http-status-codes"
import slug from "slug"
import { v4 as uuid } from "uuid"

import { ERRORS } from "../constants"
import { authenticate as authMiddleware } from "../middlewares/auth"
import { Article } from "../models/Article"
import { User } from "../models/User"

export const articles = Router()

articles.post(
  "/",
  // prettier-ignore
  [
    check("title").exists().isLength({ min: 1}),
    check("content").exists().isLength({ min: 1 }),
  ],
  authMiddleware,
  async (req, res) => {
    if (!validationResult(req).isEmpty()) {
      return res.status(BAD_REQUEST).send(ERRORS.ARTICLE_MALFORMED)
    }

    try {
      const article = await Article.create({
        ...req.body,
        id: uuid(),
        slug: slug(req.body.title.toLowerCase()),
        authorId: res.locals.user.id,
      })

      res.status(CREATED).send(article)
    } catch (error) {
      res.status(INTERNAL_SERVER_ERROR).send(ERRORS.SERVER_ERROR)
    }
  },
)

articles.get("/", async (req, res) => {
  try {
    res.status(OK).send(await Article.findAll({ include: [User.scope("withoutPassword")] }))
  } catch (error) {
    console.log(error)
    res.status(INTERNAL_SERVER_ERROR).send(ERRORS.SERVER_ERROR)
  }
})

articles.get("/:id", async (req, res) => {
  try {
    let article = await Article.findByPk(req.params.id, { include: [User.scope("withoutPassword")] })
    if (!article) {
      article = await Article.findOne({ where: { slug: req.params.id }, include: [User.scope("withoutPassword")] })
      if (!article) res.status(NOT_FOUND).send(ERRORS.ARTICLE_NOT_FOUND)
    }
    res.status(OK).send(article)
  } catch (error) {
    res.status(INTERNAL_SERVER_ERROR).send(ERRORS.SERVER_ERROR)
  }
})

articles.delete("/:id", authMiddleware, async (req, res) => {
  try {
    res.status(OK).send(await (await Article.findByPk(req.params.id)).destroy())
  } catch (error) {
    res.status(INTERNAL_SERVER_ERROR).send(ERRORS.SERVER_ERROR)
  }
})
