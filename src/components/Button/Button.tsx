import type { ButtonHTMLAttributes, ReactNode } from "react";
import css from "./Button.module.css";

type ButtonVariant = "primary" | "dark" | "text";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
}


export default function Button({
  children,
  variant = "primary",
  className = "",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`${css.button} ${css[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}