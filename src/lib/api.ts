import axios, { AxiosResponse } from 'axios';
import movieDetail from '../types/apiType/movieDetail';
import { MovieSearchResultData } from '../types/apiType/movieSearchResult';
import NowShowComeData from '../types/apiType/nowShowCome';
import { SortedMovie } from '../types/apiType/sortedMovie';

export const getnowshowing = (): Promise<AxiosResponse<NowShowComeData>> => {
  return axios.get(`http://localhost:8001/movieapi/home`);
};

export const getsortedmovie = async (): Promise<AxiosResponse<SortedMovie>> => {
  return axios.get(`http://localhost:8001/movieapi/rank`);
};

export const getmoviedetail = (
  id: string
): Promise<AxiosResponse<movieDetail>> => {
  return axios.post(
    `http://localhost:8001/movieapi/detail`,
    JSON.stringify({ id: id }),
    {
      headers: { 'Content-Type': `application/json` },
    }
  );
};

export const getMovieCommentapi = (MovieId: string) => {
  return axios.post(
    `http://localhost:8001/comment`,
    JSON.stringify({ MovieId }),
    {
      headers: { 'Content-Type': `application/json` },
    }
  );
};

export const addMovieCommentapi = (MovieId: string, content: string) => {
  return axios.post(
    `http://localhost:8001/comment/add`,
    JSON.stringify({ MovieId, content }),
    {
      headers: { 'Content-Type': `application/json` },
    }
  );
};

export const deleteMovieCommentapi = (id: string) => {
  return axios.post(
    `http://localhost:8001/comment/delete`,
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
    `http://localhost:8001/movieapi/search`,
    JSON.stringify({ name: encodeURI(name), page }),
    {
      headers: { 'Content-Type': `application/json` },
    }
  );
};

export const getLikemovieapi = (userId: string) => {
  return axios.post(`http://localhost:8001/like`, JSON.stringify({ userId }), {
    headers: { 'Content-Type': `application/json` },
  });
};

export const addLikemovieapi = (
  movieId: string,
  movieName: string,
  posterPath: string,
  UserId: string
) => {
  return axios.post(
    `http://localhost:8001/like/add`,
    JSON.stringify({ movieId, movieName, posterPath, UserId }),
    {
      headers: { 'Content-Type': `application/json` },
    }
  );
};

export const deleteLikemovieapi = (id: string) => {
  return axios.post(
    `http://localhost:8001/like/delete`,
    JSON.stringify({ id }),
    {
      headers: { 'Content-Type': `application/json` },
    }
  );
};

export const login = () => {
  axios.defaults.withCredentials = true;
  return axios.get(`http://localhost:8001/auth/logincheck`);
};

export const getUserLoggedIn = () => {
  axios.defaults.withCredentials = true;
  return axios.get(`http://localhost:8001/auth/logincheck`);
};

export const userLogout = () => {
  axios.defaults.withCredentials = true;
  return axios.get(`http://localhost:8001/auth/logout`);
};
