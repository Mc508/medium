import BlogCard from "../components/BlogCard";
import { BlogCardSkeleton } from "../components/BlogCardSkeleton";
import { useBlogs } from "../hooks";

const Blogs = () => {
  const { loading, blogs } = useBlogs();
  if (loading)
    return (
      <div className="flex flex-col justify-center items-center mx-auto">
        <BlogCardSkeleton />
        <BlogCardSkeleton />
        <BlogCardSkeleton />
        <BlogCardSkeleton />
      </div>
    );
  return (
    <div>
      <div className="flex flex-col items-center justify-center ">
        {blogs.map((blog) => (
          <div key={blog.id} className="min-w-2xl">
            <BlogCard
              authorName={blog.author.name}
              title={blog.title}
              content={blog.content}
              id={blog.id}
              publishedDate="May 23, 2023"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
export default Blogs;
