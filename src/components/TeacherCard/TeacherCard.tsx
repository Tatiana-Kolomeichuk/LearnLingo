import { useState } from "react";
import type { Teacher } from "../../types/teacher";
import css from "./TeacherCard.module.css";
import Button from "../Button/Button";

interface TeacherCardProps {
  teacher: Teacher;
}

export default function TeacherCard({ teacher }: TeacherCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <li className={css.card}>
      <div className={css.avatarWrapper}>
        <img
          className={css.avatar}
          src={teacher.avatar_url}
          alt={`${teacher.name} ${teacher.surname}`}
        />
        <svg width="12" height="12" className={css.onlineDot}>
                        <use href={`/public/symbol-defs.svg#icon-online`} />
                      </svg>
      </div>

      <div className={css.content}>
        <div className={css.topRow}>
          <p className={css.label}>Languages</p>

          <div className={css.stats}>
            <span><svg width="16" height="16" className={css.reviewRating}>
                <use href={`/public/symbol-defs.svg#icon-book-open`} />
              </svg>Lessons online</span>
            <span>Lessons done: {teacher.lessons_done}</span>
            <span>
              {" "}
              <svg width="16" height="16" className={css.reviewRating}>
                <use href={`/public/symbol-defs.svg#icon-star`} />
              </svg>{" "}
              Rating: {teacher.rating}
            </span>
            <span>
              Price / 1 hour:{" "}
              <strong className={css.price}>{teacher.price_per_hour}$</strong>
            </span>
          </div>

          <button
            type="button"
            className={css.heartBtn}
            aria-label="Add to favorites"
          >
         <svg width="26" height="26" className={css.reviewRating}>
                        <use href={`/public/symbol-defs.svg#icon-heart`} />
                      </svg>
          </button>
        </div>

        <h2 className={css.name}>
          {teacher.name} {teacher.surname}
        </h2>

        <div className={css.description}>
          <p>
            <span>Speaks: </span>
            <b className={css.underlined}>{teacher.languages.join(", ")}</b>
          </p>

          <p>
            <span>Lesson Info: </span>
            <b>{teacher.lesson_info}</b>
          </p>

          <p>
            <span>Conditions: </span>
            <b>{teacher.conditions.join(" ")}</b>
          </p>
        </div>

        {!isExpanded && (
          <Button
            variant="text"
            className={css.readMoreBtn}
            onClick={() => setIsExpanded(true)}
          >
            Read more
          </Button>
        )}

        {isExpanded && (
          <div className={css.expanded}>
            <p className={css.experience}>{teacher.experience}</p>

            <ul className={css.reviews}>
              {teacher.reviews.map((review, index) => (
                <li key={index} className={css.review}>
                  <div className={css.reviewHeader}>
                    <div className={css.reviewAvatar}>
                      {review.reviewer_name[0]}
                    </div>

                    <div>
                      <p className={css.reviewName}>{review.reviewer_name}</p>
                      <svg width="16" height="16" className={css.reviewRating}>
                        <use href={`/public/symbol-defs.svg#icon-star`} />
                      </svg>
                      {review.reviewer_rating}
                    </div>
                  </div>

                  <p className={css.reviewComment}>{review.comment}</p>
                </li>
              ))}
            </ul>

            <Button
              variant="text"
              className={css.hideMoreBtn}
              onClick={() => setIsExpanded(false)}
            >
              Hide more
            </Button>
          </div>
        )}
        <ul className={css.levels}>
          {teacher.levels.map((level, index) => (
            <li
              key={level}
              className={`${css.level} ${index === 0 ? css.activeLevel : ""}`}
            >
              #{level}
            </li>
          ))}
        </ul>

        {isExpanded && (
          <Button variant="primary" className={css.bookBtn}>
            Book trial lesson
          </Button>
        )}
      </div>
    </li>
  );
}
