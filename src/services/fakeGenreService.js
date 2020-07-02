import { genres as gen } from "./fakeDataBase";

export const genres = gen;

export function getGenres() {
  return genres.filter((g) => g);
}
