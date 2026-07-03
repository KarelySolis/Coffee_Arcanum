interface Props {
  label: string;
  value: number;
  icon: string;
}

export default function MetricCard({ label, value, icon }: Props) {
  return (
    <div className="bg-white border border-[#8c5a3c]/15 shadow-md rounded-2xl p-6 flex items-center gap-5">
      <span className="text-4xl bg-[#fdfaf5] p-3 rounded-xl border border-[#8c5a3c]/10">{icon}</span>
      <div>
        <p className="text-[#5c4a3a] text-sm font-medium">{label}</p>
        <p className="text-[#3a2a1a] text-3xl font-bold mt-1">{value}</p>
      </div>
    </div>
  );
}
