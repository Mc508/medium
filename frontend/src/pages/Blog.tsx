import { useParams } from "react-router-dom";
import { useBlog } from "../hooks";
import { Avatar } from "../components/BlogCard";

const Blog = () => {
  const { id } = useParams();
  const { loading, blog } = useBlog({ id: id as string });
  if (loading) return <div>Loading...</div>;
  if (!blog) return <div>Blog not found</div>;
  return (
    <div className="flex justify-center mt-2 max-w-7xl mx-auto">
      <div className="grid grid-cols-12 w-full">
        <div className="col-span-8">
          <div className="text-4xl font-bold ">{blog.title}</div>
          <div className="mt-2">Post on 2nov, 2023</div>
          <div className="text-gray-600 mt-4">{blog.content}</div>
        </div>
        <div className="col-span-4">
          Author  
          <div className="flex gap-3">
            <div className="mt-4 font-bold ">
              <Avatar authorName={blog.author.name} />
            </div>
            <div>
              <div className="text-3xl font-bold">
                {blog.author.name.toUpperCase()}
              </div>
            <div>random text about the author</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Blog;
