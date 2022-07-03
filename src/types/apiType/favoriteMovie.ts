export interface FavoriteMovieInfo {
  id: number;
  movieId: number;
  movieName: string;
  posterPath: string;
}

export type FavoriteMovieApiData = FavoriteMovieInfo[];
