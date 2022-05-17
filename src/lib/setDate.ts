const setDate = (date: Date) => {
  const nowTime = new Date().getTime();
  const writeTime = new Date(date).getTime();
  const timeDiff = (nowTime - writeTime) / 60000;
  let changedDate = null;
  if (timeDiff < 1) {
    changedDate = '방금전';
  } else if (timeDiff < 60) {
    changedDate = `${Math.floor(timeDiff)}분전`;
  } else if (timeDiff < 1440) {
    changedDate = `${Math.floor(timeDiff / 60)}시간 전`;
  } else {
    changedDate = String(date).split('T')[0];
  }
  return changedDate;
};
//날짜를 원하는 형태로 변경하는 함수입니다.

export default setDate;
