import { createSlice } from "@reduxjs/toolkit";

const paymentSlice = createSlice({
	name: "payment",
	initialState: {
		payOption: null,
		orderStatus: null,
		methods: null,
	},
	reducers: {
		addMethods: (state, action) => {
			state.methods = action.payload;
		},
		setPayOptions: (state, action) => {
			state.payOption = action.payload;
		},
		setOrderStatus: (state, action) => {
			state.orderStatus = action.payload;
		},
	},
});

export const { addMethods, setPayOptions, setOrderStatus } =
	paymentSlice.actions;

export default paymentSlice.reducer;
