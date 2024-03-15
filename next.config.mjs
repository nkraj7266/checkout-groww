/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "fakestoreapi.com",
				pathname: "**",
			},
			{
				protocol: "https",
				hostname: "groww.in",
				pathname: "**",
			},
		],
	},
};

export default nextConfig;
