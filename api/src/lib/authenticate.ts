import { verify } from "argon2"
import { User } from "../models/User"

export const authenticate = async ({ email, password }): Promise<User> => {
  try {
    const user = await User.findOne({ where: { email } })

    if (user && (await verify(user.password, password))) {
      return Promise.resolve(user)
    }

    return Promise.reject()
  } catch (error) {
    return Promise.reject(error)
  }
}
