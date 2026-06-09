import { Link } from "react-router-dom";


export default function Header() {
  return (
    <header>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/teachers">Teachers</Link>
        <Link to="/favorites">Favorites</Link>
      </nav>
    </header>
  );
}