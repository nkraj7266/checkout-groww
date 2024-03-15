import { toast } from "react-toastify";

let toastDict = {
	position: "bottom-center",
	autoClose: 3000,
	hideProgressBar: false,
	closeOnClick: true,
	pauseOnHover: true,
	draggable: true,
	progress: undefined,
	theme: "dark",
};

export { toastDict, toast };
