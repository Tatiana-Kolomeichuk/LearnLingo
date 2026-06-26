import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Modal from "../Modal/Modal";
import Button from "../Button/Button";
import {
  bookingSchema,
  type BookingFormValues,
} from "../../schemas/bookingSchema";
import type { Teacher } from "../../types/teacher";
import css from "./BookingModal.module.css";

interface BookingModalProps {
  teacher: Teacher;
  onClose: () => void;
}

const reasons = [
  "Career and business",
  "Lesson for kids",
  "Living abroad",
  "Exams and coursework",
  "Culture, travel or hobby",
];

export default function BookingModal({ teacher, onClose }: BookingModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<BookingFormValues>({
    resolver: yupResolver(bookingSchema),
    mode: "onSubmit",
  });

  const onSubmit = (data: BookingFormValues) => {
    console.log("Booking data:", data);
    console.log("Teacher:", teacher);
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

      <h2 className={css.title}>Book trial lesson</h2>

      <p className={css.text}>
        Our experienced tutor will assess your current language level, discuss
        your learning goals, and tailor the lesson to your needs.
      </p>

      <div className={css.teacher}>
        <img
          className={css.avatar}
          src={teacher.avatar_url}
          alt={`${teacher.name} ${teacher.surname}`}
        />

        <div>
          <p className={css.teacherLabel}>Your teacher</p>
          <p className={css.teacherName}>
            {teacher.name} {teacher.surname}
          </p>
        </div>
      </div>

      <form className={css.form} onSubmit={handleSubmit(onSubmit)} noValidate>
        <fieldset className={css.fieldset}>
          <legend className={css.legend}>
            What is your main reason for learning English?
          </legend>

          <div className={css.radioGroup}>
            {reasons.map((reason) => (
              <label key={reason} className={css.radioLabel}>
                <input type="radio" value={reason} {...register("reason")} />
                <span>{reason}</span>
              </label>
            ))}
          </div>

          {errors.reason && (
            <span className={css.error}>{errors.reason.message}</span>
          )}
        </fieldset>

        <label className={css.field}>
          <input
            className={css.input}
            type="text"
            placeholder="Full Name"
            {...register("name")}
          />
          {errors.name && (
            <span className={css.error}>{errors.name.message}</span>
          )}
        </label>

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
            className={css.input}
            type="tel"
            placeholder="Phone number"
            {...register("phone")}
          />
          {errors.phone && (
            <span className={css.error}>{errors.phone.message}</span>
          )}
        </label>

        <Button
          type="submit"
          variant="primary"
          className={css.submitBtn}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Loading..." : "Book"}
        </Button>
      </form>
    </Modal>
  );
}
