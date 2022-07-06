export interface MovieInfo {
  id: number;
  title: string;
  overview: string;
  voteAverage: number;
  posterPath: string;
}

export interface MovieRankApiData {
  [index: string]: MovieInfo[];
  topRated: MovieInfo[];
  popular: MovieInfo[];
}
