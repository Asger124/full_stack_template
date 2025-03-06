import { Link } from "react-router-dom";
import { Home, User, Settings, Info } from "lucide-react"; 

export default function Dashboard() {
  const sections = [
    {
      title: "Vores lægetyper",
      description: "Klik her for at tilføje,redigere og slette lægetyper.",
      image: "https://via.placeholder.com/400",
      path: "/feature-one",
      icon: <Home size={24} />,
    },
    {
      title: "Vores vagttyper ",
      description: "Klik her for at tilføje, redigere og slette vagttyper",
      image: "https://via.placeholder.com/400",
      path: "/feature-two",
      icon: <User size={24} />,
    },
    {
      title: "Mine læger",
      description: "Klik her for at se afdelingens læger.",
      image: "https://via.placeholder.com/400",
      path: "/feature-three",
      icon: <Settings size={24} />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      {/* Navbar */}
      <nav className="bg-white shadow-md fixed w-full top-0 flex justify-between items-center px-8 py-4">
        <h1 className="text-xl font-bold">Min side</h1>
        <div className="flex space-x-6">
          <Link to="/feature-one" className="hover:text-blue-500">Vores lægetyper</Link>
          <Link to="/feature-two" className="hover:text-blue-500">Vores vagttyper</Link>
          <Link to="/feature-three" className="hover:text-blue-500">Mine læger</Link>
          <Link to="/about" className="hover:text-blue-500">About</Link>
        </div>
      </nav>

      {/* Page Content */}
      <main className="pt-20 px-8 container mx-auto grid md:grid-cols-3 gap-8">
        {sections.map((section, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center">
            <img src={section.image} alt={section.title} className="w-full h-40 object-cover rounded-lg" />
            <h2 className="text-lg font-semibold mt-4">{section.title}</h2>
            <p className="text-sm text-gray-600 mt-2 text-center">{section.description}</p>
            <Link
              to={section.path}
              className="mt-4 flex items-center text-blue-500 hover:underline"
            >
              {section.icon} <span className="ml-2">Learn More</span>
            </Link>
          </div>
        ))}
      </main>
    </div>
  );
}
