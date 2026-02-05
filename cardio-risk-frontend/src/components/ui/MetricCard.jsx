import Card from "./Card";

export default function MetricCard({ label, value, subtext }) {
  return (
    <Card>
      <p className="text-sm text-slate-500">{label}</p>
      <h3 className="text-2xl font-semibold text-slate-800 mt-1">
        {value}
      </h3>
      {subtext && (
        <p className="text-xs text-slate-400 mt-1">{subtext}</p>
      )}
    </Card>
  );
}
