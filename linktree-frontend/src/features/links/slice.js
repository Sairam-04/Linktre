import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import linkService from "./service";

const initialState = {
  links: {
    data: [],
    status: "init",
    error: "",
  },
  newLink : {
    status: "init",
    error: ""
  },
  deleteLinkData : {
    status: "init",
    error: ""
  }
};

export const getAllLinks = createAsyncThunk(
  "links/getAllLinks", // slice name/ reducername
  async (data, { rejectWithValue }) => {
    try {
      const response = await linkService.fetchAllLinks(data.username);
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.message);
    }
  }
);

export const addNewLink = createAsyncThunk(
  "links/addNewLink", // slice name/ reducername
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const response = await linkService.addNewLink({
        linkTitle: data.linkTitle,
        linkUrl: data.linkUrl,
      });
      dispatch(
        getAllLinks({
          username: data.username,
        })
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.message);
    }
  }
);

export const deleteLinkContent = createAsyncThunk(
  "links/delteLinkContent",
  async (data, {rejectWithValue, dispatch}) =>{
    try {
      const response = await linkService.deleteLink(data.id);
      dispatch(
        getAllLinks({
          username: data.username
        })
      );
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.message);
    }
  }
)

export const linkSlice = createSlice({
  name: "links",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllLinks.pending, (state) => {
        state.links.status = "pending";
        state.links.error = "";
      })
      .addCase(getAllLinks.fulfilled, (state, action) => {
        state.links.status = "idle";
        state.links.data = action.payload.socials || [];
        state.links.error = "";
      })
      .addCase(getAllLinks.rejected, (state, action) => {
        state.links.status = "rejected";
        state.links.error = action.payload;
        state.links.data = [];
      });

    builder
      .addCase(addNewLink.pending, (state) => {
        state.newLink.status = "pending";
        state.newLink.error = "";
      })
      .addCase(addNewLink.fulfilled, (state) => {
        state.newLink.status = "idle";
        state.links.error = "";
      })
      .addCase(addNewLink.rejected, (state, action) => {
        state.newLink.status = "rejected";
        state.newLink.error = action.payload;
      });

    builder
      .addCase(deleteLinkContent.pending, (state) => {
        state.deleteLinkData.status = "pending";
        state.deleteLinkData.error = "";
      })
      .addCase(deleteLinkContent.fulfilled, (state) => {
        state.deleteLinkData.status = "idle";
        state.deleteLinkData.error = "";
      })
      .addCase(deleteLinkContent.rejected, (state, action) => {
        state.deleteLinkData.status = "rejected";
        state.deleteLinkData.error = action.payload;
      });
  },
});

export const {} = linkSlice.actions;

export default linkSlice.reducer;
