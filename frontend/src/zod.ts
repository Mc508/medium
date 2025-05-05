import z from "zod";

export const signupInput = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
// export const signupInput = z.object({
//   username: z.string().email(),
//   password: z.string().min(8),
//   name: z.string().optional(),
// });

export type SignUpInput = z.infer<typeof signupInput>;

export const signinInput = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type SignInInput = z.infer<typeof signinInput>;

export const createBlogInput = z.object({
  title: z.string(),
  content: z.string(),
});
export type CreateBlogInput = z.infer<typeof createBlogInput>;

export const updateBlogInput = z.object({
  title: z.string(),
  content: z.string(),
  id: z.string(),
});
export type UpdateBlogInput = z.infer<typeof updateBlogInput>;
