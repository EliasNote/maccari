export const scrollTo = (area: string, offset: number = 100) => {
	const element = document.querySelector<HTMLElement>(`#${area}`);
	if (element) {
		const top =
			element.getBoundingClientRect().top + window.pageYOffset - offset;
		window.scrollTo({ top, behavior: "smooth" });
	}
};
