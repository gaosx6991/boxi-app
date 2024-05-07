import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  SerializedError,
} from '@reduxjs/toolkit';
import {RootState} from './index.ts';
import {
  getNotificationList,
  GetNotificationListResponse,
} from '../apis/Notification.ts';

type Scene = 'GetNotificationList';

interface NotificationState {
  notificationList?: GetNotificationListResponse;
  page: number;
  pageSize: number;
  error?: SerializedError;
  status: 'idle' | 'loading' | 'success' | 'failed';
  scene?: Scene;
}

const initialState: NotificationState = {
  status: 'idle',
  page: 1,
  pageSize: 10,
};

export const getNotificationListAsync = createAsyncThunk<
  GetNotificationListResponse,
  void,
  {state: {notification: NotificationState}}
>('notification/getNotificationList', async (_, {getState}) => {
  const {page, pageSize} = getState().notification;
  return await getNotificationList({
    page,
    pageSize,
  });
});

function getNotificationListAsyncReducer() {
  return (
    state: NotificationState,
    action: PayloadAction<GetNotificationListResponse>,
  ) => {
    if (action.payload.length) {
      if (state.page === 1) {
        state.notificationList = action.payload;
      } else {
        state.notificationList = [
          ...(state.notificationList as GetNotificationListResponse),
          ...action.payload,
        ];
      }

      state.page += 1;
    } else if (state.page === 1) {
      state.notificationList = [];
    }

    state.status = 'success';
  };
}

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    resetStatus: state => {
      state.status = 'idle';
    },
    resetScene: state => {
      state.scene = undefined;
    },
    resetPage: state => {
      state.page = 1;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getNotificationListAsync.pending, state => {
        state.status = 'loading';
        state.scene = 'GetNotificationList';
      })
      .addCase(getNotificationListAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error;
      })
      .addCase(
        getNotificationListAsync.fulfilled,
        getNotificationListAsyncReducer(),
      );
  },
});

export const {resetPage, resetStatus, resetScene} = notificationSlice.actions;

export const status = (state: RootState) => state.notification.status;
export const scene = (state: RootState) => state.notification.scene;
export const notificationList = (state: RootState) =>
  state.notification.notificationList;

export default notificationSlice.reducer;
