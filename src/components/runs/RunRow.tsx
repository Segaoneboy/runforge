import { Calendar, Clock, FolderGit2, GitBranch } from 'lucide-react';
import type { Run } from '../../types/run';
import { formatDate, formatDuration } from '../../utils/formatters';
import { StatusBadge } from './StatusBadge';

interface RunRowProps {
  run: Run;
  isSelected: boolean;
  onSelect: (run: Run) => void;
  variant: 'table' | 'card';
}

export function RunRow({ run, isSelected, onSelect, variant }: RunRowProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect(run);
    }
  };

  if (variant === 'card') {
    return (
      <div
        role="button"
        tabIndex={0}
        aria-label={`Open details for ${run.name}`}
        onClick={() => onSelect(run)}
        onKeyDown={handleKeyDown}
        className="cursor-pointer p-4 transition hover:bg-slate-50 active:bg-slate-100"
      >
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-medium text-slate-900">{run.name}</h3>
          <StatusBadge status={run.status} />
        </div>

        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-600">
          <span className="inline-flex items-center gap-1 font-medium">
            <FolderGit2 className="h-3.5 w-3.5 text-slate-400" />
            {run.repository}
          </span>
          <span className="inline-flex items-center gap-1 font-mono text-slate-500">
            <GitBranch className="h-3 w-3 text-slate-400" />
            {run.branch}
          </span>
        </div>

        <div className="mt-2.5 flex items-center justify-between text-xs text-slate-500">
          <span className="inline-flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5 text-slate-400" />
            {formatDate(run.createdAt)}
          </span>
          <span className="inline-flex items-center gap-1 font-mono">
            <Clock className="h-3.5 w-3.5 text-slate-400" />
            {formatDuration(run.durationSeconds)}
          </span>
        </div>
      </div>
    );
  }

  return (
    <tr
      tabIndex={0}
      role="button"
      aria-label={`Open details for ${run.name}`}
      onClick={() => onSelect(run)}
      onKeyDown={handleKeyDown}
      className={`cursor-pointer transition focus:bg-slate-100 focus:outline-none ${
        isSelected ? 'bg-slate-100/80' : 'hover:bg-slate-50'
      }`}
    >
      <td className="px-5 py-3.5 font-medium text-slate-900">{run.name}</td>
      <td className="px-5 py-3.5">
        <div className="flex flex-col gap-0.5">
          <span className="inline-flex items-center gap-1.5 font-medium text-slate-700">
            <FolderGit2 className="h-3.5 w-3.5 text-slate-400" />
            {run.repository}
          </span>
          <span className="inline-flex items-center gap-1 font-mono text-xs text-slate-500">
            <GitBranch className="h-3 w-3 text-slate-400" />
            {run.branch}
          </span>
        </div>
      </td>
      <td className="px-5 py-3.5">
        <StatusBadge status={run.status} />
      </td>
      <td className="px-5 py-3.5 text-slate-600">{formatDate(run.createdAt)}</td>
      <td className="px-5 py-3.5 text-right font-mono text-xs text-slate-600">
        {formatDuration(run.durationSeconds)}
      </td>
    </tr>
  );
}