import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

type Data = {
	success: boolean;
	message?: string;
	error?: string;
};

function isValidEmail(email: string): boolean {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	if (req.method !== "POST") {
		return res
			.status(405)
			.json({ success: false, error: "Method Not Allowed" });
	}

	const { name, phone, email, projectType, message } = req.body;

	if (!name || !email || !projectType || !message) {
		return res
			.status(400)
			.json({ success: false, error: "Todos os campos são obrigatórios." });
	}

	if (!isValidEmail(email)) {
		return res
			.status(400)
			.json({ success: false, error: "Formato de e-mail inválido." });
	}

	const emailTextContent = `
        Nova solicitação de orçamento recebida:

        Nome: ${name}
        Telefone: ${phone || "Não informado"}
        E-mail: ${email}
        Tipo de Projeto: ${projectType}
        Mensagem:
        ${message}
    `.trim();

	const emailHtmlContent = `
        <h2>Nova Solicitação de Orçamento</h2>
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>Telefone:</strong> ${phone || "Não informado"}</p>
        <p><strong>E-mail:</strong> ${email}</p>
        <p><strong>Tipo de Projeto:</strong> ${projectType}</p>
        <p><strong>Mensagem:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
    `.trim();

	try {
		const transporter = nodemailer.createTransport({
			host: process.env.SMTP_HOST,
			port: Number(process.env.SMTP_PORT),
			secure: process.env.SMTP_SECURE === "true",
			auth: {
				user: process.env.SMTP_USER,
				pass: process.env.SMTP_PASS,
			},
		});

		const mailOptions = {
			from: `"${name}" <${process.env.SMTP_USER}>`,
			replyTo: email,
			to: process.env.SMTP_RECIPIENT || process.env.SMTP_USER,
			subject: `Nova Solicitação de Orçamento: ${projectType} - ${name}`,
			text: emailTextContent,
			html: emailHtmlContent,
		};

		await transporter.sendMail(mailOptions);

		return res
			.status(200)
			.json({ success: true, message: "E-mail enviado com sucesso!" });
	} catch (err: unknown) {
		console.error("Erro ao enviar e-mail:", err);
		const errorMessage =
			err instanceof Error ? err.message : "Falha ao enviar o e-mail.";
		return res.status(500).json({
			success: false,
			error: `Falha ao enviar o e-mail. Detalhes: ${errorMessage}`,
		});
	}
}
