import { useCallback, useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import type { Teacher } from "../types/teacher";

export function useFavorites() {
  const { user, isLoggedIn } = useAuth();
  const [favorites, setFavorites] = useState<Teacher[]>([]);

  const storageKey = user ? `favorites-${user.uid}` : null;

  const refreshFavorites = useCallback(() => {
    if (!storageKey) {
      setFavorites([]);
      return;
    }

    const savedFavorites = localStorage.getItem(storageKey);

    if (!savedFavorites) {
      setFavorites([]);
      return;
    }

    try {
      const parsedFavorites = JSON.parse(savedFavorites) as Teacher[];
      setFavorites(parsedFavorites);
    } catch {
      setFavorites([]);
      localStorage.removeItem(storageKey);
    }
  }, [storageKey]);

  useEffect(() => {
    refreshFavorites();
  }, [refreshFavorites]);

  const toggleFavorite = (teacher: Teacher) => {
    if (!storageKey) return;

    const isAlreadyFavorite = favorites.some(
      favoriteTeacher => favoriteTeacher.id === teacher.id
    );

    const updatedFavorites = isAlreadyFavorite
      ? favorites.filter(favoriteTeacher => favoriteTeacher.id !== teacher.id)
      : [...favorites, teacher];

    setFavorites(updatedFavorites);
    localStorage.setItem(storageKey, JSON.stringify(updatedFavorites));
  };

  const isFavorite = (teacherId: string) => {
    return favorites.some(teacher => teacher.id === teacherId);
  };

  return {
    favorites,
    isLoggedIn,
    toggleFavorite,
    isFavorite,
    refreshFavorites,
  };
}