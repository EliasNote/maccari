import styles from "@/styles/Hero.module.css";
import Navbar from "./Navbar";
import { ArrowRight } from "lucide-react";
import { whatsappContact } from "@/utils/Data";

const Hero = () => {
	const whatsAppLink = whatsappContact("").href;

	return (
		<>
			<Navbar />
			<div className={styles.container}>
				<div className={styles.content}>
					<h1>Transformamos ideias em projetos que constroem o futuro</h1>
					<a
						href={whatsAppLink}
						target="_blank"
						rel="noopener noreferrer"
						style={{ textDecoration: "none" }}
					>
						<button className={styles.button}>
							Fazer orçamento <ArrowRight size={16} />
						</button>
					</a>
				</div>
			</div>
		</>
	);
};

export default Hero;
