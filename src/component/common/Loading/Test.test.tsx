import { render } from '@testing-library/react';
import Loading from './Presentational';

describe('<Loading/> Presentational', () => {
  it('전체 화면 검증', () => {
    const utils = render(<Loading />);
    expect(utils.container).toMatchSnapshot();
  });
});
