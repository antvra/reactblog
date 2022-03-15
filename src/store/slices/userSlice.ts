import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  username: null,
  email: null,
  token: null,
  image: null
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.email = action.payload.email
      state.token = action.payload.token
      state.username = action.payload.username
      state.image = action.payload.image
    },
    unsetUser(state) {
      state.email = initialState.email
      state.token = initialState.token
      state.username = initialState.username
      state.image = initialState.image
    }
  }
})

export const { setUser, unsetUser } = userSlice.actions

export default userSlice.reducer
