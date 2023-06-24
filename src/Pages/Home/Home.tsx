import { Link } from "react-router-dom";
import HallOfFame from "../../components/HallOfFame";

export default function Home() {

	return (
		<main>
			<div className="home-main">
				<section className="home-hero">
					<h1>Tenzies Game</h1>

					<p>
						Created by{" "}
						<a
							className="link"
							href="https://github.com/d-a-ve"
							target="_blank">
							Dave
						</a>
					</p>
					<p>
						This is a game where you roll and hold 10 die till all dice are the
						same.
					</p>
					<Link to="/game">
						<button className="btn start-btn">Start Game</button>
					</Link>
					<div>
						<video className="video-demo" controls>
							<source src="/tenzies demo.mp4" type="video/mp4"></source>
						</video>
					</div>
				</section>

				<section className="how-to-play">
					<h2>How to play tenzies</h2>
					<div className="how-to-play-steps">
						<ol>
							<li>Start the game</li>
							<li>Choose a die number you want to hold</li>
							<li>Select all die having that number by tapping on the die</li>
							<li>
								When there is no other number that is the same as the number you
								are holding, click on the <strong>"roll"</strong> button and the
								dice that are not held will be changed
							</li>
							<li>
								Select the dice having the same number that you chose and repeat
								the process
							</li>
							<li>
								When all the dice are the same, you have won the game &#127881;
								.
							</li>
						</ol>
					</div>
					<Link to="/game">
						<button className="btn start-btn">Start Game</button>
					</Link>
				</section>

				<section id="hallOfFame">
					<HallOfFame
					/>
				</section>
				<footer className="footer">
					<p>
						&#169; Copyright {`${new Date().getFullYear()}`}{" "}
						<a
							className="link"
							href="https://github.com/d-a-ve"
							target="_blank">
							Dave
						</a>
					</p>
				</footer>
			</div>
		</main>
	);
}
