/*eslint-disable*/
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ReducerType } from '../../../store';
import {
  addFavoriteMovie,
  deleteFavoriteMovie,
} from '../../../store/favoriteMovie/Reducer';
import useDetailInfo from './Hook';
import DetailInfoPresentational from './Presentational';

const DetailInfoContainer = () => {
  const { movieDetailData, favoriteSetting, favorite, user } = useDetailInfo();
  return (
    <DetailInfoPresentational
      movieDetailData={movieDetailData}
      favoriteSetting={favoriteSetting}
      favorite={favorite}
      user={user}
    />
  );
};

export default DetailInfoContainer;
