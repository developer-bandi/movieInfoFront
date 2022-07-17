import { render, screen } from '@testing-library/react';
import Except from './Presentational';

describe('Except Presentational', () => {
  it('전체 화면 검증', () => {
    const utils = render(<Except text="test" />);
    expect(utils.container).toMatchSnapshot();
    screen.getByText('test');
  });
});
