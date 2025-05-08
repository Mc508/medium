import { Link } from "react-router-dom";

interface BlogCardProps {
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
  id: string;
}
const BlogCard = ({
  authorName,
  title,
  content,
  publishedDate,
  id,
}: BlogCardProps) => {
  return (
    <div className="flex flex-col justify-center mt-2 p-2 border-b-2 border-gray-200 cursor-pointer">
      <div className="flex gap-4 text-lg font-semibold">
        <div className="">
          <Avatar authorName={authorName} />
        </div>
        <div className="text-sm py-1">{authorName}</div>
        <div className="text-gray-500 text-sm py-1">{publishedDate}</div>
      </div>
      <div className="mt-2 mb-2">
        <Link to={`/blog/${id}`}>
          <div className="text-2xl font-bold">{title}</div>
        </Link>
        <div className="text-sm ">{content.slice(0, 100) + "..."}</div>
      </div>
      <div className="text-gray-500 text-sm">{`${Math.ceil(
        content.length / 100
      )} min read`}</div>
    </div>
  );
};
export default BlogCard;

export function Avatar({ authorName = "anonymous" }: { authorName: string }) {
  return (
    <div className="relative inline-flex items-center justify-center w-6 h-6 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
      <span className="font-medium text-xs text-gray-600 dark:text-gray-300">
        {authorName?.split(" ")[0][0].toUpperCase()}
        {/* {authorName.split(" ")[0][0].toUpperCase() +
          authorName.split(" ")[1][0].toUpperCase()} */}
      </span>
    </div>
  );
}
