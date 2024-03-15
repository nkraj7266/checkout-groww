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
	},
});

export const { addProduct, updateQuantity, clearProducts } =
	productsSlice.actions;
export default productsSlice.reducer;
