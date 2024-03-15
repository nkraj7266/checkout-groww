import { createSlice } from "@reduxjs/toolkit";

const priceSlice = createSlice({
	name: "price",
	initialState: {
		totalPrice: 0,
		discount: 0,
		finalPrice: 0,
	},
	reducers: {
		setTotalPrice: (state, action) => {
			state.totalPrice = action.payload;
		},
		setDiscount: (state, action) => {
			state.discount = action.payload;
		},
		setFinalPrice: (state, action) => {
			state.finalPrice = action.payload;
		},
	},
});

export const { setTotalPrice, setDiscount, setFinalPrice } = priceSlice.actions;
export default priceSlice.reducer;
