import produce from 'immer';

const START_LOADING = 'loading/START_LOADING' as const;
const END_LOADING = 'loading/END_LOADING' as const;

export const startLoading = () => ({
  type: START_LOADING,
});

export const endLoading = () => ({
  type: END_LOADING,
});

const initialState = { loading: true };

type Action = ReturnType<typeof startLoading> | ReturnType<typeof endLoading>;

const loadingReducer = (
  state: { loading: boolean } = initialState,
  action: Action
) =>
  produce(state, (draft) => {
    switch (action.type) {
      case START_LOADING:
        draft.loading = true;
        break;

      case END_LOADING:
        draft.loading = false;
        break;
    }
  });

export default loadingReducer;
