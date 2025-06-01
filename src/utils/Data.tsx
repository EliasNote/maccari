import { Mail, MapPin, Clock } from "lucide-react";
import { whatsappIcon, instagramIcon } from "@/utils/Icons";
import { JSX } from "react";

export interface ContactDetail {
	icon: JSX.Element;
	title: string;
	value: string;
	href?: string;
	targetBlank?: boolean;
}

export const emailContact = (iconClassName: string): ContactDetail => ({
	icon: <Mail size={20} className={iconClassName} />,
	title: "E-mail",
	value: "maccariengearq@gmail.com ",
});

export const emailContactWithLink = (iconClassName: string): ContactDetail => ({
	...emailContact(iconClassName),
	href: `mailto:${emailContact(iconClassName).value.trim()}`,
});

export const whatsappContact = (iconClassName: string): ContactDetail => ({
	icon: whatsappIcon(iconClassName),
	title: "WhatsApp",
	value: "46 99115-1663",
	href: "https://wa.me/5546991151663",
	targetBlank: true,
});

export const instagramContact = (iconClassName: string): ContactDetail => ({
	icon: instagramIcon(iconClassName),
	title: "Instagram",
	value: "@maccari_engenhariaearquitetura",
	href: "https://instagram.com/maccari_engenhariaearquitetura",
	targetBlank: true,
});

export const locationContact = (iconClassName: string): ContactDetail => ({
	icon: <MapPin size={20} className={iconClassName} />,
	title: "Localização",
	value: "Rua José Joaquim Bahls, 1436, Palmas - PR, CEP 85691-226",
});

export const openingHoursContact = (iconClassName: string): ContactDetail => ({
	icon: <Clock size={20} className={iconClassName} />,
	title: "Horário de atendimento",
	value: "08:00 às 12:00 e 13:15 às 18:00",
});
