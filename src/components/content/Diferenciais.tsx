import styles from "@/styles/content/Diferenciais.module.css";
import Image from "next/image";

const itens = [
	{
		title: "Qualidade",
		icon: "/icons/diferenciais/quality.webp",
		description: `Trabalhamos com rigor técnico e atenção aos detalhes em cada etapa do projeto. Utilizamos métodos atualizados e respeitamos todas as normas para garantir segurança, funcionalidade e durabilidade. A qualidade está presente desde o planejamento até a entrega final.`,
	},
	{
		title: "Custo Acessível",
		icon: "/icons/diferenciais/low-price.webp",
		description: `Acreditamos que soluções bem planejadas não precisam custar caro. Por isso, buscamos sempre o melhor custo-benefício, otimizando materiais, processos e prazos. Nosso compromisso é entregar excelência com responsabilidade financeira.`,
	},
	{
		title: "Confiança",
		icon: "/icons/diferenciais/confiance.webp",
		description:
			"Mais do que clientes, construímos relações de parceria. Atuamos com transparência, ética e comprometimento, oferecendo suporte técnico, clareza nas informações e segurança em todas as decisões. Confiança é a base do nosso trabalho.",
	},
];

export default function Diferenciais() {
	return (
		<section id="diferenciais" className={styles.section}>
			<h2 className={styles.title}>Nossos Diferenciais</h2>
			<div className={styles.grid}>
				{itens.map(({ title, icon, description }) => (
					<div key={title} className={styles.card}>
						<Image
							className={styles.icon}
							src={icon}
							width={120}
							height={120}
							priority
							alt={`${title} icon`}
						/>
						<h3 className={styles.title}>{title}</h3>
						<p className={styles.text}>{description}</p>
					</div>
				))}
			</div>
		</section>
	);
}
