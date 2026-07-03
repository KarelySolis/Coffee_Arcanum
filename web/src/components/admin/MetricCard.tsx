interface Props {
  label: string;
  value: number;
  icon: string;
}

export default function MetricCard({ label, value, icon }: Props) {
  return (
    <div className="bg-stone-800 border border-stone-700 rounded-2xl p-6 flex items-center gap-5">
      <span className="text-4xl">{icon}</span>
      <div>
        <p className="text-stone-400 text-sm">{label}</p>
        <p className="text-stone-50 text-3xl font-bold mt-1">{value}</p>
      </div>
    </div>
  );
}
