import { configureStore } from '@reduxjs/toolkit'

import { BlogAPI } from './API'
import userReducer from './slices/userSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    [BlogAPI.reducerPath]: BlogAPI.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(BlogAPI.middleware)
})
