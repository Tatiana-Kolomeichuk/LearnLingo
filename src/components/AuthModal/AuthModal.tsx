import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Modal from "../Modal/Modal";
import Button from "../Button/Button";
import {
  loginSchema,
  registerSchema,
  type LoginFormValues,
  type RegisterFormValues,
} from "../../schemas/authSchemas";
import css from "./AuthModal.module.css";
import { loginUser, registerUser } from "../../services/authService";

type AuthMode = "login" | "register";

interface AuthModalProps {
  mode: AuthMode;
  onClose: () => void;
}

type AuthFormValues = LoginFormValues | RegisterFormValues;

export default function AuthModal({ mode, onClose }: AuthModalProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const isLogin = mode === "login";
  const schema = isLogin ? loginSchema : registerSchema;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AuthFormValues>({
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });

  const onSubmit = async (data: AuthFormValues) => {
    try {
      if (isLogin) {
        await loginUser({
          email: data.email,
          password: data.password,
        });
      } else {
        if (!("name" in data) || !data.name) {
          return;
        }

        await registerUser({
          name: data.name,
          email: data.email,
          password: data.password,
        });
      }

      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal onClose={onClose}>
      <button
        type="button"
        className={css.closeBtn}
        onClick={onClose}
        aria-label="Close modal"
      >
        <svg width="32" height="32" className={css.closeIcon}>
          <use href={`/public/symbol-defs.svg#icon-x`} />
        </svg>
      </button>

      <h2 className={css.title}>{isLogin ? "Log In" : "Registration"}</h2>

      <p className={css.text}>
        {isLogin
          ? "Welcome back! Please enter your credentials to access your account and continue your search for a teacher."
          : "Thank you for your interest in our platform! In order to register, we need some information. Please provide us with the following information."}
      </p>

      <form className={css.form} onSubmit={handleSubmit(onSubmit)} noValidate>
        {!isLogin && (
          <label className={css.field}>
            <input
              className={css.input}
              type="text"
              placeholder="Name"
              {...register("name" as keyof RegisterFormValues)}
            />
            {"name" in errors && errors.name && (
              <span className={css.error}>{errors.name.message}</span>
            )}
          </label>
        )}

        <label className={css.field}>
          <input
            className={css.input}
            type="email"
            placeholder="Email"
            {...register("email")}
          />
          {errors.email && (
            <span className={css.error}>{errors.email.message}</span>
          )}
        </label>

        <label className={css.field}>
          <input
            className={`${css.input} ${css.passwordInput}`}
            type={isPasswordVisible ? "text" : "password"}
            placeholder="Password"
            {...register("password")}
          />

          <button
            type="button"
            className={css.eyeBtn}
            onClick={() => setIsPasswordVisible((prev) => !prev)}
            aria-label="Toggle password visibility"
          >
            {isPasswordVisible ? "🙈" : <svg width="20" height="20" className={css.eyeIcon}>
          <use href={`/public/symbol-defs.svg#icon-eye-off`} />
        </svg>}
          </button>

          {errors.password && (
            <span className={css.error}>{errors.password.message}</span>
          )}
        </label>

        <Button
          type="submit"
          variant="primary"
          className={css.submitBtn}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Loading..." : isLogin ? "Log In" : "Sign Up"}
        </Button>
      </form>
    </Modal>
  );
}
