import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navigation from './Presentational';

describe('<Navigation/> Presentational', () => {
  it('전체 화면 검증', () => {
    const utils = render(<Navigation />, { wrapper: MemoryRouter });
    expect(utils.container).toMatchSnapshot();
  });
});
