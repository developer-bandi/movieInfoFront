import { render } from '@testing-library/react';
import Footer from './Presentational';

describe('<Footer/>', () => {
  it('전체 화면 검증', () => {
    const utils = render(<Footer />);
    expect(utils.container).toMatchSnapshot();
  });
});
