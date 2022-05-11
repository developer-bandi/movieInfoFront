import produce from 'immer';

const GET_NOWSHOWING_POSTERPOSITION =
  'posterposition/GET_NOWSHOWING_POSTERPOSITION';
const GET_NOWCOMMING_POSTERPOSITION =
  'posterposition/GET_NOWCOMMING_POSTERPOSITION';

export const getNowShowingPosterposition = ({
  start,
  end,
}: {
  start: number;
  end: number;
}) => ({
  type: GET_NOWSHOWING_POSTERPOSITION,
  payload: {
    start,
    end,
  },
});

export const getNowCommingPosterposition = ({
  start,
  end,
}: {
  start: number;
  end: number;
}) => ({
  type: GET_NOWCOMMING_POSTERPOSITION,
  payload: {
    start,
    end,
  },
});

const initialState = {
  nowshowing: {
    start: 0,
    end: 5,
  },
  nowcomming: {
    start: 0,
    end: 5,
  },
};
type Action =
  | ReturnType<typeof getNowCommingPosterposition>
  | ReturnType<typeof getNowShowingPosterposition>;
interface State {
  nowshowing: { start: number; end: number };
  nowcomming: { start: number; end: number };
}
const posterposition = (state: State = initialState, action: Action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case GET_NOWSHOWING_POSTERPOSITION:
        draft.nowshowing.start = action.payload.start;
        draft.nowshowing.end = action.payload.end;
        break;
      case GET_NOWCOMMING_POSTERPOSITION:
        draft.nowcomming.start = action.payload.start;
        draft.nowcomming.end = action.payload.end;
        break;
    }
  });

export default posterposition;
