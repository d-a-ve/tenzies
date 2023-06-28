import { Link } from "react-router-dom";
import { ModalFooterType } from "../types";

export default function ModalFooter({
	signIn,
	playGame,
	showJoinBtn,
	btnLoading,
}: ModalFooterType) {
	return (
		<div>
			<div className="btn-container">
				{showJoinBtn && (
					<button
						className={`btn hof-btn ${btnLoading ? "loading" : ""}`}
						onClick={signIn}>
						Join Hall of Fame
					</button>
				)}
				<button className="btn play-btn" onClick={playGame}>
					Play Again
				</button>
			</div>

			<footer className="modal-footer">
				<p>Tired of playing?</p>
				<div className="modal-footer-link-container">
					<Link to="/" className="btn modal-footer-btn" onClick={playGame}>
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
			</footer>
		</div>
	);
}
