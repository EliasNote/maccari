import dynamic from "next/dynamic";

const Diferenciais = dynamic(() => import("./Diferenciais"));
const Servicos = dynamic(() => import("./Servicos"));
const QuemSomos = dynamic(() => import("./QuemSomos"));
const Faq = dynamic(() => import("./Faq"));
const Contato = dynamic(() => import("./Contato"));

export default function Content() {
	return (
		<>
			<Diferenciais />
			<Servicos />
			<QuemSomos />
			<Faq />
			<Contato />
		</>
	);
}
