export interface SearchMovieInfo {
  title: string;
  id: number;
  posterPath: null | string;
  rate: number;
  release: string;
}

export interface MovieSearchApiData {
  page: number;
  totalPage: number;
  results: SearchMovieInfo[];
}
