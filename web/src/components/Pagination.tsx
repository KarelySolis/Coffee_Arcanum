"use client";

interface Props {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ page, totalPages, onPageChange }: Props) {
  if (totalPages <= 1) return null;
  return (
    <div className="flex items-center justify-center gap-2 mt-4">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="px-3 py-1 rounded border border-[#3a2a1a]/20 bg-white text-[#3a2a1a] disabled:opacity-40 hover:bg-[#3a2a1a]/5 transition"
      >
        ← Anterior
      </button>
      <span className="text-[#5c4a3a] text-sm">
        Página {page} de {totalPages}
      </span>
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className="px-3 py-1 rounded border border-[#3a2a1a]/20 bg-white text-[#3a2a1a] disabled:opacity-40 hover:bg-[#3a2a1a]/5 transition"
      >
        Siguiente →
      </button>
    </div>
  );
}
