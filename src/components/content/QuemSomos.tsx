import styles from "@/styles/content/QuemSomos.module.css";
import {
	CheckCircle,
	Users,
	Target,
	Eye,
	Heart,
	Lightbulb,
	Leaf,
	UserCheck,
} from "lucide-react";
import Image from "next/image";

const QuemSomos = () => {
	const values = [
		{
			icon: Heart,
			title: "Ética",
			description:
				"Agir com transparência, respeito e responsabilidade em todas as relações.",
		},
		{
			icon: CheckCircle,
			title: "Compromisso",
			description:
				"Cumprir prazos e entregar resultados que superem as expectativas.",
		},
		{
			icon: Lightbulb,
			title: "Inovação",
			description: "Buscar constantemente soluções modernas e eficientes.",
		},
		{
			icon: Leaf,
			title: "Sustentabilidade",
			description:
				"Promover práticas que respeitam o meio ambiente e o bem-estar social.",
		},
		{
			icon: UserCheck,
			title: "Personalização",
			description:
				"Entender as necessidades específicas de cada cliente para oferecer soluções sob medida.",
		},
		{
			icon: Users,
			title: "Trabalho em equipe",
			description:
				"Valorizar a colaboração e o desenvolvimento profissional contínuo.",
		},
	];

	const team = [
		{
			photo: "/lucas.webp",
			name: "Lucas Maccari",
			role: "Engenheiro Civil",
			description:
				"Assegura a qualidade, segurança e eficiência em todas as fases dos projetos. Com ampla experiência em projetos complementares, gerenciamento de projetos e sistemas de prevenção, ele conduz cada etapa com precisão e total conformidade às normas técnicas vigentes.",
		},
		{
			photo: "/felipe.webp",
			name: "Felipe Maccari",
			role: "Arquiteto em Formação",
			description:
				"Contribui com uma visão criativa que alia funcionalidade e estética, trabalhando para transformar espaços em ambientes de conforto e bem-estar. Sempre atento às tendências e às melhores práticas de sustentabilidade, ele traz energia renovada e ideias inovadoras para cada projeto.",
		},
	];

	const enterprise = [
		{
			class: "missao",
			icon: <Target className={styles.icon} />,
			name: "Missão",
			description:
				"Oferecer soluções inovadoras e personalizadas em engenharia e arquitetura, com qualidade, segurança e sustentabilidade, garantindo a satisfação dos nossos clientes e contribuindo para o desenvolvimento das comunidades onde atuamos.",
		},
		{
			class: "visao",
			icon: <Eye className={styles.icon} />,
			name: "Visão",
			description:
				"Ser reconhecida como uma empresa líder em engenharia e arquitetura, destacando-se pela excelência técnica, inovação contínua e compromisso com a satisfação dos clientes.",
		},
	];

	return (
		<section id="quem-somos" className={styles.section}>
			<div className={styles.header}>
				<h2 className={styles.title}>Quem Somos</h2>
				<p>
					A{" "}
					<strong className="text-maccari-black">
						Maccari Engenharia e Arquitetura
					</strong>{" "}
					é uma empresa familiar que une conhecimento técnico e inovação para
					oferecer soluções completas em engenharia e arquitetura. Fundada por
					profissionais apaixonados pelo que fazem, a empresa valoriza a
					proximidade com seus clientes, a ética e a excelência em cada projeto.
				</p>
			</div>
			<div className={styles.team}>
				<h3>Nossa Equipe</h3>
				<div className={styles.teamGrid}>
					{team.map(({ photo, name, role, description }, idx) => (
						<div key={idx} className={styles.person}>
							<Image
								className={styles.photo}
								src={photo}
								width={500}
								height={500}
								priority
								alt={`${name} photo`}
							/>
							<div>
								<h4 className={styles.name}>{name}</h4>
								<p className={styles.role}>{role}</p>
							</div>
							<p>{description}</p>
						</div>
					))}
				</div>
			</div>
			<div className={styles.enterprise}>
				<div className={styles.enterpriseGrid}>
					<div className={`${styles.card} ${styles[enterprise[0].class]}`}>
						<div>{enterprise[0].icon}</div>
						<h3>{enterprise[0].name}</h3>
						<p>{enterprise[0].description}</p>
					</div>
					<div className={`${styles.card} ${styles[enterprise[1].class]}`}>
						<div>{enterprise[1].icon}</div>
						<h3>{enterprise[1].name}</h3>
						<p>{enterprise[1].description}</p>
					</div>
				</div>
				<div className={styles.values}>
					<div className={styles.heartDiv}>
						<Heart className={styles.icon} />
					</div>
					<h3>Valores</h3>
					<p>
						Nossos princípios fundamentais que guiam cada decisão e ação em
						nossa empresa
					</p>
					<div className={styles.valuesGrid}>
						{values.map(({ icon: Icon, title, description }, idx) => (
							<div key={idx} className={styles.valuesCard}>
								<div>
									<Icon className={styles.icon} />
								</div>
								<div className={styles.valuesText}>
									<h4>{title}</h4>
									<p>{description}</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
};

export default QuemSomos;
