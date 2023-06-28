import { useRouteError, Link } from "react-router-dom";

export default function ErrorPage() {
	const error = useRouteError() as any;

	return (
		<div id="error-page">
			<h1>{error.statusText || error.message}!</h1>
			<div className="error-desc">
				<p>Sorry, an unexpected error has occurred.</p>
        <p>Go to Home page</p>
			</div>

			<Link to="/" className="btn modal-footer-btn">
				<svg
					height="1.6rem"
					viewBox="0 0 24 27"
					fill="none"
					xmlns="http://www.w3.org/2000/svg">
					<path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M12 0L0 9.33333V24C0 24.7072 0.280951 25.3855 0.781048 25.8856C1.28115 26.3857 1.95942 26.6667 2.66667 26.6667H8H8.25V13.5H15.75V26.6667H16H21.3333C22.0406 26.6667 22.7189 26.3857 23.219 25.8856C23.719 25.3855 24 24.7072 24 24V9.33333L12 0Z"
						fill="#FFF"
					/>
				</svg>
				Home
			</Link>
		</div>
	);
}
