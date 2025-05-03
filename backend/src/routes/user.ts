import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge"
import { withAccelerate } from "@prisma/extension-accelerate"
import { sign } from "hono/jwt";
import { signinInput, signupInput } from "../zod";

export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    }
}>();

userRouter.post("/signup", async (c) => {
  // console.log(c.env.DATABASE_URL);
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate())

  const body = await c.req.json()
  const {success} = signupInput.safeParse(body)
  if (!success) {
    c.status(400)
    return c.json({ error: "invalid input" })
  }
  try {
    const user = await prisma.user.create({
      data: {
        email: body.email,
        name: body.name,
        password: body.password,
      },
    })
    console.log(c.env?.JWT_SECRET)
    const secret = c.env.JWT_SECRET
    const jwt = await sign({ id: user.id }, secret, "HS256")
    console.log(jwt)
    return c.json({ jwt })
  } catch (e) {
    c.status(403)
    return c.json({ error: "error while signing up" })
  }
})
userRouter.post("/signin", async (c) => {
  const body = await c.req.json()
  const {success} = signinInput.safeParse(body)
  if (!success) {
    c.status(400)
    return c.json({ error: "invalid input" })
  }
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate())

  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
      password: body.password,
    },
  })
  if (!user) {
    c.status(403)
    return c.json({ error: "user not found" })
  }

  const jwt = await sign({ id: user.id }, c.env.JWT_SECRET, "HS256")
  return c.json({ jwt })
})
