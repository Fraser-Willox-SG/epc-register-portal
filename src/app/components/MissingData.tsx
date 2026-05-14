export default function MissingData({
  label = "MISSING DATA FROM API",
}: {
  label?: string;
}) {
  // const isProduction = process.env.NODE_ENV == "production";

  // if (isProduction) {
  //   return <span className="ds_hint-text">—</span>;
  // }

  return <span style={{ color: "#d4351c", fontWeight: "bold" }}>{label}</span>;
}
