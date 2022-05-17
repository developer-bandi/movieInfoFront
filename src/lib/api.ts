import axios, { AxiosResponse } from 'axios';
import movieDetail from '../types/apiType/movieDetail';
import { MovieSearchResultData } from '../types/apiType/movieSearchResult';
import NowShowComeData from '../types/apiType/nowShowCome';
import { SortedMovie } from '../types/apiType/sortedMovie';

export const getnowshowing = (): Promise<AxiosResponse<NowShowComeData>> => {
  return axios.get(`${process.env.REACT_APP_SERVER}/movieapi/home`);
};

export const getsortedmovie = async (): Promise<AxiosResponse<SortedMovie>> => {
  return axios.get(`${process.env.REACT_APP_SERVER}/movieapi/rank`);
};

export const getmoviedetail = (
  id: string
): Promise<AxiosResponse<movieDetail>> => {
  return axios.post(
    `${process.env.REACT_APP_SERVER}/movieapi/detail`,
    JSON.stringify({ id: id }),
    {
      headers: { 'Content-Type': `application/json` },
    }
  );
};

export const getMovieCommentapi = (MovieId: string) => {
  return axios.post(
    `${process.env.REACT_APP_SERVER}/comment`,
    JSON.stringify({ MovieId }),
    {
      headers: { 'Content-Type': `application/json` },
    }
  );
};

export const addMovieCommentapi = (MovieId: string, content: string) => {
  return axios.post(
    `${process.env.REACT_APP_SERVER}/comment/add`,
    JSON.stringify({ MovieId, content }),
    {
      headers: { 'Content-Type': `application/json` },
    }
  );
};

export const deleteMovieCommentapi = (id: string) => {
  return axios.post(
    `${process.env.REACT_APP_SERVER}/comment/delete`,
    JSON.stringify({ id }),
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
    `${process.env.REACT_APP_SERVER}/movieapi/search`,
    JSON.stringify({ name: encodeURI(name), page }),
    {
      headers: { 'Content-Type': `application/json` },
    }
  );
};

export const getLikemovieapi = (userId: string) => {
  return axios.post(
    `${process.env.REACT_APP_SERVER}/like`,
    JSON.stringify({ userId }),
    {
      headers: { 'Content-Type': `application/json` },
    }
  );
};

export const addLikemovieapi = (
  movieId: string,
  movieName: string,
  posterPath: string,
  UserId: string
) => {
  return axios.post(
    `${process.env.REACT_APP_SERVER}/like/add`,
    JSON.stringify({ movieId, movieName, posterPath, UserId }),
    {
      headers: { 'Content-Type': `application/json` },
    }
  );
};

export const deleteLikemovieapi = (id: string) => {
  return axios.post(
    `${process.env.REACT_APP_SERVER}/like/delete`,
    JSON.stringify({ id }),
    {
      headers: { 'Content-Type': `application/json` },
    }
  );
};

export const login = () => {
  axios.defaults.withCredentials = true;
  return axios.get(`${process.env.REACT_APP_SERVER}/auth/logincheck`);
};

export const getUserLoggedIn = () => {
  axios.defaults.withCredentials = true;
  return axios.get(`${process.env.REACT_APP_SERVER}/auth/logincheck`);
};

export const userLogout = () => {
  axios.defaults.withCredentials = true;
  return axios.get(`${process.env.REACT_APP_SERVER}/auth/logout`);
};
