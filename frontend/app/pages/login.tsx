import { useState } from "react";
import { useNavigate } from "react-router";
import { Eye, EyeOff } from "lucide-react";
import { Hospital } from "lucide-react";


export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showpassword, setShowPassword] = useState(false)

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    navigate("/homepage");
   
  };

  return (
    <div 
      className="flex flex-col items-center h-screen justify-screen pt-10">
      <Hospital size={60}/>
      <h1 className="text-2xl font-semibold text-gray-700 text-center leading-relaxed mb-10.5"> 
        Velkommen til Lægeportalen! 
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
      <div className="relative w-full">
        <input
          type={showpassword ? "text" : "password"}
          placeholder="Password"
          className="border p-2 rounded-lg w-full mb-4 focus:ring-2 focus:ring-blue-500 outline-none transition duration-200"
          pattern="(?=.*[A-Z])(?=.*\d).{6,}"
          title="Adgangskode skal indeholde 6 karakterer med mindst et stort bogstav og et tal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required 
        />
        <button
          type="button"
          className="absolute right-3 top-3 text-gray-600"
          onClick={() => setShowPassword(!showpassword)}
        >
        {showpassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>
        <button type="submit" className="bg-blue-950 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200 cursor-pointer">
          Login
        </button>
      </form>
    </div>
  );
}

