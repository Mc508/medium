import { Hono } from "hono"
import { withAccelerate } from "@prisma/extension-accelerate"
import { verify } from "hono/jwt"
import { PrismaClient } from "@prisma/client/edge"

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string
    JWT_SECRET: string
  },
  Variables: {
    userId: string
  }
}>()

blogRouter.use("/*", async (c, next) => {
  const authHeader = c.req.header("authorization") || ""

  const user = await verify(authHeader, c.env.JWT_SECRET)

  if (user) {
    c.set("userId", user.id)
    await next()
  } else {
    c.status(403)
    return c.json({ message: "you ar not login" })
  }
})

blogRouter.post("/", async (c) => {
  const body = await c.req.json()
  const authorId = c.get("userId")
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate())

  const blog = await prisma.blog.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: authorId,
    },
  })

  return c.json({
    id: blog.id,
  })
})
blogRouter.put("/", async (c) => {
  const body = await c.req.json()
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate())

  const blog = await prisma.blog.update({
    where: {
      id: body.id,
    },
    data: {
      title: body.title,
      content: body.content,
      authorId: body.authorId,
    },
  })
  return c.json({
    id: blog.id,
  })
})

blogRouter.get("/", async (c) => {
  const body = await c.req.json()
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate())

  try {
    const blog = await prisma.blog.findFirst({
      where: {
        id: body.id,
      },
    })
    c.status(200)
    return c.json({
      blog,
    })
  } catch (error) {
    c.status(411)
    return c.json({ error: "not found" })
  }
})

// Todo : Add pagination

blogRouter.get("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate())

  try {
    const blogs = await prisma.blog.findMany()
    c.status(200)
    return c.json({
      blogs,
    })
  } catch (error) {
    c.status(411)
    return c.json({ error: "not found" })
  }
})
