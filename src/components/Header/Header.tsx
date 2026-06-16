import { NavLink } from "react-router-dom";
import css from "./Header.module.css";
import Button from "../Button/Button";
import { useAuth } from "../../hooks/useAuth";
import { logoutUser } from "../../services/authService";

interface HeaderProps {
  onLoginClick: () => void;
  onRegisterClick: () => void;
}

export default function Header({ onLoginClick, onRegisterClick }: HeaderProps) {
  const { isLoggedIn, isAuthLoading } = useAuth();

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.log(error);
    }
  };
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
        {isAuthLoading ? null : isLoggedIn ? (
          <Button variant="dark" onClick={handleLogout}>
            Log out
          </Button>
        ) : (
          <>
            <Button
              variant="text"
              onClick={onLoginClick}
              className={css.loginBtn}
            >
              <span className={css.loginIcon}>↪</span>
              Log in
            </Button>

            <Button variant="dark" onClick={onRegisterClick}>
              Registration
            </Button>
          </>
        )}
      </div>
    </header>
  );
}
