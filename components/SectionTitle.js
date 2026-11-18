export default function SectionTitle({ children, center = false, sub, kicker }) {
  return (
    <div className={`stitle ${center ? "stitle-center" : ""}`}>
      {kicker && <span className="kicker">{kicker}</span>}
      <h2>{children}</h2>
      {sub && <p>{sub}</p>}
    </div>
  );
}
