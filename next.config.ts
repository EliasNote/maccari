import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	reactStrictMode: true,

	async rewrites() {
		return [
			{
				source: "/api/form",
				destination: "/api/Form",
			},
		];
	},
};

export default nextConfig;
