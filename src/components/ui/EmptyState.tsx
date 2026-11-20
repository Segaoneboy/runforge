import { SearchX } from 'lucide-react';

interface EmptyStateProps {
  onReset: () => void;
}

export function EmptyState({ onReset }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-12 text-center shadow-2xs">
      <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 text-slate-600">
        <SearchX className="h-6 w-6" />
      </div>
      <h3 className="text-base font-semibold text-slate-900">Запуски не найдены</h3>
      <p className="mt-1 max-w-sm text-sm text-slate-500">
        По текущим параметрам поиска или выбранному статусу нет ни одного запуска.
      </p>
      <button
        type="button"
        onClick={onReset}
        className="mt-5 cursor-pointer rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-800 transition hover:bg-slate-50"
      >
        Сбросить фильтры
      </button>
    </div>
  );
}