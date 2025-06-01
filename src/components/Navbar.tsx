import { useState, useEffect } from "react";
import styles from "@/styles/Navbar.module.css";
import Image from "next/image";
import { Variants, motion } from "framer-motion";
import Topbar from "./Topbar";
import { scrollTo } from "@/utils/Scroll";
import { menuIcon } from "@/utils/Icons";
import {
	whatsappContact,
	emailContactWithLink,
	instagramContact,
	ContactDetail,
} from "@/utils/Data";
import dynamic from "next/dynamic";

const AnimatePresence = dynamic(
	() =>
		import("framer-motion").then((mod) => ({
			default: mod.AnimatePresence,
		})),
	{ ssr: false }
);

const underlineVariants: Variants = {
	rest: { scaleX: 0 },
	hover: {
		scaleX: 1,
		transition: { duration: 0.3, ease: "linear" },
	},
};

const sidebarVariants: Variants = {
	hidden: { x: "100%", opacity: 0 },
	visible: {
		x: 0,
		opacity: 1,
		transition: {
			when: "beforeChildren",
			staggerChildren: 0.05,
		},
	},
	exit: {
		x: "100%",
		opacity: 0,
	},
};

const itemVariants: Variants = {
	hidden: { x: 50, opacity: 0 },
	visible: {
		x: 0,
		opacity: 1,
		transition: { type: "tween", ease: "linear", duration: 0.4 },
	},
	exit: {
		x: 50,
		opacity: 0,
		transition: { type: "tween", ease: "linear", duration: 0.4 },
	},
};

const Navbar = () => {
	const [isMobile, setIsMobile] = useState(false);
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth <= 1024);
		};

		handleResize();
		window.addEventListener("resize", handleResize);

		return () => window.removeEventListener("resize", handleResize);
	}, []);

	useEffect(() => {
		if (isSidebarOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "unset";
		}
		return () => {
			document.body.style.overflow = "unset";
		};
	}, [isSidebarOpen]);

	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};

	const tabs = [
		{ id: "servicos", label: "Serviços" },
		{ id: "quem-somos", label: "Quem somos" },
		{ id: "contato", label: "Contato" },
	];

	const whatsAppLink = whatsappContact("").href;

	const socialLinksInSidebar: ContactDetail[] = [
		emailContactWithLink(styles.sidebarSocialIcon),
		whatsappContact(styles.sidebarSocialIcon),
		instagramContact(styles.sidebarSocialIcon),
	];

	return (
		<>
			<header className={styles.navbar}>
				{!isMobile && <Topbar />}
				<nav className={styles.navContainer}>
					<div className={styles.logo_container}>
						<Image
							className={styles.logo}
							src="/logo.png"
							width={200}
							height={200}
							priority
							alt=""
						/>
						<span>
							<span>MACCARI</span>
							<p>ENGENHARIA E ARQUITETURA</p>
						</span>
					</div>

					<div className={styles.tabs}>
						{isMobile ? (
							<button
								onClick={toggleSidebar}
								className={styles.menuButton}
								aria-label="Abrir menu"
							>
								{menuIcon(styles.menuImg)}
							</button>
						) : (
							<>
								{tabs.map((tab) => (
									<motion.button
										key={tab.id}
										className={styles.tab}
										initial="rest"
										whileHover="hover"
										animate="rest"
										onClick={() => scrollTo(tab.id)}
									>
										{tab.label}
										<motion.div
											className={styles.underline}
											variants={underlineVariants}
										/>
									</motion.button>
								))}
								<a
									href={whatsAppLink}
									target="_blank"
									rel="noopener noreferrer"
								>
									<button
										className={styles.button}
										aria-label="Fazer orçamento"
									>
										Fazer orçamento
									</button>
								</a>
							</>
						)}
					</div>
				</nav>
			</header>

			<AnimatePresence>
				{isSidebarOpen && (
					<>
						<motion.div
							className={styles.overlay}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							onClick={toggleSidebar}
						/>
						<motion.div
							className={styles.sidebar}
							variants={sidebarVariants}
							initial="hidden"
							animate="visible"
							exit="exit"
						>
							<div className={styles.side_logo_container}>
								<Image
									className={styles.logo}
									src="/logo.png"
									width={200}
									height={200}
									priority
									alt=""
								/>
								<span>
									<span>MACCARI</span>
								</span>
							</div>
							<div className={styles.sidebarList}>
								{tabs.map((tab) => (
									<motion.span
										key={tab.id}
										className={styles.sidebarItem}
										variants={itemVariants}
										onClick={() => {
											scrollTo(tab.id, 70);
											toggleSidebar();
										}}
									>
										{tab.label}
									</motion.span>
								))}
								<motion.div
									className={styles.sidebarButtonContainer}
									variants={itemVariants}
								>
									<a
										href={whatsAppLink}
										target="_blank"
										rel="noopener noreferrer"
										onClick={toggleSidebar}
										style={{ textDecoration: "none" }}
									>
										<button
											className={`${styles.button} ${styles.sidebarFullWidthButton}`}
											aria-label="Fazer orçamento"
										>
											Fazer orçamento
										</button>
									</a>
								</motion.div>
								<motion.div
									className={styles.sidebarSocialsContainer}
									variants={itemVariants}
								>
									{socialLinksInSidebar.map((social, index) => (
										<motion.a
											key={index}
											href={social.href}
											target={social.targetBlank ? "_blank" : "_self"}
											rel={social.targetBlank ? "noopener noreferrer" : ""}
											className={styles.sidebarSocialLink}
											onClick={toggleSidebar}
										>
											{social.icon}
											<span>{social.title}</span>
										</motion.a>
									))}
								</motion.div>
							</div>
						</motion.div>
					</>
				)}
			</AnimatePresence>
		</>
	);
};

export default Navbar;
