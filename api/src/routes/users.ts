import { hash } from "argon2"
import { Router } from "express"
import { check, validationResult } from "express-validator"
import { BAD_REQUEST, CREATED, OK } from "http-status-codes"
import { v4 as uuid } from "uuid"

import { ERRORS } from "../constants"
import { allowInitialUser, authenticate } from "../middlewares/auth"
import { User } from "../models/User"

export const users = Router()

users.post(
  "/",
  // prettier-ignore
  [
    check("firstName").exists().isLength({ min: 1}),
    check("lastName").exists().isLength({min: 1}),
    check("email").exists().isEmail(),
    check("password").exists().isLength({ min: 8 }),
  ],
  allowInitialUser,
  async (req, res, next) => {
    if (!validationResult(req).isEmpty()) {
      return res.status(BAD_REQUEST).send(ERRORS.USER_MALFORMED)
    }

    try {
      const user = await User.create({
        ...req.body,
        id: uuid(),
        password: await hash(req.body.password),
      })

      res.status(CREATED).send(user)
    } catch (error) {
      error.name === "SequelizeUniqueConstraintError" ? res.status(BAD_REQUEST).send(ERRORS.USER_EXISTS) : next(error)
    }
  },
)

users.get("/", authenticate, async (req, res, next) => {
  try {
    res.status(OK).send(await User.scope("withoutPassword").findAll())
  } catch (error) {
    next(error)
  }
})

users.get("/:id", authenticate, async (req, res, next) => {
  try {
    if (req.params.id === "me") {
      return res.status(OK).send(res.locals.user)
    } else {
      const user = await User.findByPk(req.params.id)

      if (user) {
        return res.status(OK).send(user)
      }
    }

    res.status(BAD_REQUEST).send(ERRORS.USER_NOT_FOUND)
  } catch (error) {
    next(error)
  }
})

users.delete("/:id", authenticate, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id)

    if (user) {
      await user.destroy()
      return res.status(OK).send({})
    }

    res.status(BAD_REQUEST).send(ERRORS.USER_NOT_FOUND)
  } catch (error) {
    next(error)
  }
})
