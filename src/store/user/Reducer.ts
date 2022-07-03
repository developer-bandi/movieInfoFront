import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserApiData } from '../../types/apiType/user';

export interface UserState {
  content?: UserApiData;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  loading: true,
  error: null,
};

const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    checkLoginuser(state) {
      state.loading = true;
    },
    checkLoginuserSuccess(
      state,
      action: PayloadAction<{ data: UserApiData; status: number }>
    ) {
      state.loading = false;
      if (action.payload.status === 200) {
        state.content = action.payload.data;
      }
    },
    checkLoginuserFailure(state) {
      state.error = '에러 발생';
      state.loading = false;
    },
    doLogout(state) {
      state.loading = true;
    },
    doLogoutSuccess(state) {
      state = { loading: true, error: null };
    },
    doLogoutFailure(state) {
      state.error = '에러 발생';
      state.loading = false;
    },
  },
});

export const {
  checkLoginuser,
  checkLoginuserSuccess,
  checkLoginuserFailure,
  doLogout,
  doLogoutSuccess,
  doLogoutFailure,
} = UserSlice.actions;

export default UserSlice.reducer;
