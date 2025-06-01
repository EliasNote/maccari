import { useState, FormEvent } from "react";
import styles from "@/styles/content/Contato.module.css";
import { Send } from "lucide-react";
import {
	emailContact,
	whatsappContact,
	instagramContact,
	locationContact,
	openingHoursContact,
	ContactDetail,
} from "@/utils/Data";

const Contato = () => {
	const [formData, setFormData] = useState({
		name: "",
		phone: "",
		email: "",
		projectType: "",
		message: "",
	});
	const [isLoading, setIsLoading] = useState(false);
	const [formStatus, setFormStatus] = useState<{
		success: boolean;
		message: string;
	} | null>(null);

	const handleChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>
	) => {
		const { name, value } = e.target;

		if (name === "phone") {
			const cleanedValue = value.replace(/[^\d\s()-]/g, "");
			let maskedValue = cleanedValue;
			const numbersOnly = cleanedValue.replace(/\D/g, "");

			if (numbersOnly.length > 0) {
				maskedValue = "(" + numbersOnly.substring(0, 2);
			}
			if (numbersOnly.length > 2) {
				maskedValue +=
					") " + numbersOnly.substring(2, numbersOnly.length === 11 ? 7 : 6);
			}
			if (numbersOnly.length > (numbersOnly.length === 11 ? 6 : 5)) {
				maskedValue +=
					"-" +
					numbersOnly.substring(
						numbersOnly.length === 11 ? 7 : 6,
						numbersOnly.length === 11 ? 11 : 10
					);
			}

			if (maskedValue.length > 15) {
				maskedValue = maskedValue.substring(0, 15);
			}

			setFormData((prev) => ({ ...prev, [name]: maskedValue }));
		} else {
			setFormData((prev) => ({ ...prev, [name]: value }));
		}
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setFormStatus(null);

		const phoneDigits = formData.phone.replace(/\D/g, "");

		if (
			formData.phone.trim() &&
			(phoneDigits.length < 10 || phoneDigits.length > 11)
		) {
			setFormStatus({
				success: false,
				message: "O telefone deve conter 10 ou 11 dígitos (DDD + número).",
			});
			setIsLoading(false);
			return;
		}

		setIsLoading(true);

		try {
			const response = await fetch("/api/Form", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});

			const result = await response.json();

			if (response.ok && result.success) {
				setFormStatus({
					success: true,
					message: result.message || "Solicitação enviada com sucesso!",
				});
				setFormData({
					name: "",
					phone: "",
					email: "",
					projectType: "",
					message: "",
				});
			} else {
				setFormStatus({
					success: false,
					message: result.error || "Falha ao enviar a solicitação.",
				});
			}
		} catch (error) {
			console.error("Erro ao submeter formulário:", error);
			setFormStatus({
				success: false,
				message: "Erro de conexão. Tente novamente.",
			});
		} finally {
			setIsLoading(false);
		}
	};

	const projectTypes = [
		"Consultorias Técnicas",
		"Projeto Arquitetônico",
		"Aprovação na Prefeitura",
		"Projeto Elétrico",
		"Projeto Estrutural",
		"Projeto Hidrossanitário",
		"Prevenção Contra Incêndios",
		"Outro",
	];

	const contactDetails: ContactDetail[] = [
		emailContact(styles.infoIcon),
		whatsappContact(styles.infoIcon),
		instagramContact(styles.infoIcon),
		locationContact(styles.infoIcon),
		openingHoursContact(styles.infoIcon),
	];

	return (
		<section id="contato" className={styles.section}>
			<h2 className={styles.title}>Contato</h2>
			<div className={styles.content}>
				<div className={styles.infoContainer}>
					<h3>Vamos conversar</h3>
					<p>Entre em contato conosco e transforme suas ideias em realidade.</p>
					<div className={styles.infoList}>
						{contactDetails.map((item, index) => {
							const itemContent = (
								<>
									<div className={styles.detailDiv}>{item.icon}</div>
									<div className={styles.infoText}>
										<h4>{item.title}</h4>
										<p>{item.value}</p>
									</div>
								</>
							);
							return item.href ? (
								<a
									key={index}
									href={item.href}
									className={styles.infoItem}
									target={item.targetBlank ? "_blank" : "_self"}
									rel={item.targetBlank ? "noopener noreferrer" : ""}
								>
									{itemContent}
								</a>
							) : (
								<div key={index} className={styles.infoItem}>
									{itemContent}
								</div>
							);
						})}
					</div>
				</div>
				<div className={styles.formContainer}>
					<h3 className={styles.formTitle}>Solicitar Orçamento</h3>
					<p className={styles.formSubtitle}>
						Preencha o formulário e receba uma proposta personalizada.
					</p>
					<form onSubmit={handleSubmit} className={styles.form}>
						<div className={styles.formRow}>
							<div className={styles.formGroup}>
								<label htmlFor="name">Nome completo *</label>
								<input
									type="text"
									id="name"
									name="name"
									value={formData.name}
									onChange={handleChange}
									placeholder="Seu nome"
									required
									onInvalid={(e) =>
										(e.target as HTMLInputElement).setCustomValidity(
											"Por favor, preencha seu nome completo."
										)
									}
									onInput={(e) =>
										(e.target as HTMLInputElement).setCustomValidity("")
									}
								/>
							</div>
							<div className={styles.formGroup}>
								<label htmlFor="phone">Telefone *</label>
								<input
									type="tel"
									id="phone"
									name="phone"
									value={formData.phone}
									onChange={handleChange}
									placeholder="(00) 00000-0000"
									required
									pattern="^\(?\d{2}\)?[\s-]?\d{4,5}-?\d{4}$"
									maxLength={15}
									onInvalid={(e) => {
										const inputElement = e.target as HTMLInputElement;
										if (inputElement.validity.valueMissing) {
											inputElement.setCustomValidity(
												"Por favor, informe seu telefone."
											);
										} else if (inputElement.validity.patternMismatch) {
											inputElement.setCustomValidity(
												"Formato de telefone inválido. Use (XX) XXXXX-XXXX."
											);
										} else {
											inputElement.setCustomValidity("");
										}
									}}
									onInput={(e) =>
										(e.target as HTMLInputElement).setCustomValidity("")
									}
								/>
							</div>
						</div>
						<div className={styles.formGroup}>
							<label htmlFor="email">E-mail *</label>
							<input
								type="email"
								id="email"
								name="email"
								value={formData.email}
								onChange={handleChange}
								placeholder="seu@email.com"
								required
								onInvalid={(e) => {
									const inputElement = e.target as HTMLInputElement;
									if (inputElement.validity.valueMissing) {
										inputElement.setCustomValidity(
											"Por favor, forneça um endereço de e-mail."
										);
									} else if (inputElement.validity.typeMismatch) {
										inputElement.setCustomValidity(
											"Por favor, insira um endereço de e-mail válido."
										);
									} else {
										inputElement.setCustomValidity("");
									}
								}}
								onInput={(e) =>
									(e.target as HTMLInputElement).setCustomValidity("")
								}
							/>
						</div>
						<div className={styles.formGroup}>
							<label htmlFor="projectType">Tipo de projeto *</label>
							<select
								id="projectType"
								name="projectType"
								value={formData.projectType}
								onChange={handleChange}
								required
								onInvalid={(e) =>
									(e.target as HTMLSelectElement).setCustomValidity(
										"Por favor, selecione o tipo de projeto."
									)
								}
								onInput={(e) =>
									(e.target as HTMLSelectElement).setCustomValidity("")
								}
							>
								<option value="" disabled>
									<p>Selecione o tipo de projeto</p>
								</option>
								{projectTypes.map((type) => (
									<option key={type} value={type}>
										{type}
									</option>
								))}
							</select>
						</div>
						<div className={styles.formGroup}>
							<label htmlFor="message">Mensagem *</label>
							<textarea
								id="message"
								name="message"
								value={formData.message}
								onChange={handleChange}
								placeholder="Conte-nos mais sobre seu projeto..."
								rows={5}
								required
								onInvalid={(e) =>
									(e.target as HTMLTextAreaElement).setCustomValidity(
										"Por favor, escreva sua mensagem."
									)
								}
								onInput={(e) =>
									(e.target as HTMLTextAreaElement).setCustomValidity("")
								}
							></textarea>
						</div>
						<button
							type="submit"
							className={styles.submitButton}
							disabled={isLoading}
						>
							{isLoading ? (
								"Enviando..."
							) : (
								<>
									<Send size={18} /> Enviar solicitação
								</>
							)}
						</button>
						{formStatus && (
							<p
								className={`${styles.formStatus} ${
									formStatus.success ? styles.success : styles.error
								}`}
							>
								{formStatus.message}
							</p>
						)}
					</form>
				</div>
			</div>
		</section>
	);
};

export default Contato;
