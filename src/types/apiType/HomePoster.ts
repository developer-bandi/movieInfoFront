export interface PosterInfo {
  id: number;
  title: string;
  overview: string;
  voteAverage: number;
  posterPath: string;
}

export interface HomePosterApiData {
  nowShowingInfo: PosterInfo[];
  nowCommingInfo: PosterInfo[];
  key: string;
}
