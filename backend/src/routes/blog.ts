import { Hono } from "hono";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";
import { PrismaClient } from "@prisma/client/edge";
import { createBlogInput, updateBlogInput } from "../zod";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

blogRouter.use(async (c, next) => {
  const authHeader = c.req.header("authorization") || "";

  const user = await verify(authHeader, c.env.JWT_SECRET);
  if (user) {
    c.set("userId", user.id as string);
    // console.log(c.get("userId"));
    await next();
  } else {
    c.status(403);
    return c.json({ message: "you ar not login" });
  }
});

blogRouter.post("/", async (c) => {
  const body = await c.req.json();
  const { success } = createBlogInput.safeParse(body);
  if (!success) {
    c.status(400);
    return c.json({ error: "invalid input" });
  }
  const authorId = c.get("userId");
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const blog = await prisma.blog.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: authorId,
    },
  });

  return c.json({
    id: blog.id,
  });
});
blogRouter.put("/", async (c) => {
  const body = await c.req.json();
  const { success } = updateBlogInput.safeParse(body);
  if (!success) {
    c.status(400);
    return c.json({ error: "invalid input" });
  }
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const blog = await prisma.blog.update({
    where: {
      id: body.id,
    },
    data: {
      title: body.title,
      content: body.content,
      authorId: body.authorId,
    },
  });
  return c.json({
    id: blog.id,
  });
});

// Todo : Add pagination

blogRouter.get("/all", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const blogs = await prisma.blog.findMany({
      select: {
        content: true,
        id: true,
        title: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });
    c.status(200);
    return c.json({
      blogs,
    });
  } catch (error) {
    c.status(411);
    return c.json({ error: "not found" });
  }
});

blogRouter.get("/:id", async (c) => {
  const id = c.req.param("id");
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const blog = await prisma.blog.findFirst({
      where: {
        id: id,
      },
      select: {
        content: true,
        id: true,
        title: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });
    c.status(200);
    return c.json({
      blog,
    });
  } catch (error) {
    c.status(411);
    return c.json({ error: "not found" });
  }
});
