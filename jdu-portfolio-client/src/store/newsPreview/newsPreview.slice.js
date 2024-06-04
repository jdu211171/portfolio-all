import { createSlice } from "@reduxjs/toolkit";

export const {
    actions: newsPreviewActions,
    reducer: newsPreviewReducers
} = createSlice({
    name: 'newsPreview',
    initialState: {},
    reducers: {
        setNews: (state, { payload }) => {
            return payload
        }
    }
})