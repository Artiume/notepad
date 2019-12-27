import { Router } from "express"
import { OK } from "http-status-codes"

import { User } from "../models/User"

export const setup = Router()

setup.get("/", async (req, res) => {
  const users = await User.findAll()
  const isSetup = users.length > 0
  res.status(OK).send({ setup: isSetup })
})
