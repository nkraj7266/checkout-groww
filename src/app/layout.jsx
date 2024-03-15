import "./globals.scss";
import ReduxProvider from "@/redux/reduxProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "@/components/navbar/Navbar";

export const metadata = {
	title: "InstaPayments - Groww",
	description: "InstaPayments - Groww, a simple payment gateway",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body>
				<ReduxProvider>
					<Navbar />
					{children}
				</ReduxProvider>
				<ToastContainer
					position="bottom-center"
					autoClose={3000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
					theme="light"
				/>
			</body>
		</html>
	);
}
