import { ChevronDown, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

const InfoBox = ({ message }: { message: string }) => {
    
    const [isExpanded, setIsExpanded] = useState(false);
    //Used to handle reload issues
    const[mounted,setMount] = useState(false);

    useEffect(() => {
        return () => setMount(true);

      }, []);

      if (!mounted) return null;
    
    //ensures that component is rendered in document body - seperate from the pages that use it.
    return ReactDOM.createPortal(
    (
     <div className="fixed top-25 left-4 bg-white border border-gray-300 shadow-lg rounded-lg p-3 max-w-3xs z-50 text-gray-800 transition-all duration-300">
        <div className="flex items-center justify-between" onClick={() => setIsExpanded(!isExpanded)}>
          <span className="font-semibold text-gray-900">Info</span>
          <ChevronDown
            size={18}
            className={`transition-transform ${isExpanded ? "rotate-180" : ""} cursor-pointer`} 
          />
        </div>

        <div
          className={`overflow-hidden transition-all duration-300 ${
            isExpanded ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <p className="mt-2 text-sm text-gray-700">{message}</p>
        </div>
      </div>
    ),
     document.body
 );
};

export default InfoBox;