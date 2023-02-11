import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../utils/firebaseSetup";
const initialState = {
  additional_info: "",
  source: "",
  datatype: "",
  title: "Heat Map India",
  data: [""],
  rupees:false,
  status: "idle",
  error: null,
};

export const fetchMenu = createAsyncThunk(
  "menu/fetchMenu",
  async (item) => {
    const { collection, document } = item;
    console.log("inside fetchMenu", collection, document)
    const docRef = doc(db, collection, document);
    const response = await getDoc(docRef);
    if (!response.exists()) {
      throw new Error("No such document!");
    } else {
      return response.data();
    }
  }
);

const menuSlice = createSlice({
    name: "menu",
    initialState,
    reducers: {},
    extraReducers: {
        [fetchMenu.pending]: (state, action) => {
            state.status = "loading";
        },
        [fetchMenu.fulfilled]: (state, action) => {
            state.status = "succeeded";
            state.additional_info = action.payload.additional_info;
            state.source = action.payload.source;
            state.datatype = action.payload.datatype;
            state.title = action.payload.title;
            state.data = action.payload.data;
            state.rupees = action.payload.rupees;
        },
        [fetchMenu.rejected]: (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        }
    }
})

export default menuSlice.reducer;

