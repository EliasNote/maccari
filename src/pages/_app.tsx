import "@/styles/globals.css";
import type { AppProps } from "next/app";
import localFont from "next/font/local";

const bankLight = localFont({
	src: [
		{
			path: "../../public/fonts/Bank Gothic Light Regular.otf",
			weight: "300",
			style: "normal",
		},
	],
	variable: "--font-bank-light",
	display: "swap",
});

const bankMediumBT = localFont({
	src: [
		{
			path: "../../public/fonts/bank gothic medium bt.ttf",
			weight: "400",
			style: "normal",
		},
	],
	variable: "--font-bank-medium-bt",
	display: "swap",
});

const bankMdBT = localFont({
	src: [
		{
			path: "../../public/fonts/BankGothic Md BT.ttf",
			weight: "500",
			style: "normal",
		},
	],
	variable: "--font-bank-md-bt",
	display: "swap",
});

const bankGothicMedium = localFont({
	src: [
		{
			path: "../../public/fonts/BankGothicMediumBT.ttf",
			weight: "600",
			style: "normal",
		},
	],
	variable: "--font-bank-gothic-medium",
	display: "swap",
});

const bankBold = localFont({
	src: [
		{
			path: "../../public/fonts/BankGothic Bold.ttf",
			weight: "700",
			style: "normal",
		},
	],
	variable: "--font-bank-bold",
	display: "swap",
});

export default function App({ Component, pageProps }: AppProps) {
	return (
		<div
			className={[
				bankLight.variable,
				bankMediumBT.variable,
				bankMdBT.variable,
				bankGothicMedium.variable,
				bankBold.variable,
			].join(" ")}
		>
			<Component {...pageProps} />
		</div>
	);
}
