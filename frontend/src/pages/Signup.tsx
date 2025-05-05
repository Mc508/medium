import { Auth } from "../components/Auth";
import Quote from "../components/Quote";

const SignUp = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <Auth type="signup" />
      <div className="invisible md:visible">
        <Quote />
      </div>
    </div>
  );
};
export default SignUp;

// implement the signup page with 3 input name email and password also add a submit button and already signup link to login and use styling with tailwind

// const SignUp = () => {
//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
//       <h1 className="text-4xl font-bold mb-6">Sign Up</h1>
//       <form className="bg-white p-6 rounded shadow-md w-full max-w-sm">
//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
//             Name
//           </label>
//           <input
//             type="text"
//             id="name"
//             name="name"
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             placeholder="Enter your name"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
//             Email
//           </label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             placeholder="Enter your email"
//           />
//         </div>
//         <div className="mb-6">
//           <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
//             Password
//           </label>
//           <input
//             type="password"
//             id="password"
//             name="password"
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             placeholder="Enter your password"
//           />
//         </div>
//         <div className="flex items-center justify-between">
//           <button
//             type="submit"
//             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//           >
//             Sign Up
//           </button>
//         </div>
//       </form>
//       <div className="mt-4">
//         <a href="/login" className="text-blue-500 hover:underline">
//           Already signed up? Login
//         </a>
//       </div>
//     </div>

//   )
// }
// export default SignUp
