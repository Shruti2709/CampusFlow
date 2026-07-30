import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm">

      <div className="max-w-7xl mx-auto px-8 py-5 flex justify-between items-center">

        <h1 className="text-3xl font-extrabold text-blue-600">
          CampusFlow
        </h1>

        <div className="flex gap-8 font-medium">

          <Link to="/">Home</Link>

          <Link to="/login">Login</Link>

          <Link to="/register">Register</Link>

        </div>

      </div>

    </nav>
  );
}