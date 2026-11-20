import { Cloud } from 'lucide-react';

interface HeaderProps {
  simulateError: boolean;
  onToggleSimulateError: (checked: boolean) => void;
}

export function Header({ simulateError, onToggleSimulateError }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/90 bg-[#FAF9F6] backdrop-blur-xs">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6">
        <div className="flex items-center gap-2.5 overflow-hidden">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#0F172A] text-white shadow-2xs">
            <Cloud className="h-4 w-4" aria-hidden="true" />
          </div>

          <span className="text-base font-semibold tracking-tight text-[#0F172A]">
            Runforge
          </span>

          <div className="hidden items-center gap-2 text-xs text-slate-400 sm:flex">
            <span>/</span>
            <span className="rounded-md bg-slate-100 px-2 py-0.5 font-mono font-medium text-slate-600">
              workspace
            </span>
            <span>/</span>
            <span className="font-mono font-medium text-[#0F172A]">runs</span>
          </div>
        </div>

        <label className="inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-lg border border-slate-200 bg-[#FAF9F6] px-2.5 py-1.5 text-xs font-medium text-slate-600 transition hover:border-slate-300 hover:text-slate-900 select-none">
          <input
            type="checkbox"
            checked={simulateError}
            onChange={(e) => onToggleSimulateError(e.target.checked)}
            className="h-3.5 w-3.5 rounded border-slate-300 accent-[#0F172A] focus:ring-0"
          />
          <span>Simulate API error</span>
        </label>
      </div>
    </header>
  );
}