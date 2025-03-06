import { useState } from "react"
import {Link} from "react-router-dom"
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

export default function Navbar() {

return (
<nav className="bg-white shadow-md fixed w-full top-0 flex justify-between items-center px-8 py-4">
<Link to="/homepage" className="text-xl font-bold hover:text-blue-500">Min side </Link>
<div className="flex space-x-6">
  <Link to="/lægetyper" className="hover:text-blue-500">Vores lægetyper</Link>
  <Link to="/feature-two" className="hover:text-blue-500">Vores vagttyper</Link>
  <Link to="/feature-three" className="hover:text-blue-500">Mine læger</Link>
  <Link to="/" className="hover:text-blue-500">log ud</Link>
</div>
</nav>
);
}