import "./CanvasBoard.css";
import tempMap from "../assets/hard-rock-mine.png";

const CanvasBoard = () => {
  return (
    <div className="whiteboard-wrapper">
      <img src={tempMap} className="whiteboard-aspect" alt="Whiteboard" />
    </div>
  );
};

export default CanvasBoard;