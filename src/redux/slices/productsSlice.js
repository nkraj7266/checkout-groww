import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
	name: "products",
	initialState: {
		products: [],
	},
	reducers: {
		addProduct: (state, action) => {
			state.products.push(action.payload);
		},
		updatePrice: (state, action) => {
			const product = state.products.find(
				(product) => product.id === action.payload.id
			);
			if (product) {
				product.price = action.payload.price;
			}
		},
		updateQuantity: (state, action) => {
			const product = state.products.find(
				(product) => product.id === action.payload.id
			);
			if (product) {
				product.quantity = action.payload.quantity;
			}
		},
	},
});

export const { addProduct, updatePrice, updateQuantity } =
	productsSlice.actions;
export default productsSlice.reducer;
