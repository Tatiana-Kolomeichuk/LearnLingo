import type { Teacher } from "../../types/teacher";
import css from "./TeacherCard.module.css";

interface TeacherCardProps {
  teacher: Teacher;
}

export default function TeacherCard({ teacher }: TeacherCardProps) {
  return (
    <li className={css.card}>
      <img
        className={css.avatar}
        src={teacher.avatar_url}
        alt={`${teacher.name} ${teacher.surname}`}
      />

      <div className={css.content}>
        <p className={css.label}>Languages</p>

        <h2 className={css.name}>
          {teacher.name} {teacher.surname}
        </h2>

        <div className={css.info}>
          <span>Lessons online</span>
          <span>Lessons done: {teacher.lessons_done}</span>
          <span>Rating: {teacher.rating}</span>
          <span>Price / 1 hour: {teacher.price_per_hour}$</span>
        </div>

        <p>
          <b>Speaks:</b> {teacher.languages.join(", ")}
        </p>

        <p>
          <b>Lesson Info:</b> {teacher.lesson_info}
        </p>

        <p>
          <b>Conditions:</b> {teacher.conditions.join(" ")}
        </p>

        <button type="button" className={css.readMoreBtn}>
          Read more
        </button>

        <ul className={css.levels}>
          {teacher.levels.map((level) => (
            <li key={level} className={css.level}>
              #{level}
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}