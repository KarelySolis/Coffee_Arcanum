"use client";

interface Props {
  open: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDialog({ open, message, onConfirm, onCancel }: Props) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#3a2a1a]/45 backdrop-blur-sm">
      <div className="bg-[#fdfaf5] border border-[#8c5a3c]/20 rounded-xl p-6 max-w-sm w-full shadow-2xl text-[#3a2a1a]">
        <p className="text-[#3a2a1a] mb-6 text-center font-medium">{message}</p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded border border-[#3a2a1a]/20 text-[#3a2a1a] hover:bg-[#3a2a1a]/5 transition text-sm font-semibold"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition text-sm font-semibold shadow-sm"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}
