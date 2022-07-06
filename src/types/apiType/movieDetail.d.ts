export interface MovieDetailApiData {
  [index: string]: string | number | string[];
  title: string;
  releaseDate: number;
  genres: string[];
  nation: string;
  runtime: number;
  rate: number;
  posterPath: string;
  overview: string;
  tagline: string;
}
