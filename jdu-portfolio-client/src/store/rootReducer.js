import { combineReducers } from "@reduxjs/toolkit";
import { newsPreviewReducers } from "./newsPreview/newsPreview.slice";

const rootReducer = combineReducers({
    newsPreview: newsPreviewReducers
})

export default rootReducer