import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  SerializedError,
} from '@reduxjs/toolkit';
import {RootState} from './index.ts';
import {getPromoToday, GetPromoTodayResponse} from '../apis/Promo.ts';

type Scene = 'GetPromoToday';

interface PromoState {
  promoToday?: GetPromoTodayResponse;
  error?: SerializedError;
  status: 'idle' | 'loading' | 'success' | 'failed';
  scene?: Scene;
}

const initialState: PromoState = {
  status: 'idle',
};

export const getPromoTodayAsync = createAsyncThunk<GetPromoTodayResponse, void>(
  'promo/getPromoToday',
  async _ => {
    return await getPromoToday();
  },
);

function getPromoTodayAsyncReducer() {
  return (state: PromoState, action: PayloadAction<GetPromoTodayResponse>) => {
    state.promoToday = action.payload;

    state.status = 'success';
  };
}

export const promoSlice = createSlice({
  name: 'promo',
  initialState,
  reducers: {
    resetStatus: state => {
      state.status = 'idle';
    },
    resetScene: state => {
      state.scene = undefined;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getPromoTodayAsync.pending, state => {
        state.status = 'loading';
        state.scene = 'GetPromoToday';
      })
      .addCase(getPromoTodayAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error;
      })
      .addCase(getPromoTodayAsync.fulfilled, getPromoTodayAsyncReducer());
  },
});

export const {resetStatus, resetScene} = promoSlice.actions;

export const status = (state: RootState) => state.promo.status;
export const scene = (state: RootState) => state.promo.scene;
export const promoToday = (state: RootState) => state.promo.promoToday;

export default promoSlice.reducer;
