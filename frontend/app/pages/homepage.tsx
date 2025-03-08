import { Link } from "react-router-dom";
import {ArrowRightCircleIcon } from "lucide-react"; 
import lægetyper from "./lægetyper.png" 
import afdeling from "./Afdeling.png" 
import vagtyper from "./vagtyper.png" 


export default function Dashboard() {
  const sections = [
    {
      title: "Vores lægetyper",
      description: "Klik her for at tilføje,redigere og slette lægetyper.",
      image: lægetyper,
      path: "/lægetyper",
      icon: <ArrowRightCircleIcon size={20} />,
    },
    {
      title: "Vores vagttyper ",
      description: "Klik her for at tilføje, redigere og slette vagttyper",
      image: vagtyper,
      path: "/vagttyper",
      icon: <ArrowRightCircleIcon size={20} />,
    },
    {
      title: "Mine læger",
      description: "Klik her for at se afdelingens læger.",
      image: afdeling,
      path: "/minelæger",
      icon: <ArrowRightCircleIcon size={20} />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      {/* Page Content */}
      <main className="pt-20 px-8 container mx-auto grid md:grid-cols-3 gap-8">
        {sections.map((section, index) => (
          <Link key={index}
          to={section.path}
           className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center hover:scale-105 hover:ring-2 hover:ring-black">
            <img src={section.image} alt={section.title} className="w-70 h-auto object  -cover rounded-lg" />
            <h2 className="text-lg font-semibold mt-4">{section.title}</h2>
            <p className="text-sm text-gray-600 mt-2 text-center">{section.description}</p>
            <p className="mt-4 flex items-center text-blue-700 hover:underline">
               <span className="mr-1" >Gå til side </span> {section.icon}
              </p>
          </Link>
        ))}
      </main>
    </div>
  );
}
