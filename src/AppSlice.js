import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};

const AppSlice = createSlice({
  name: "tableData",
  initialState,
  reducers: {
    addData: (state, action) => {
      //   console.log(action.payload);
      state.data.push(...action.payload);
    },
    updateData: (state, action) => {
      const index = action.payload.index;
      // console.log(action.payload)
      state.data[index].td1 = action.payload.td1;
      state.data[index].td2 = action.payload.td2;
    },
    clearData: (state) => {
      state.data = [];
    },
  },
});

export const { addData, updateData, clearData } = AppSlice.actions;
export default AppSlice.reducer;
