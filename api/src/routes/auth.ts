import { Router } from "express"
import { check, validationResult } from "express-validator"
import { BAD_REQUEST } from "http-status-codes"
import { sign } from "jsonwebtoken"

import { CONFIG, ERRORS } from "../constants"
import { authenticate } from "../lib/authenticate"

export const auth = Router()

auth.post(
  "/login",
  // prettier-ignore
  [
    check("email").exists().isEmail(),
    check("password").exists(),
  ],
  async (req, res, next) => {
    if (!validationResult(req).isEmpty()) {
      return res.status(BAD_REQUEST).send(ERRORS.MISSING_CREDENTIALS)
    }

    try {
      const user = await authenticate(req.body)

      // prettier-ignore
      const token = sign({
        user: user.id,
      }, CONFIG.secret, { expiresIn: 3600 })

      return res.send({ token, expiresIn: 3600 })
    } catch (error) {
      if (!error) {
        res.status(BAD_REQUEST).send(ERRORS.INVALID_CREDENTIALS)
      }

      next(error)
    }
  },
)
