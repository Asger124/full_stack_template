import { useState } from "react";
import { useNavigate } from "react-router";
import { Welcome } from "../welcome/welcome";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
    
    if(email.includes("@") && passwordRegex.test(password)) {

      console.log("login successfull");

      navigate("/homepage");
    } else {
      console.log("handle me later");

      }
      
  };

  return (
    <div className="flex flex-col items-center h-screen justify-screen pt-20">
      <h1 className="text-2xl font-semibold text-gray-900 text-center leading-relaxed mb-20.5"> 
        Velkommen til LægePortalen! 
        <br /> Log venligst ind med E-mail nedenfor
        </h1>
      <form onSubmit={handleSubmit} className="p-6 shadow-lg rounded-lg bg-gray-200 max-w-[550px] w-full hover:bg-white ">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <input
          type="email"
          placeholder="Email"
          className="border p-2 rounded-lg w-full mb-2 focus:ring-2 focus:ring-blue-500 outline-none transition duration-200"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 rounded-lg w-full mb-4 focus:ring-2 focus:ring-blue-500 outline-none transition duration-200"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="bg-blue-950 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200">
          Login
        </button>
      </form>
    </div>
  );
}

