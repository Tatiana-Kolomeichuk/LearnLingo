import {
  get,
  limitToFirst,
  orderByKey,
  query,
  ref,
  startAfter,
} from "firebase/database";
import { database } from "./firebase";
import type { Teacher } from "../types/teacher";

interface GetTeachersResult {
  teachers: Teacher[];
  lastKey: string | null;
}

export async function getTeachers(
  limit = 4,
  lastKey: string | null = null
): Promise<GetTeachersResult> {
  const teachersRef = ref(database, "/");

  const teachersQuery = lastKey
    ? query(teachersRef, orderByKey(), startAfter(lastKey), limitToFirst(limit))
    : query(teachersRef, orderByKey(), limitToFirst(limit));

  const snapshot = await get(teachersQuery);

  if (!snapshot.exists()) {
    return {
      teachers: [],
      lastKey: null,
    };
  }

  const data = snapshot.val() as Record<string, Omit<Teacher, "id">>;

  const teachers = Object.entries(data).map(([id, teacher]) => ({
    id,
    ...teacher,
  }));

  return {
    teachers,
    lastKey: teachers.at(-1)?.id ?? null,
  };
}


export const getAllTeachers = async () => {
  const teachersRef = ref(database, "/");
  const snapshot = await get(teachersRef);

  if (!snapshot.exists()) {
    return [];
  }

  const data = snapshot.val();

  return Object.entries(data).map(([id, teacher]) => ({
    id,
    ...(teacher as Omit<Teacher, "id">),
  }));
};