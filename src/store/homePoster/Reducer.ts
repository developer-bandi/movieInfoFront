import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HomePosterApiData } from '../../types/apiType/HomePoster';

export interface HomePosterState {
  content: {
    posterList?: HomePosterApiData;
    page: {
      [index: string]: number;
      nowShowingInfo: number;
      nowCommingInfo: number;
    };
  };
  loading: boolean;
  error: string | null;
}

const initialState: HomePosterState = {
  content: {
    page: {
      nowShowingInfo: 1,
      nowCommingInfo: 1,
    },
  },
  loading: true,
  error: null,
};

const HomePosterSlice = createSlice({
  name: 'homePoster',
  initialState,

  reducers: {
    getHomePoster() {},

    getHomePosterSuccess(state, action: PayloadAction<HomePosterApiData>) {
      state.content.posterList = action.payload;
      state.loading = false;
    },

    getHomePosterFailure(state) {
      state.error = '에러 발생';
      state.loading = false;
    },

    movePage(state, action: PayloadAction<{ kind: string; page: number }>) {
      state.content.page[action.payload.kind] = action.payload.page;
    },
  },
});

export const {
  getHomePoster,
  getHomePosterSuccess,
  getHomePosterFailure,
  movePage,
} = HomePosterSlice.actions;

export default HomePosterSlice.reducer;
