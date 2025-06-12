import "./Loader.css";

export function Loader({ inline = false }) {
  return (
    <div className={inline ? "inline-loader-container" : "loader-container"}>
      <span className="loader"></span>
    </div>
  );
}
