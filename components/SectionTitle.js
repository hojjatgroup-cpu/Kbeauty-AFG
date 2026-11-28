export default function SectionTitle({ children, center = false, sub, kicker, as: Tag = "h2" }) {
  return (
    <div className={`stitle ${center ? "stitle-center" : ""}`}>
      {kicker && <span className="kicker">{kicker}</span>}
      <Tag>{children}</Tag>
      {sub && <p>{sub}</p>}
    </div>
  );
}
