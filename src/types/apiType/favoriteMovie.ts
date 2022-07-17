export interface FavoriteMovieInfo {
  id: number;
  movieId: string;
  movieName: string;
  posterPath: string;
}

export type FavoriteMovieApiData = FavoriteMovieInfo[];
