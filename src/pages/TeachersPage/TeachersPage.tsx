import { useEffect, useMemo, useState } from "react";
import Button from "../../components/Button/Button";
import TeacherCard from "../../components/TeacherCard/TeacherCard";
import TeachersFilters from "../../components/TeachersFilters/TeachersFilters";
import { getAllTeachers } from "../../services/teachersService";
import type { Teacher } from "../../types/teacher";
import css from "./TeachersPage.module.css";
import toast from "react-hot-toast";

const TEACHERS_PER_PAGE = 4;

export default function TeachersPage() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [visibleCount, setVisibleCount] = useState(TEACHERS_PER_PAGE);
  const [isFirstLoading, setIsFirstLoading] = useState(true);

  const [language, setLanguage] = useState("");
  const [level, setLevel] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    let isCancelled = false;

    async function fetchTeachers() {
      try {
        const result = await getAllTeachers();
        if (isCancelled) return;
        setTeachers(result);
      } catch {
        toast.error("Failed to load teachers. Please try again later.");
      } finally {
        if (!isCancelled) {
          setIsFirstLoading(false);
        }
      }
    }

    fetchTeachers();

    return () => {
      isCancelled = true;
    };
  }, []);

  const filteredTeachers = useMemo(() => {
    return teachers.filter((teacher) => {
      const matchesLanguage = language
        ? teacher.languages.includes(language)
        : true;

      const matchesLevel = level ? teacher.levels.includes(level) : true;

      const matchesPrice = price
        ? Number(teacher.price_per_hour) === Number(price)
        : true;

      return matchesLanguage && matchesLevel && matchesPrice;
    });
  }, [teachers, language, level, price]);

  const visibleTeachers = useMemo(() => {
    return filteredTeachers.slice(0, visibleCount);
  }, [filteredTeachers, visibleCount]);

  const hasMoreTeachers = visibleCount < filteredTeachers.length;

  const loadMoreTeachers = () => {
    setVisibleCount((prevVisibleCount) => prevVisibleCount + TEACHERS_PER_PAGE);
  };
  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    setVisibleCount(TEACHERS_PER_PAGE);
  };

  const handleLevelChange = (value: string) => {
    setLevel(value);
    setVisibleCount(TEACHERS_PER_PAGE);
  };

  const handlePriceChange = (value: string) => {
    setPrice(value);
    setVisibleCount(TEACHERS_PER_PAGE);
  };

  const clearFilters = () => {
    setLanguage("");
    setLevel("");
    setPrice("");
    setVisibleCount(TEACHERS_PER_PAGE);
  };

  return (
    <main className={css.page}>
      {isFirstLoading ? (
        <p>Loading teachers...</p>
      ) : (
        <>
          <TeachersFilters
            language={language}
            level={level}
            price={price}
            onLanguageChange={handleLanguageChange}
            onLevelChange={handleLevelChange}
            onPriceChange={handlePriceChange}
            onClearFilters={clearFilters}
          />

          {visibleTeachers.length === 0 ? (
            <p className={css.emptyText}>No teachers found.</p>
          ) : (
            <ul className={css.list}>
              {visibleTeachers.map((teacher) => (
                <TeacherCard key={teacher.id} teacher={teacher} />
              ))}
            </ul>
          )}

          {hasMoreTeachers && (
            <Button
              variant="primary"
              onClick={loadMoreTeachers}
              className={css.loadMoreBtn}
            >
              Load more
            </Button>
          )}
        </>
      )}
    </main>
  );
}
