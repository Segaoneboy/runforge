import { AlertCircle, RotateCcw } from 'lucide-react';

interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-red-200 bg-white px-6 py-12 text-center shadow-2xs">
      <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-red-50 text-red-600">
        <AlertCircle className="h-6 w-6" />
      </div>
      <h3 className="text-base font-semibold text-slate-900">Ошибка загрузки запусков</h3>
      <p className="mt-1 max-w-md text-sm text-slate-500">{message}</p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-5 inline-flex cursor-pointer items-center gap-2 rounded-lg bg-[#0F172A] px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
      >
        <RotateCcw className="h-4 w-4" />
        Повторить
      </button>
    </div>
  );
}