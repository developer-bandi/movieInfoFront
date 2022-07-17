import setDate from './setDate';
describe('setDate', () => {
  const date = new Date();
  it('방금전 표시', () => {
    date.setTime(date.getTime() - 2000);
    expect(setDate(date)).toBe('방금전');
  });
  it('*분전 표시', () => {
    date.setTime(date.getTime() - 120000);
    expect(setDate(date)).toBe('2분전');
  });
  it('*시간전 표시', () => {
    date.setTime(date.getTime() - 7200000);
    expect(setDate(date)).toBe('2시간 전');
  });
  it('****-**-** 표시', () => {
    date.setTime(date.getTime() - 96400000);
    expect(setDate(date)).toBe(String(date).split('T')[0]);
  });
});
