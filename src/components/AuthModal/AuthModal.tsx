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
    formState: { errors },
  } = useForm<AuthFormValues>({
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });

  const onSubmit = (data: AuthFormValues) => {
    console.log(data);
    onClose();
  };

  return (
    <Modal onClose={onClose}>
      <button
        type="button"
        className={css.closeBtn}
        onClick={onClose}
        aria-label="Close modal"
      >
        ×
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
            {isPasswordVisible ? "🙈" : "👁"}
          </button>

          {errors.password && (
            <span className={css.error}>{errors.password.message}</span>
          )}
        </label>

        <Button type="submit" variant="primary" className={css.submitBtn}>
          {isLogin ? "Log In" : "Sign Up"}
        </Button>
      </form>
    </Modal>
  );
}
