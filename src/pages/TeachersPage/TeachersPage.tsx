import { useEffect, useState } from "react";
import Button from "../../components/Button/Button";
import TeacherCard from "../../components/TeacherCard/TeacherCard";
import { getTeachers } from "../../services/teachersService";
import type { Teacher } from "../../types/teacher";
import css from "./TeachersPage.module.css";

export default function TeachersPage() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [lastKey, setLastKey] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFirstLoading, setIsFirstLoading] = useState(true);

 useEffect(() => {
  let isCancelled = false;

  async function fetchInitialTeachers() {
    try {
  

      const result = await getTeachers(4, null);


      if (isCancelled) return;

      setTeachers(result.teachers);
      setLastKey(result.lastKey);
    } catch (error) {
      console.log("Teachers error:", error);
    } finally {
      if (!isCancelled) {
        setIsFirstLoading(false);
      }
    }
  }

  fetchInitialTeachers();

  return () => {
    isCancelled = true;
  };
}, []);

  const loadMoreTeachers = async () => {
    try {
      setIsLoading(true);

      const result = await getTeachers(4, lastKey);

      setTeachers((prevTeachers) => [
        ...prevTeachers,
        ...result.teachers,
      ]);

      setLastKey(result.lastKey);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className={css.page}>
      {isFirstLoading ? (
        <p>Loading teachers...</p>
      ) : (
        <>
          <ul className={css.list}>
            {teachers.map((teacher) => (
              <TeacherCard key={teacher.id} teacher={teacher} />
            ))}
          </ul>

          {lastKey && (
            <Button
              variant="primary"
              onClick={loadMoreTeachers}
              disabled={isLoading}
              className={css.loadMoreBtn}
            >
              {isLoading ? "Loading..." : "Load more"}
            </Button>
          )}
        </>
      )}
    </main>
  );
}