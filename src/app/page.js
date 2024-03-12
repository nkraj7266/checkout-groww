import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
	return (
		<main className={styles.main}>
			<Link href="/checkout" legacyBehavior>
				<a>Checkout</a>
			</Link>
		</main>
	);
}
