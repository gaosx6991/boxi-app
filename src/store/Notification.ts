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
  updateNotification,
  UpdateNotificationListRequest,
} from '../apis/Notification.ts';

type Scene = 'GetNotificationList' | 'UpdateNotification';

interface NotificationState {
  currentNotificationId?: string;
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

export const updateNotificationAsync = createAsyncThunk<
  void,
  UpdateNotificationListRequest
>('notification/updateNotification', async request => {
  await updateNotification(request);
});

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
    setCurrentNotificationId: (state, action: PayloadAction<string>) => {
      state.currentNotificationId = action.payload;
    },
    updateNotificationList: (
      state,
      action: PayloadAction<UpdateNotificationListRequest>,
    ) => {
      state.notificationList = state.notificationList!.map(item => {
        if (item.id === action.payload.id) {
          item.isNew = action.payload.isNew;
        }
        return item;
      });
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
      )
      .addCase(updateNotificationAsync.pending, state => {
        state.status = 'loading';
        state.scene = 'UpdateNotification';
      })
      .addCase(updateNotificationAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error;
      })
      .addCase(updateNotificationAsync.fulfilled, state => {
        state.status = 'success';
      });
  },
});

export const {
  resetPage,
  resetStatus,
  resetScene,
  setCurrentNotificationId,
  updateNotificationList,
} = notificationSlice.actions;

export const status = (state: RootState) => state.notification.status;
export const scene = (state: RootState) => state.notification.scene;
export const notificationList = (state: RootState) =>
  state.notification.notificationList;

export default notificationSlice.reducer;
