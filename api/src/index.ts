import bodyParser from "body-parser"
import compression from "compression"
import express from "express"
import morgan from "morgan"

import { sequelize } from "./lib/sequelize"
import { articles } from "./routes/articles"
import { auth } from "./routes/auth"
import { users } from "./routes/users"
import { setup } from "./routes/setup"

const app = express()

app.use(bodyParser.json())
app.use(compression())
app.use(morgan("dev"))

app.use("/api/users", users)
app.use("/api/auth", auth)
app.use("/api/articles", articles)
app.use("/api/setup", setup)

app.listen(8080, async err => {
  if (err) { throw err } // prettier-ignore
  console.log("> Syncing models with database")
  await sequelize.sync({ logging: false })
  console.log("> Ready on http://localhost:3000")
})
