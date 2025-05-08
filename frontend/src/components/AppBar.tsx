import { Link } from "react-router-dom";
import { Avatar } from "./BlogCard";

const AppBar = () => {
  return (
    <div className="flex justify-between px-8 mt-4 shadow p-2">
      <div className="flex gap-2">
        {/* <div>Logo</div> */}
        <div className="text-2xl font-bold">Medium</div>
      </div>

      <div className="flex gap-4">
        <div>
          <Link to={"/publish"}>
            <button className="bg-green-600 rounded-xl p-2 text-white text-sm ">
              Publish
            </button>
          </Link>
        </div>
        <div>...</div>
        {/* <div>Notification</div> */}
        <div>
          <Avatar authorName="John Doe" />
        </div>
      </div>
    </div>
  );
};
export default AppBar;
