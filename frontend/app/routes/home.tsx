import type { Route } from "./+types/home";
import { Login } from "../pages/login";
import '../app.css';
import { Welcome } from "../welcome/welcome";


export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Login page" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return <Login />;
}
