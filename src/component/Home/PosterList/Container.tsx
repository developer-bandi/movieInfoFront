import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PosterList from './Presentational';
import imagePreload from '../../../lib/imagePreload';
import { ReducerType } from '../../../store';
import { movePage } from '../../../store/homePoster/Reducer';

const NowShowingContainer = ({ title }: { title: string }) => {
  const dispatch = useDispatch();
  const postersData = useSelector((state: ReducerType) => state.homePoster);
  const [nowPage, setNowPage] = useState(
    title === '현재상영중'
      ? postersData.content.page.nowShowingInfo
      : postersData.content.page.nowCommingInfo
  );

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

  const changePage = (position: string) => {
    setNowPage(position === 'prev' ? nowPage - 1 : nowPage + 1);
    dispatch(
      movePage({
        kind: title === '현재상영중' ? 'nowShowingInfo' : 'nowCommingInfo',
        page: nowPage + 1,
      })
    );
  };

  return (
    <>
      <PosterList
        postersData={postersData}
        title={title}
        changePage={changePage}
        page={
          postersData.content.page[
            title === '현재상영중' ? 'nowShowingInfo' : 'nowCommingInfo'
          ]
        }
      />
    </>
  );
};

export default NowShowingContainer;
