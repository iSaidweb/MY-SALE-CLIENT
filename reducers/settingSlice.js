import { createSlice } from '@reduxjs/toolkit';
const settingSlice = createSlice({
    name: 'setting',
    initialState: {
        aside: false,
    },
    reducers: {
        setShow: (state, {payload}) => {
            switch (payload) {
                case 'aside':
                    state.aside = !state.aside;
                    break;
                default: state.aside = false;
            }
        }
    }
});
export const {setShow} = settingSlice.actions;
export default settingSlice.reducer;