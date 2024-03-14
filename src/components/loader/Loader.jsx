import React from "react";
import { Oval } from "react-loader-spinner";

const Loader = () => {
	return (
		<Oval
			height="80"
			width="80"
			color="#a3a3a3"
			secondaryColor="#9a9a9a"
			ariaLabel="circles-loading"
			strokeWidth="3"
			visible={true}
		/>
	);
};

export default Loader;
