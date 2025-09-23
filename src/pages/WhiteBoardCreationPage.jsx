import "./WhiteBoardCreationPage.css";
import CanvasBoard from "../components/CanvasBoard"; 


const WhiteBoardCreationPage = () => {
	return (
		<div className="whiteboard-creation-container">
			<div className="left-section">
				<h2>Settings & Tools</h2>


			</div>
			<div className="middle-section">
				<div className="whiteboard-aspect">
					<CanvasBoard />
				</div>
			</div>
			<div className="right-section">
				<div className="brawler-icons">
					<h2>Brawler Icons</h2>


				</div>
				<div className="attack-cones">
					<h2>Attack Cones</h2>


				</div>
			</div>
		</div>
	);
};

export default WhiteBoardCreationPage;