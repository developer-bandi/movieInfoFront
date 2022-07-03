import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import PosterList from './Presentational';
import imagePreload from '../../../lib/imagePreload';
import { ReducerType } from '../../../store';
const NowShowingContainer = () => {
  const postersData = useSelector((state: ReducerType) => state.homePoster);
  useEffect(() => {
    if (postersData.content.posterList !== undefined) {
      postersData.content.posterList.nowCommingInfo
        .concat(postersData.content.posterList.nowShowingInfo)
        .forEach((posterData) => {
          imagePreload(posterData.posterPath);
        });
    }
  }, [postersData]);
  //이미지를 미리 로드하여 포스터 전환시 포스터를 빠르게 보여줍니다.

  return (
    <>
      <PosterList
        postersData={postersData}
        title={'현재상영중'}
        page={postersData.content.page.nowShowingInfo}
      />
      <PosterList
        postersData={postersData}
        title={'개봉예정작'}
        page={postersData.content.page.nowCommingInfo}
      />
    </>
  );
};

export default NowShowingContainer;
