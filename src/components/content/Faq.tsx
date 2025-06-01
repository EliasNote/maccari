import { useState } from "react";
import styles from "@/styles/content/Faq.module.css";
import { ChevronDown } from "lucide-react";
import { whatsappIcon, emailIcon } from "@/utils/Icons";
import { whatsappContact } from "@/utils/Data";

const faqs = [
	{
		question: "Quanto tempo leva para desenvolver um projeto arquitetônico?",
		answer:
			"O tempo varia conforme a complexidade do projeto. Projetos residenciais simples levam de 30 a 60 dias, enquanto projetos comerciais ou industriais podem levar de 2 a 6 meses. Fornecemos um cronograma detalhado após a análise inicial.",
	},
	{
		question: "Vocês acompanham a aprovação do projeto na prefeitura?",
		answer:
			"Sim! Oferecemos suporte completo para aprovação junto aos órgãos competentes. Nossa equipe cuida de toda a documentação necessária e acompanha o processo até a liberação final.",
	},
	{
		question: "É possível fazer alterações no projeto durante a execução?",
		answer:
			"Alterações são possíveis, mas devem ser analisadas caso a caso. Pequenos ajustes são normais, mas mudanças significativas podem impactar prazo e orçamento. Sempre discutimos as implicações antes de implementar qualquer alteração.",
	},
	{
		question: "Vocês trabalham com que tipos de projeto?",
		answer:
			"Atendemos projetos residenciais (casas, apartamentos, condomínios), comerciais (lojas, escritórios, shopping centers) e industriais (galpões, fábricas). Também oferecemos reformas, ampliações e consultoria técnica.",
	},
	{
		question: "Como é calculado o valor do projeto?",
		answer:
			"O valor é calculado com base na metragem, complexidade do projeto, tipo de construção e serviços inclusos. Após uma reunião inicial, elaboramos uma proposta detalhada sem compromisso.",
	},
	{
		question: "Vocês oferecem garantia nos projetos?",
		answer:
			"Sim! Oferecemos garantia técnica em todos os nossos projetos. Também prestamos suporte pós-entrega para esclarecimentos e pequenos ajustes que possam ser necessários.",
	},
	{
		question: "É necessário ter o terreno para iniciar o projeto?",
		answer:
			"Não necessariamente. Podemos desenvolver projetos conceituais antes da compra do terreno. Porém, para o projeto executivo, precisamos das informações topográficas e características do terreno.",
	},
	{
		question: "Vocês trabalham em outras cidades além da região?",
		answer:
			"Sim! Atendemos projetos em toda a região e também desenvolvemos projetos para outras localidades. Para obras fora da nossa região base, avaliamos a viabilidade do acompanhamento presencial.",
	},
];

export default function Faq() {
	const [open, setOpen] = useState<number | null>(0);

	const toggle = (idx: number) => {
		setOpen(open === idx ? null : idx);
	};

	const whatsAppLink = whatsappContact("").href;

	return (
		<section className={styles.section}>
			<div className={styles.container}>
				<div className={styles.header}>
					<h2 className={styles.title}>Perguntas Frequentes</h2>
					<p className={styles.subtitle}>
						Esclarecemos as principais dúvidas sobre nossos serviços e
						processos.
					</p>
				</div>

				<div className={styles.grid}>
					{[faqs.slice(0, 4), faqs.slice(4)].map((col, colIdx) => (
						<div key={colIdx} className={styles.column}>
							{col.map((faq, idx) => {
								const actualIdx = colIdx * 4 + idx;
								return (
									<div key={actualIdx} className={styles.item}>
										<button
											className={styles.question}
											onClick={() => toggle(actualIdx)}
										>
											<p>{faq.question}</p>
											<ChevronDown
												className={`${styles.chevron} ${
													open === actualIdx ? styles.open : ""
												}`}
											/>
										</button>
										{open === actualIdx && (
											<div className={styles.answer}>{faq.answer}</div>
										)}
									</div>
								);
							})}
						</div>
					))}
				</div>

				<div className={styles.cta}>
					<h3 className={styles.ctaTitle}>Não encontrou sua resposta?</h3>
					<p className={styles.ctaText}>
						Entre em contato conosco! Nossa equipe está pronta para esclarecer
						todas as suas dúvidas.
					</p>
					<div className={styles.buttons}>
						<a
							href={whatsAppLink}
							target="_blank"
							rel="noopener noreferrer"
							className={styles.whatsapp}
						>
							{whatsappIcon(styles.whatsappIcon)}
							WhatsApp
						</a>
						<a href="mailto:maccariengeqarq@gmail.com" className={styles.email}>
							{emailIcon(styles.emailIcon)}
							E-mail
						</a>
					</div>
				</div>
			</div>
		</section>
	);
}
