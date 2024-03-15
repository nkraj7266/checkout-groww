import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
	name: "theme",
	initialState: {
		logo: "https://groww.in/groww-logo-270.png",
		name: "GROWW",
		color: {
			"--background": "hsl(20, 14.3%, 4.1%)",
			"--foreground": "hsl(0, 0%, 95%)",
			"--primary": "hsl(142.1, 70.6%, 45.3%)",
			"--primary-foreground": "hsl(144.9, 80.4%, 10%)",
		},
	},
	reducers: {
		setLogo: (state, action) => {
			state.logo = action.payload;
		},
		setName: (state, action) => {
			state.name = action.payload;
		},
		setColor: (state, action) => {
			state.color = action.payload;
		},
	},
});

export const { setColor, setLogo, setName } = themeSlice.actions;
export default themeSlice.reducer;
