import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";

type Data = { success: boolean; error?: string; message?: string };

interface FormData {
	name: string;
	phone: string;
	email: string;
	projectType: string;
	message: string;
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	if (req.method !== "POST") {
		res.setHeader("Allow", ["POST"]);
		return res
			.status(405)
			.json({ success: false, error: "Method Not Allowed" });
	}

	const { name, phone, email, projectType, message } = req.body as FormData;

	if (!name || !phone || !email || !projectType || !message) {
		const missingFields = [];
		if (!name) missingFields.push("Nome completo");
		if (!phone) missingFields.push("Telefone");
		if (!email) missingFields.push("E-mail");
		if (!projectType) missingFields.push("Tipo de projeto");
		if (!message) missingFields.push("Mensagem");
		return res.status(400).json({
			success: false,
			error: `Campos obrigatórios ausentes: ${missingFields.join(", ")}`,
		});
	}

	if (!/\S+@\S+\.\S+/.test(email)) {
		return res
			.status(400)
			.json({ success: false, error: "Formato de e-mail inválido." });
	}

	const emailTextContent = `
		Nova solicitação de orçamento recebida:

		Nome: ${name}
		Telefone: ${phone}
		E-mail: ${email}
		Tipo de Projeto: ${projectType}
		Mensagem:
		${message}
	`.trim();

	const emailHtmlContent = `
		<h2>Nova Solicitação de Orçamento</h2>
		<p><strong>Nome:</strong> ${name}</p>
		<p><strong>Telefone:</strong> ${phone}</p>
		<p><strong>E-mail:</strong> ${email}</p>
		<p><strong>Tipo de Projeto:</strong> ${projectType}</p>
		<p><strong>Mensagem:</strong></p>
		<p>${message.replace(/\n/g, "<br>")}</p>
	`.trim();

	try {
		const caCertPath = path.resolve(process.cwd(), "certs", "gmail.crt");
		const caCert = fs.readFileSync(caCertPath);

		const transporter = nodemailer.createTransport({
			host: process.env.SMTP_HOST,
			port: Number(process.env.SMTP_PORT),
			secure: process.env.SMTP_SECURE === "true",
			auth: {
				user: process.env.SMTP_USER,
				pass: process.env.SMTP_PASS,
			},
			tls: {
				ca: [caCert],
			},
		});

		const mailOptions = {
			from: `"${name}" <${process.env.SMTP_USER}>`,
			replyTo: email,
			to: process.env.SMTP_USER,
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
