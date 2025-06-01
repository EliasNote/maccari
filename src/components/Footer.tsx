import styles from "@/styles/Footer.module.css";
import {
	ContactDetail,
	instagramContact,
	whatsappContact,
	emailContactWithLink,
} from "@/utils/Data";
import { scrollTo } from "@/utils/Scroll";

const Footer = () => {
	const currentYear = new Date().getFullYear();

	const quickLinks = [
		{ label: "Serviços", href: "servicos" },
		{ label: "Quem Somos", href: "quem-somos" },
		{ label: "Contato", href: "contato" },
	];

	const socialLinks: ContactDetail[] = [
		emailContactWithLink(styles.infoIcon),
		whatsappContact(styles.infoIcon),
		instagramContact(styles.infoIcon),
	];

	return (
		<footer className={styles.footer}>
			<div className={styles.footerContent}>
				<div className={styles.footerColumn}>
					<h2 className={styles.logo}>
						MACCARI
						<br />
						<span>ENGENHARIA E ARQUITETURA</span>
					</h2>
					<p className={styles.tagline}>
						Transformamos ideias em projetos que constroem o futuro
					</p>
				</div>
				<div className={styles.footerColumn}>
					<div className={styles.footerColumnAlign}>
						<div>
							<h3 className={styles.footerTitle}>Links Rápidos</h3>
							<ul className={styles.quickLinksList}>
								{quickLinks.map((link, index) => (
									<li key={index}>
										<button
											className={styles.quickLink}
											onClick={() => scrollTo(link.href)}
										>
											{link.label}
										</button>
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>
				<div className={styles.footerColumn}>
					<div className={styles.footerColumnAlign}>
						<div>
							<h3 className={styles.footerTitle}>Redes Sociais</h3>
							<p>Acompanhe nossas redes sociais</p>
							<ul className={styles.socialLinksList}>
								{socialLinks.map((social, index) => (
									<li key={index} className={styles.socialLinkItem}>
										<a
											href={social.href}
											target={social.targetBlank ? "_blank" : "_self"}
											rel={social.targetBlank ? "noopener noreferrer" : ""}
											className={styles.socialLink}
										>
											{social.icon}
										</a>
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>
			</div>
			<div className={styles.copyright}>
				<p>
					&copy; {currentYear} Maccari - Engenharia e Arquitetura. Todos os
					direitos reservados.
				</p>
				<p>Desenvolvido por</p>
			</div>
		</footer>
	);
};

export default Footer;
