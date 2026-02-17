import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
  },
  reducers: {
    // CREATE
    addUser: (state, action) => {
      state.users.push({
        id: Date.now(),
        name: action.payload,
      });
    },

    // DELETE
    deleteUser: (state, action) => {
      state.users = state.users.filter(
        (user) => user.id !== action.payload
      );
    },

    // UPDATE
    updateUser: (state, action) => {
      const { id, name } = action.payload;
      const user = state.users.find((u) => u.id === id);
      if (user) {
        user.name = name;
      }
    },
  },
});

export const { addUser, deleteUser, updateUser } = userSlice.actions;
export default userSlice.reducer;
