import { useEffect } from 'react';
import { ArrowLeft, Calendar, Clock, FolderGit2, GitBranch, Terminal, X } from 'lucide-react';
import type { Run } from '../../types/run';
import { formatDate, formatDuration } from '../../utils/formatters';
import { StatusBadge } from './StatusBadge';

interface RunDetailsDrawerProps {
  run: Run | null;
  onClose: () => void;
}

export function RunDetailsDrawer({ run, onClose }: RunDetailsDrawerProps) {
  useEffect(() => {
    if (!run) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [run, onClose]);

  if (!run) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 backdrop-blur-[1px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="drawer-title"
      onClick={onClose}
    >
      <div
        className="flex h-full w-full max-w-xl flex-col bg-[#FAF9F6] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex cursor-pointer items-center gap-1.5 text-sm font-medium text-slate-600 transition hover:text-slate-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to runs
          </button>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close details"
            className="cursor-pointer rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 space-y-6 overflow-y-auto p-5 sm:p-6">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="font-mono text-xs text-slate-500">{run.id}</span>
              <StatusBadge status={run.status} />
            </div>
            <h2 id="drawer-title" className="mt-2 text-xl font-semibold text-slate-900">
              {run.name}
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-3 rounded-xl border border-slate-200 bg-white p-4 text-sm sm:grid-cols-2">
            <div>
              <span className="text-xs text-slate-500">Repository</span>
              <p className="mt-0.5 flex items-center gap-1.5 font-medium text-slate-900">
                <FolderGit2 className="h-4 w-4 text-slate-400" />
                {run.repository}
              </p>
            </div>

            <div>
              <span className="text-xs text-slate-500">Branch</span>
              <p className="mt-0.5 flex items-center gap-1.5 font-mono text-xs font-medium text-slate-900">
                <GitBranch className="h-4 w-4 text-slate-400" />
                {run.branch}
              </p>
            </div>

            <div>
              <span className="text-xs text-slate-500">Created at</span>
              <p className="mt-0.5 flex items-center gap-1.5 text-slate-800">
                <Calendar className="h-4 w-4 text-slate-400" />
                {formatDate(run.createdAt)}
              </p>
            </div>

            <div>
              <span className="text-xs text-slate-500">Duration</span>
              <p className="mt-0.5 flex items-center gap-1.5 font-mono text-slate-800">
                <Clock className="h-4 w-4 text-slate-400" />
                {formatDuration(run.durationSeconds)}
              </p>
            </div>
          </div>

          {run.result && (
            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <h3 className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
                Result
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-800">{run.result}</p>
            </div>
          )}

          <div>
            <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold tracking-wider text-slate-500 uppercase">
              <Terminal className="h-4 w-4" />
              <span>Execution Logs</span>
            </div>
            <div className="overflow-x-auto rounded-xl bg-[#0F172A] p-4 font-mono text-xs leading-relaxed text-slate-200">
              {run.logs.length > 0 ? (
                run.logs.map((line, idx) => (
                  <div key={idx} className="whitespace-pre-wrap">
                    {line}
                  </div>
                ))
              ) : (
                <span className="text-slate-400">No logs available yet.</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}