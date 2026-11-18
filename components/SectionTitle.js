export default function SectionTitle({ children, center = false, sub }) {
  return (
    <div className={`stitle ${center ? "stitle-center" : ""}`}>
      <h2>{children}</h2>
      {sub && <p>{sub}</p>}
    </div>
  );
}
