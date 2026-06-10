import { NavLink } from "react-router-dom";
import css from "./Header.module.css";

interface HeaderProps {
  onLoginClick: () => void;
  onRegisterClick: () => void;
}

export default function Header({ onLoginClick, onRegisterClick }: HeaderProps) {
  return (
     <header className={css.header}>
      <NavLink to="/" className={css.logo}>
        <span className={css.logoIcon}></span>
        <span className={css.logoText}>LearnLingo</span>
      </NavLink>

      <nav className={css.nav}>
        <NavLink to="/" className={css.navLink}>
          Home
        </NavLink>

        <NavLink to="/teachers" className={css.navLink}>
          Teachers
        </NavLink>
      </nav>

      <div className={css.auth}>
        <button type="button" className={css.loginBtn} onClick={onLoginClick}>
          <span className={css.loginIcon}>↪</span>
          Log in
        </button>

        <button
          type="button"
          className={css.registerBtn}
          onClick={onRegisterClick}
        >
          Registration
        </button>
      </div>
    </header>
  );
}