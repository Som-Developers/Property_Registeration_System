// src/redux/slices/ownerSlice.js
import { createSlice } from "@reduxjs/toolkit"

const ownerSlice = createSlice({
  name: "owner",
  initialState: {
    currentOwnerId: null,
  },
  reducers: {
    setOwnerId: (state, action) => {
      state.currentOwnerId = action.payload
    },
    clearOwnerId: (state) => {
      state.currentOwnerId = null
    },
  },
})

export const { setOwnerId, clearOwnerId } = ownerSlice.actions
export default ownerSlice.reducer
