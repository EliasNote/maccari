import type { NextConfig } from "next";
import nextBundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = nextBundleAnalyzer({
	enabled: process.env.ANALYZE === "true",
});

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

export default withBundleAnalyzer(nextConfig);
