import {configureStore} from '@reduxjs/toolkit';
import userSlice from './reducers/userSlice';
import settingSlice from './reducers/settingSlice';
const store = configureStore({
    reducer:{
        user: userSlice,
        setting: settingSlice
    }
})
export default store