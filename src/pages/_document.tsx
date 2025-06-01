import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
	return (
		<Html lang="ptbr">
			<Head>
				<link
					rel="preload"
					href="/fonts/bank%20gothic%20medium%20bt.ttf"
					as="font"
					type="font/ttf"
					crossOrigin="anonymous"
				/>
				<link
					rel="preload"
					href="/fonts/Bank%20Gothic%20Light%20Regular.otf"
					as="font"
					type="font/otf"
					crossOrigin="anonymous"
				/>
				<link
					rel="preload"
					href="/background.webp"
					as="image"
					fetchPriority="high"
				/>
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
