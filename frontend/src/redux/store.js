
import { configureStore } from "@reduxjs/toolkit"
import userSlice from './user.Slice'

const store = configureStore({
    reducer: {
        user: userSlice
    }

})

export default store