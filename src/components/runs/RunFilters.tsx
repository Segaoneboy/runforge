import { Search, X } from 'lucide-react';
import type { SortOption, StatusFilter } from '../../types/run';

interface RunFiltersProps {
  status: StatusFilter;
  onStatusChange: (status: StatusFilter) => void;
  search: string;
  onSearchChange: (value: string) => void;
  sort: SortOption;
  onSortChange: (sort: SortOption) => void;
  counts: Record<StatusFilter, number>;
}

const STATUS_TABS: { value: StatusFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'queued', label: 'Queued' },
  { value: 'running', label: 'Running' },
  { value: 'succeeded', label: 'Succeeded' },
  { value: 'failed', label: 'Failed' },
];

export function RunFilters({
  status,
  onStatusChange,
  search,
  onSearchChange,
  sort,
  onSortChange,
  counts,
}: RunFiltersProps) {
  return (
    <div className="mb-5 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
      {/* Табы статусов */}
      <div
        className="flex flex-wrap items-center gap-1.5"
        role="tablist"
        aria-label="Filter runs by status"
      >
        {STATUS_TABS.map((tab) => {
          const isActive = status === tab.value;
          return (
            <button
              key={tab.value}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onStatusChange(tab.value)}
              className={`inline-flex cursor-pointer items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition ${
                isActive
                  ? 'bg-[#0F172A] text-white shadow-2xs'
                  : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`rounded-full px-1.5 py-0.2 text-xs ${
                  isActive ? 'bg-slate-700 text-slate-100' : 'bg-slate-100 text-slate-600'
                }`}
              >
                {counts[tab.value]}
              </span>
            </button>
          );
        })}
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <div className="relative w-full sm:w-64">
          <Search
            className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400"
            aria-hidden="true"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search run or repo..."
            aria-label="Search runs"
            className="w-full rounded-lg border border-slate-200 bg-white py-1.5 pr-8 pl-9 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#0F172A] focus:outline-none"
          />
          {search && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              aria-label="Clear search"
              className="absolute top-1/2 right-2.5 -translate-y-1/2 cursor-pointer text-slate-400 hover:text-slate-600"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
          aria-label="Sort runs"
          className="cursor-pointer rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-700 focus:border-[#0F172A] focus:outline-none"
        >
          <option value="date_desc">Newest first</option>
          <option value="date_asc">Oldest first</option>
          <option value="duration_desc">Longest duration</option>
          <option value="duration_asc">Shortest duration</option>
        </select>
      </div>
    </div>
  );
}