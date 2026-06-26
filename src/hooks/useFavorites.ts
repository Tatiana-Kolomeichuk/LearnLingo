import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import type { Teacher } from "../types/teacher";

export function useFavorites() {
  const { user, isLoggedIn } = useAuth();
  const [favorites, setFavorites] = useState<Teacher[]>([]);

  const storageKey = user ? `favorites-${user.uid}` : null;

  useEffect(() => {
    if (!storageKey) {
      setFavorites([]);
      return;
    }

    const savedFavorites = localStorage.getItem(storageKey);

    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    } else {
      setFavorites([]);
    }
  }, [storageKey]);

  const toggleFavorite = (teacher: Teacher) => {
    if (!storageKey) return;

    setFavorites((prevFavorites) => {
      const isAlreadyFavorite = prevFavorites.some(
        (favoriteTeacher) => favoriteTeacher.id === teacher.id
      );

      const updatedFavorites = isAlreadyFavorite
        ? prevFavorites.filter(
            (favoriteTeacher) => favoriteTeacher.id !== teacher.id
          )
        : [...prevFavorites, teacher];

      localStorage.setItem(storageKey, JSON.stringify(updatedFavorites));

      return updatedFavorites;
    });
  };

  const isFavorite = (teacherId: string) => {
    return favorites.some((teacher) => teacher.id === teacherId);
  };

  return {
    favorites,
    isLoggedIn,
    toggleFavorite,
    isFavorite,
  };
}