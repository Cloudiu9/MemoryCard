// used help for this
function Button({ isActive, choice, onClick }) {
  const className = `btn ${isActive ? "popupBtn" : "hidden"}`;

  return (
    <button className={className} onClick={onClick}>
      {choice}
    </button>
  );
}

export default function Popup({ msg = "You", onSelectDifficulty }) {
  return (
    // Blocking overlay
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 999,
      }}
    >
      {/* Won/Lost popup */}
      <div
        id="popup"
        style={{
          backgroundColor: "white",
          padding: "40px",
          borderRadius: "10px",
          border: "2px solid #333",
          textAlign: "center",
          boxShadow: "0px 4px 15px rgba(0,0,0,0.3)",
          minWidth: "250px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h2 style={{ color: msg === "You Won" ? "green" : "red" }}>{msg}</h2>

        <Button
          isActive={true} // hidden or not
          onClick={() => onSelectDifficulty(3)} // choose difficulty
          choice={"Hard"} // displayed text
        />
        <Button
          isActive={true}
          onClick={() => onSelectDifficulty(2)}
          choice={"Medium"}
        />
        <Button
          isActive={true}
          onClick={() => onSelectDifficulty(1)}
          choice={"Easy"}
        />
      </div>
    </div>
  );
}
