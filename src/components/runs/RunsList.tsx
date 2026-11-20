import type { Run } from '../../types/run';
import { RunRow } from './RunRow';

interface RunsListProps {
  runs: Run[];
  selectedRunId: string | null;
  onSelectRun: (run: Run) => void;
}

export function RunsList({ runs, selectedRunId, onSelectRun }: RunsListProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xs">
      <div className="hidden md:block">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/70 text-xs font-semibold tracking-wider text-slate-500 uppercase">
              <th className="px-5 py-3">Run</th>
              <th className="px-5 py-3">Repository / Branch</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3">Created</th>
              <th className="px-5 py-3 text-right">Duration</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {runs.map((run) => (
              <RunRow
                key={run.id}
                run={run}
                isSelected={run.id === selectedRunId}
                onSelect={onSelectRun}
                variant="table"
              />
            ))}
          </tbody>
        </table>
      </div>

      <div className="divide-y divide-slate-200 md:hidden">
        {runs.map((run) => (
          <RunRow
            key={run.id}
            run={run}
            isSelected={run.id === selectedRunId}
            onSelect={onSelectRun}
            variant="card"
          />
        ))}
      </div>
    </div>
  );
}