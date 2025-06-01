import styles from "@/styles/Topbar.module.css";
import {
	emailContactWithLink,
	whatsappContact,
	instagramContact,
	ContactDetail,
} from "@/utils/Data";

const Topbar = () => {
	const topbarItems: ContactDetail[] = [
		emailContactWithLink(styles.menuImg),
		whatsappContact(styles.menuImg),
		instagramContact(styles.menuImg),
	];

	return (
		<div className={styles.topbar}>
			<div className={styles.container}>
				{topbarItems.map((item, index) => (
					<a
						key={index}
						className={styles.item}
						href={item.href}
						target={item.targetBlank ? "_blank" : undefined}
						rel={item.targetBlank ? "noopener noreferrer" : undefined}
					>
						{item.icon}
						<p>{item.value}</p>
					</a>
				))}
			</div>
		</div>
	);
};

export default Topbar;
