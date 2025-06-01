import dynamic from "next/dynamic";
import Head from "next/head";

export default function Home() {
	const siteTitle = "Maccari";
	const siteDescription =
		"Especialistas em projetos arquitetônicos, estruturais, elétricos, hidrossanitários, prevenção contra incêndios e consultorias técnicas. Transformamos suas ideias em realidade.";
	const siteUrl = "https://www.seudominio.com.br";

	const Hero = dynamic(() => import("../components/Hero"));
	const Content = dynamic(() => import("../components/content/Content"), {
		ssr: false,
	});
	const Footer = dynamic(() => import("../components/Footer"), { ssr: false });

	return (
		<>
			<Head>
				<title>{siteTitle}</title>
				<meta name="description" content={siteDescription} />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />{" "}
				<link rel="canonical" href={siteUrl} />
				{/* Open Graph / Facebook */}
				<meta property="og:type" content="website" />
				<meta property="og:url" content={siteUrl} />
				<meta property="og:title" content={siteTitle} />
				<meta property="og:description" content={siteDescription} />
				<meta property="og:locale" content="pt_BR" />
				{/* Twitter */}
				<meta property="twitter:card" content="summary_large_image" />
				<meta property="twitter:url" content={siteUrl} />
				<meta property="twitter:title" content={siteTitle} />
				<meta property="twitter:description" content={siteDescription} />
				{/* Palavras-chave */}
				<meta
					name="keywords"
					content="Engenharia civil, Arquitetura residencial, Projeto arquitetônico, Projeto estrutural, Projeto hidrossanitário, Projeto elétrico, Projeto de prevenção contra incêndios, Consultoria técnica engenharia, Aprovação na prefeitura, Gerenciamento de projetos, Sistemas de prevenção de incêndios, Soluções personalizadas em engenharia, Projetos sustentáveis, Engenharia e arquitetura inovadora, Empresa de engenharia familiar, Atendimento personalizado engenharia, Segurança em obras, Engenharia de projetos complementares, Arquitetura funcional e estética, maccari, palmas pr"
				/>
				<meta name="author" content="Maccari Engenharia e Arquitetura" />
			</Head>
			<Hero />
			<Content />
			<Footer />
		</>
	);
}

{
}
