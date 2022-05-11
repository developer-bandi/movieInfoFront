import axios, { AxiosResponse } from 'axios';
import movieDetail from '../types/apiType/movieDetail';
import { MovieSearchResultData } from '../types/apiType/movieSearchResult';
import NowShowComeData from '../types/apiType/nowShowCome';
import NowShowingVideoData from '../types/apiType/nowshowingvideo';
import { SortedMovie } from '../types/apiType/sortedMovie';

export const getnowshowing = (): Promise<AxiosResponse<NowShowComeData>> => {
  return axios.get(
    `${process.env.REACT_APP_PROXY}/.netlify/functions/nowshowing`
  );
};

export const getnowshowingvideo = (
  id: string
): Promise<AxiosResponse<NowShowingVideoData>> => {
  return axios.post(
    `${process.env.REACT_APP_PROXY}/.netlify/functions/nowshowingvideo`,
    JSON.stringify({ id: id }),
    {
      headers: { 'Content-Type': `application/json` },
    }
  );
};

export const getnowcomming = (): Promise<AxiosResponse<NowShowComeData>> => {
  return axios.get(
    `${process.env.REACT_APP_PROXY}/.netlify/functions/nowcomming`
  );
};

export const getsortedmovie = async (): Promise<AxiosResponse<SortedMovie>> => {
  return axios.get(
    `${process.env.REACT_APP_PROXY}/.netlify/functions/sortedmovie`
  );
};

export const getmoviedetail = (
  id: string
): Promise<AxiosResponse<movieDetail>> => {
  return axios.post(
    `${process.env.REACT_APP_PROXY}/.netlify/functions/moviedetail`,
    JSON.stringify({ id: id }),
    {
      headers: { 'Content-Type': `application/json` },
    }
  );
};

export const getMovieSearchResult = ({
  name,
  page,
}: {
  name: string;
  page: number;
}): Promise<AxiosResponse<MovieSearchResultData>> => {
  return axios.post(
    `${process.env.REACT_APP_PROXY}/.netlify/functions/moviesearchresult`,
    JSON.stringify({ name: encodeURI(name), page }),
    {
      headers: { 'Content-Type': `application/json` },
    }
  );
};
