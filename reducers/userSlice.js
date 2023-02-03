import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from 'axios'
const userSlice = createSlice({
    name: 'user',
    initialState: {
        is_auth: false,
        info: {},
        is_admin: false
    },
    reducers: {
        authenticate: async (state,{ payload } = null) => {
            if (payload.type === 'up') {
                axios.post(
                    'http://localhost:5000/api/auth/signup',
                    payload
                ).then(res => {
                    const { success, message, access_token } = res.data;
                    if (!success) {
                        toast.error(message);
                    } else {
                        toast.success(message);
                        localStorage.setItem('ACCESS_TOKEN', access_token);
                        setTimeout(() => {
                            window.location.reload();
                        }, 1500);
                    }
                });
            } else if (payload.type === 'in') {
                axios.post(
                    'http://localhost:5000/api/auth/signin',
                    payload
                ).then(res => {
                    const { success, message, access_token } = res.data;
                    if (!success) {
                        toast.error(message);
                    } else {
                        toast.success(message);
                        localStorage.setItem('ACCESS_TOKEN', access_token);
                        setTimeout(() => {
                            window.location.reload();
                        }, 1500);
                    }
                });
            }
        },
        checkAuth: (state, { payload }) => {
            const { success, userInfo } = payload;
            if (success) {
                state.is_auth = true;
                state.info = userInfo
                state.is_admin = userInfo.is_admin
            } else {
                state.is_auth = false;
            }
        }
    }
});

export const { authenticate, checkAuth } = userSlice.actions;
export default userSlice.reducer;