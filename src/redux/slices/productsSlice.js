import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
	name: "products",
	initialState: {
		products: [],
		payOption: null,
		orderStatus: null,
	},
	reducers: {
		addProduct: (state, action) => {
			state.products.push(action.payload);
		},
		updateQuantity: (state, action) => {
			const product = state.products.find(
				(product) => product.id === action.payload.id
			);
			if (product) {
				product.quantity = action.payload.quantity;
			}
		},
		clearProducts: (state) => {
			return [];
		},
		setPayOptions: (state, action) => {
			state.payOption = action.payload;
		},
		setOrderStatus: (state, action) => {
			state.orderStatus = action.payload;
		},
	},
});

export const {
	addProduct,
	updateQuantity,
	clearProducts,
	setPayOptions,
	setOrderStatus,
} = productsSlice.actions;
export default productsSlice.reducer;
