import TeacherCard from "../../components/TeacherCard/TeacherCard";
import { useFavorites } from "../../hooks/useFavorites";
import css from "./FavoritesPage.module.css";

export default function FavoritesPage() {
  const { favorites, refreshFavorites } = useFavorites();

  return (
    <main className={css.page}>
      {favorites.length === 0 ? (
        <div className={css.emptyState}>
          <h1 className={css.title}>Favorites</h1>
          <p className={css.text}>
            You have not added any teachers to your favorites yet.
          </p>
        </div>
      ) : (
        <ul className={css.list}>
          {favorites.map(teacher => (
            <li key={teacher.id}>
              <TeacherCard
                teacher={teacher}
                onFavoriteChange={refreshFavorites}
              />
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}