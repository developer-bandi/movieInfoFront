import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import PosterList from './Presentational';
import imagePreload from '../../../lib/imagePreload';
import { RootState } from '../../../modules';
const NowShowingContainer = () => {
  const data = useSelector((state: RootState) => state.homePosterInfo);
  const listNumber = useSelector((state: RootState) => state.posterposition);
  useEffect(() => {
    if (data.nowCommingInfo[0].title !== 'default') {
      data.nowCommingInfo.concat(data.nowShowingInfo).forEach((data) => {
        imagePreload(data.posterPath);
      });
    }
  }, [data]);
  //이미지를 미리 로드하여 포스터 전환시 포스터를 빠르게 보여줍니다.

  return (
    <>
      <PosterList
        result={data.nowShowingInfo}
        title={'현재상영중'}
        listNumber={listNumber.nowshowing}
      />
      <PosterList
        result={data.nowCommingInfo}
        title={'개봉예정작'}
        listNumber={listNumber.nowcomming}
      />
    </>
  );
};

export default NowShowingContainer;
