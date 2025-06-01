import styles from "@/styles/content/Servicos.module.css";
import {
	Users,
	Building2,
	ClipboardCheck,
	Zap,
	Building,
	Shield,
	ArrowRight,
	Droplets,
} from "lucide-react";
import { whatsappContact } from "@/utils/Data";
import { scrollTo } from "@/utils/Scroll";

const services = [
	{
		icon: Users,
		title: "Consultorias Técnicas",
		description:
			"Suporte especializado para empresas, construtores e proprietários que buscam orientações precisas em engenharia e arquitetura.",
		features: [
			"Análise e adequação de projetos",
			"Aprovação de projetos junto ao Corpo de Bombeiros e Prefeitura",
			"Obtenção de alvarás e certificados",
		],
	},
	{
		icon: Building2,
		title: "Projeto Arquitetônico",
		description:
			"Projetos arquitetônicos personalizados e inovadores para residências, estabelecimentos comerciais ou unidades industriais.",
		features: [
			"Foco em funcionalidade, conforto e estética",
			"Projetos sustentáveis",
			"Otimização de espaços",
			"Tecnologias modernas",
		],
	},
	{
		icon: ClipboardCheck,
		title: "Aprovação na Prefeitura",
		description:
			"Gerenciamento completo do processo de aprovação de projetos junto às prefeituras e órgãos públicos competentes.",
		features: [
			"Preparação e protocolo de documentação",
			"Acompanhamento detalhado",
			"agilidade",
			"Obtenção de alvarás, licenças de construção e habite-se",
		],
	},
	{
		icon: Zap,
		title: "Projeto Elétrico",
		description:
			"Projetos elétricos completos garantindo segurança, eficiência energética e conformidade com as normas técnicas da ABNT.",
		features: [
			"Dimensionamento de circuitos",
			"Pontos de iluminação, tomadas, quadro de distribuição e dispositivos de proteção",
			"Automação residencial",
			"Soluções sustentáveis",
		],
	},
	{
		icon: Building,
		title: "Projeto Estrutural",
		description:
			"Soluções estruturais detalhadas e precisas para garantir a segurança e durabilidade de qualquer construção.",
		features: [
			"Fundações, pilares, vigas, lajes e demais componentes",
			"Cálculos rigorosos",
			"Otimização de custos",
			"Obras sólidas e seguras",
		],
	},
	{
		icon: Droplets,
		title: "Projeto Hidrossanitário",
		description:
			"Sistemas hidrossanitários eficientes para residências, comércios e indústrias com foco em sustentabilidade.",
		features: [
			"Abastecimento de água potável",
			"Esgotamento sanitário",
			"Drenagem pluvial",
			"Economia de água e energia",
		],
	},
	{
		icon: Shield,
		title: "Prevenção Contra Incêndios",
		description:
			"Projetos completos de prevenção contra incêndios contemplando todas as exigências do Corpo de Bombeiros e demais regulamentações.",
		features: [
			"Conformidade com normas",
			"Proteção contra riscos",
			"Manutenção de equipamentos",
			"Inspeção periódica",
		],
	},
];

export default function Servicos() {
	const whatsAppLink = whatsappContact("").href;

	return (
		<section id="servicos" className={styles.section}>
			<h2 className={styles.title}>Serviços Prestados</h2>
			<h3>
				A Maccari Engenharia e Arquitetura oferece serviços completos para
				garantir a excelência no seu projeto, desde a concepção até a aprovação
				e execução, sempre com foco em qualidade, segurança e eficiência.
			</h3>
			<div className={styles.grid}>
				{services.map(({ icon: Icon, title, description, features }) => (
					<div key={title} className={styles.card}>
						<div className={styles.iconWrapper}>
							<Icon className={styles.icon} />
						</div>
						<h3 className={styles.title}>{title}</h3>
						<p className={styles.description}>{description}</p>
						<ul className={styles.features}>
							{features.map((f) => (
								<li key={f}>{f}</li>
							))}
						</ul>
						<button
							className={styles.button}
							onClick={() => scrollTo("contato")}
						>
							Saiba mais <ArrowRight className={styles.arrow} size={16} />
						</button>
					</div>
				))}
			</div>
			<div className={styles.cta}>
				<h4>Pronto para começar seu projeto?</h4>
				<p>
					Entre em contato conosco e receba uma proposta personalizada para seu
					projeto.
				</p>
				<a
					href={whatsAppLink}
					target="_blank"
					rel="noopener noreferrer"
					style={{ textDecoration: "none" }}
				>
					<button className={styles.ctaButton}>
						Solicitar orçamento
						<ArrowRight size={16} />
					</button>
				</a>
			</div>
		</section>
	);
}
