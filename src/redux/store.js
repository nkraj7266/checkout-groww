import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./slices/productsSlice";
import paymentReducer from "./slices/paymentSlice";
import themeReducer from "./slices/themeSlice";
import priceReducer from "./slices/priceSlice";

const store = configureStore({
	reducer: {
		products: productsReducer,
		payment: paymentReducer,
		theme: themeReducer,
		price: priceReducer,
	},
});

export default store;
