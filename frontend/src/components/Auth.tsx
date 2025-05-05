import { ChangeEvent, useState } from "react";
import { SignUpInput } from "../zod";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const navigate = useNavigate();
  const [postInputs, setPostInputs] = useState<SignUpInput>({
    name: "",
    email: "",
    password: "",
  });

  async function sendRequest() {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`,
        postInputs
      );
      const jwt = response.data.jwt;
      localStorage.setItem("token", jwt);
      navigate("/blogs");
    } catch (error) {
      console.log(error);
      alert("something went wrong" + error);
    }
  }

  return (
    <div className="flex justify-center items-center w-full min-h-screen">
      <div className="flex flex-col justify-center">
        <div className="px-10">
          <div className="text-4xl font-bold">
            {type === "signup" ? "Create an account" : "Login to your account"}
          </div>
          <div className="text-gray-500 text-xl">
            Already have an account?{" "}
            <a href="/signin" className="text-blue-500 hover:underline">
              Login
            </a>
          </div>
        </div>

        <div className="pt-4">
          {type === "signup" ? (
            <LabelledInput
              label="Name"
              placeholder="Enter your name"
              onChange={(e) =>
                setPostInputs({ ...postInputs, name: e.target.value })
              }
            />
          ) : null}
          <LabelledInput
            label="Username"
            placeholder="Enter your username"
            onChange={(e) =>
              setPostInputs({ ...postInputs, email: e.target.value })
            }
          />
          <LabelledInput
            label="Password"
            placeholder="Enter your password"
            type={"password"}
            onChange={(e) =>
              setPostInputs({ ...postInputs, password: e.target.value })
            }
          />
        </div>

        <button
          type="submit"
          onClick={sendRequest}
          className="bg-black rounded-xl text-white w-full mt-3 text-xl p-2 "
        >
          {type === "signup" ? "Signup" : "Login"}
        </button>
      </div>
    </div>
  );
};
interface LabeledInputProps {
  label: string;
  placeholder: string;

  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}
function LabelledInput({
  label,
  placeholder,
  onChange,

  type,
}: LabeledInputProps) {
  return (
    <div>
      <label className="block p-2 text-sm font-medium text-black">
        {label}
      </label>
      <input
        type={type || "text"}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 "
        placeholder={placeholder}
        onChange={onChange}
        required
      />
    </div>
  );
}
