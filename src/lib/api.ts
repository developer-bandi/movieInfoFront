import axios from 'axios';
const CryptoJS = require('crypto-js');
export const axiosGetHomePoster = () => {
  return axios.get(`${process.env.REACT_APP_SERVER}/movieapi/home`);
};

export const axiosGetMovieRank = async () => {
  return axios.get(`${process.env.REACT_APP_SERVER}/movieapi/rank`);
};

export const axiosGetMovieDetail = (movieId: string) => {
  return axios.get(
    `${process.env.REACT_APP_SERVER}/movieapi/detail?movieId=${movieId}`
  );
};

export const axiosGetMovieComment = (movieId: string) => {
  return axios.get(
    `${process.env.REACT_APP_SERVER}/comment?movieId=${movieId}`
  );
};

export const axiosPostMovieComment = ({
  movieId,
  content,
}: {
  movieId: string;
  content: string;
}) => {
  return axios.post(`${process.env.REACT_APP_SERVER}/comment/add`, {
    movieId,
    content,
  });
};

export const axiosDeleteMovieComment = (commentId: number) => {
  return axios.delete(`${process.env.REACT_APP_SERVER}/comment/delete`, {
    data: { commentId },
  });
};

export const axiosGetMovieSearch = ({
  keyword,
  page,
}: {
  keyword: string;
  page: number;
}) => {
  return axios.get(
    `${process.env.REACT_APP_SERVER}/movieapi/search?keyword=${encodeURI(
      keyword
    )}&page=${page}`
  );
};

export const axiosGetFavoriteMovie = () => {
  return axios.get(`${process.env.REACT_APP_SERVER}/like`);
};

export const axiosPostFavoriteMovie = (movieInfo: {
  movieId: string;
  movieName: string;
  posterPath: string;
}) => {
  return axios.post(`${process.env.REACT_APP_SERVER}/like/add`, movieInfo);
};

export const axiosDeleteFavoriteMovie = (id: number) => {
  return axios.delete(`${process.env.REACT_APP_SERVER}/like/delete`, {
    data: { id },
  });
};

export const axiosPostLogin = ({
  userid,
  password,
}: {
  userid: string;
  password: string;
}) => {
  return axios.post(`${process.env.REACT_APP_SERVER}/auth/login`, {
    userid,
    password: CryptoJS.AES.encrypt(
      JSON.stringify(password),
      process.env.REACT_APP_SECRET
    ).toString(),
  });
};

export const axiosGetCheckLogin = () => {
  axios.defaults.withCredentials = true;
  return axios.get(`${process.env.REACT_APP_SERVER}/auth/logincheck`);
};

export const axiosGetLogout = () => {
  axios.defaults.withCredentials = true;
  return axios.get(`${process.env.REACT_APP_SERVER}/auth/logout`);
};
