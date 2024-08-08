import { configureStore } from "@reduxjs/toolkit"
import userDataSlice from "./sessionReducer"

const store = configureStore({
    reducer: {
        userDataSlice: userDataSlice.reducer,
    }
})

export default store