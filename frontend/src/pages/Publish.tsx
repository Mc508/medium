import { useState } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Publish = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const navigate = useNavigate();
  const handleClick = async () => {
    const response = await axios.post(
      `${BACKEND_URL}/api/v1/blog`,
      {
        title,
        content: description,
      },
      {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      }
    );
    navigate(`/blog/${response.data.id}`);
    console.log(response);
  };
  return (
    <div>
      <div className="flex flex-col gap-2 max-w-2xl justify-center mx-auto mt-4">
        <input
          type="text"
          placeholder="title"
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500  "
          placeholder="Write your thoughts here..."
        ></textarea>
      </div>
      <div className="flex justify-center mt-4 max-w-2xl mx-auto">
        <button onClick={handleClick} className="text-white bg-green-600 rounded-2xl p-2">
          Submit
        </button>
      </div>
    </div>
  );
};
export default Publish;
