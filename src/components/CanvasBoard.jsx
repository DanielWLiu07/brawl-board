import "./CanvasBoard.css";
import tempMap from "../assets/hard-rock-mine.png";

const CanvasBoard = () => {
  return <img src = {tempMap} className="whiteboard" alt="Whiteboard" />;
};

export default CanvasBoard;
