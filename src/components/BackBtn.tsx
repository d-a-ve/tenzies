import { Link } from "react-router-dom";

const styles = {
	container: {
		display: "flex",
		gap: "1rem",
		alignItems: "center",
		backgroundColor: "var(--text-sub)",
		fontSize: "1.6rem",
		paddingInline: "2rem",
		textDecoration: "none",
	},
};

export default function BackBtn({ to }: { to: string }) {
	return (
		<Link to={to} className="btn back-btn" style={styles.container}>
			<svg
				height="1.6rem"
				viewBox="0 0 18 34"
				fill="none"
				xmlns="http://www.w3.org/2000/svg">
				<path
					d="M17 33L1 17L17 1"
					stroke="var(--white)"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
			<p>Back</p>
		</Link>
	);
}
