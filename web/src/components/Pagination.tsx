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
        className="px-3 py-1 rounded bg-stone-700 text-stone-200 disabled:opacity-40 hover:bg-stone-600 transition"
      >
        ← Anterior
      </button>
      <span className="text-stone-400 text-sm">
        Página {page} de {totalPages}
      </span>
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className="px-3 py-1 rounded bg-stone-700 text-stone-200 disabled:opacity-40 hover:bg-stone-600 transition"
      >
        Siguiente →
      </button>
    </div>
  );
}
