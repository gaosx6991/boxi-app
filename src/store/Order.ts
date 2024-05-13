import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  SerializedError,
} from '@reduxjs/toolkit';
import {RootState} from './index.ts';
import {
  CourierInfo,
  createOrder,
  CreateOrderRequest,
  CreateOrderResponse,
  getOrderActivityList,
  GetOrderActivityListResponse,
} from '../apis/Order.ts';

type Scene =
  | 'CreateOrder'
  | 'GetOnProgressOrderActivityList'
  | 'GetCompleteOrderActivityList';

interface OrderState {
  id?: string;
  courierInfo?: CourierInfo;
  onProgressOrderActivityList?: GetOrderActivityListResponse;
  completeOrderActivityList?: GetOrderActivityListResponse;
  error?: SerializedError;
  status: 'idle' | 'loading' | 'success' | 'failed';
  onProgressActivityListPage: number;
  completeActivityListPage: number;
  onProgressActivityListPageSize: number;
  completeActivityListPageSize: number;
  scene?: Scene;
}

const initialState: OrderState = {
  status: 'idle',
  onProgressActivityListPage: 1,
  completeActivityListPage: 1,
  onProgressActivityListPageSize: 10,
  completeActivityListPageSize: 10,
};

export const createOrderAsync = createAsyncThunk<
  CreateOrderResponse,
  CreateOrderRequest
>('order/createOrder', async orderDoc => {
  return await createOrder(orderDoc);
});

export const getOnProgressOrderActivityListAsync = createAsyncThunk<
  GetOrderActivityListResponse,
  void,
  {state: {order: OrderState}}
>('order/getOnProgressOrderActivityList', async (_, {getState}) => {
  const {
    onProgressActivityListPage: page,
    onProgressActivityListPageSize: pageSize,
  } = getState().order;
  return await getOrderActivityList({
    page,
    pageSize,
    filter: {status: 'On Progress'},
  });
});

function getOnProgressOrderActivityListAsyncReducer() {
  return (
    state: OrderState,
    action: PayloadAction<GetOrderActivityListResponse>,
  ) => {
    if (action.payload.length) {
      if (state.onProgressActivityListPage === 1) {
        state.onProgressOrderActivityList = action.payload;
      } else {
        state.onProgressOrderActivityList = [
          ...(state.onProgressOrderActivityList as GetOrderActivityListResponse),
          ...action.payload,
        ];
      }

      state.onProgressActivityListPage += 1;
    } else if (state.onProgressActivityListPage === 1) {
      state.onProgressOrderActivityList = [];
    }

    state.status = 'success';
  };
}

export const getCompleteOrderActivityListAsync = createAsyncThunk<
  GetOrderActivityListResponse,
  void,
  {state: {order: OrderState}}
>('order/getCompleteOrderActivityList', async (_, {getState}) => {
  const {
    completeActivityListPage: page,
    completeActivityListPageSize: pageSize,
  } = getState().order;
  return await getOrderActivityList({
    page,
    pageSize,
    filter: {status: 'Complete'},
  });
});

function getCompleteOrderActivityListAsyncReducer() {
  return (
    state: OrderState,
    action: PayloadAction<GetOrderActivityListResponse>,
  ) => {
    if (action.payload.length) {
      if (state.completeActivityListPage === 1) {
        state.completeOrderActivityList = action.payload;
      } else {
        state.completeOrderActivityList = [
          ...(state.completeOrderActivityList as GetOrderActivityListResponse),
          ...action.payload,
        ];
      }

      state.completeActivityListPage += 1;
    } else if (state.completeActivityListPage === 1) {
      state.completeOrderActivityList = [];
    }

    state.status = 'success';
  };
}

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    resetStatus: state => {
      state.status = 'idle';
    },
    resetScene: state => {
      state.scene = undefined;
    },
    resetOnProgressActivityListPage: state => {
      state.onProgressActivityListPage = 1;
    },
    resetCompleteActivityListPage: state => {
      state.completeActivityListPage = 1;
    },
  },
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
      )
      .addCase(getOnProgressOrderActivityListAsync.pending, state => {
        state.status = 'loading';
        state.scene = 'GetOnProgressOrderActivityList';
      })
      .addCase(
        getOnProgressOrderActivityListAsync.rejected,
        (state, action) => {
          state.status = 'failed';
          state.error = action.error;
        },
      )
      .addCase(
        getOnProgressOrderActivityListAsync.fulfilled,
        getOnProgressOrderActivityListAsyncReducer(),
      )
      .addCase(getCompleteOrderActivityListAsync.pending, state => {
        state.status = 'loading';
        state.scene = 'GetCompleteOrderActivityList';
      })
      .addCase(getCompleteOrderActivityListAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error;
      })
      .addCase(
        getCompleteOrderActivityListAsync.fulfilled,
        getCompleteOrderActivityListAsyncReducer(),
      );
  },
});

export const {
  resetStatus,
  resetScene,
  resetOnProgressActivityListPage,
  resetCompleteActivityListPage,
} = orderSlice.actions;

export const status = (state: RootState) => state.order.status;
export const scene = (state: RootState) => state.order.scene;
export const courierInfo = (state: RootState) => state.order.courierInfo;
export const onProgressOrderActivityList = (state: RootState) =>
  state.order.onProgressOrderActivityList;
export const completeOrderActivityList = (state: RootState) =>
  state.order.completeOrderActivityList;

export default orderSlice.reducer;
