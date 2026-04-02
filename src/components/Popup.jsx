// used help for this
export default function Popup({ msg, reset }) {
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
        }}
      >
        <h2 style={{ color: msg === "Won" ? "green" : "red" }}>You {msg}!</h2>
        <button
          onClick={reset}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "bold",
          }}
        >
          Play Again
        </button>
      </div>
    </div>
  );
}
