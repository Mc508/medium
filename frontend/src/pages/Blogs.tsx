import AppBar from "../components/AppBar";
import BlogCard from "../components/BlogCard";
import { useBlogs } from "../hooks";

const Blogs = () => {
  const { loading, blogs } = useBlogs();
  if (loading) return <div>Loading...</div>;
  return (
    <div>
      <AppBar />
      <div className="flex flex-col items-center justify-center ">
        {blogs.map((blog) => (
          <div key={blog.id} 
          className="min-w-2xl">
            <BlogCard
              authorName={blog.author.name}
              title={blog.title}
              content={blog.content}
              publishedDate="May 23, 2023"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
export default Blogs;
