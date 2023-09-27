import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        addItem: (state, action) => {
            state.push(action.payload);
        },
        approveItem: (state, action) => {
            const index = state.findIndex((item) => item.id === action.payload.id);
            if (index !== -1) {
                state[index].status = 'Approved';
            }
        },
        rejectItem: (state, action) => {
            const index = state.findIndex((item) => item.id === action.payload.id);
            if (index !== -1) {
                state[index].status = 'Missing Urgent';
            }
        },
    },
});

export const { addItem, approveItem, rejectItem } = cartSlice.actions;
export default cartSlice.reducer;
