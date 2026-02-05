import Card from "./Card";
import { statusStyles } from "../../utils/vitalUtils";

export default function VitalCard({ label, value, status, unit }) {
  return (
    <Card
      className={`border-l-4 ${statusStyles[status]}`}
    >
      <p className="text-sm text-slate-500">{label}</p>

      <h3 className="text-2xl font-semibold text-slate-800 mt-1">
        {value} {unit}
      </h3>

      <p className="text-xs uppercase tracking-wide mt-1 text-slate-400">
        {status}
      </p>
    </Card>
  );
}
