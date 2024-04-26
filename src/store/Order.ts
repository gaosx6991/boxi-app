import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  SerializedError,
} from '@reduxjs/toolkit';
import {RootState} from './index.ts';
import {
  createOrder,
  CreateOrderRequest,
  CreateOrderResponse,
} from '../apis/Order.ts';

type Scene = 'CreateOrder';

interface OrderState {
  id?: string;
  courierInfo?: {
    id: string;
    avatar: string;
    accountName: string;
    number: string;
    phoneNumber: string;
  };
  error?: SerializedError;
  status: 'idle' | 'loading' | 'success' | 'failed';
  scene?: Scene;
}

const initialState: OrderState = {
  status: 'idle',
};

export const createOrderAsync = createAsyncThunk<
  CreateOrderResponse,
  CreateOrderRequest
>('order/createOrder', async orderDoc => {
  return await createOrder(orderDoc);
});

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(createOrderAsync.pending, state => {
        state.status = 'loading';
        state.scene = 'CreateOrder';
      })
      .addCase(createOrderAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error;
      })
      .addCase(
        createOrderAsync.fulfilled,
        (state, action: PayloadAction<CreateOrderResponse>) => {
          state.status = 'success';

          state.id = action.payload.id;
          state.courierInfo = action.payload.courierInfo;
        },
      );
  },
});

export const status = (state: RootState) => state.order.status;
export const scene = (state: RootState) => state.order.scene;
export const courierInfo = (state: RootState) => state.order.courierInfo;

export default orderSlice.reducer;
