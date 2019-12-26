import { hash } from "argon2"
import { Router } from "express"
import { BAD_REQUEST, CREATED, OK } from "http-status-codes"

import { ERRORS } from "../constants"
import { User } from "../models/User"

export const setup = Router()

setup.get("/", async (req, res) => {
  const users = await User.findAll()
  const isSetup = users.length > 0
  res.status(OK).send({ setup: isSetup })
})
