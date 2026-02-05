export default function SectionHeader({ title, subtitle }) {
  return (
    <div className="mb-4">
      <h2 className="text-lg font-semibold text-slate-800">
        {title}
      </h2>
      {subtitle && (
        <p className="text-sm text-slate-500 mt-1">
          {subtitle}
        </p>
      )}
    </div>
  );
}
