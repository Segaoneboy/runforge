import { useState, useEffect, useMemo, useCallback } from 'react';
import { fetchRuns } from './api/runsApi';
import { RunDetailsDrawer } from './components/runs/RunDetailsDrawer';
import { RunFilters } from './components/runs/RunFilters';
import { RunsList } from './components/runs/RunsList';
import { EmptyState } from './components/ui/EmptyState';
import { ErrorState } from './components/ui/ErrorState';
import { SkeletonList } from './components/ui/SkeletonList';
import { useRunsParams } from './hooks/useRunsParams';
import type { Run, StatusFilter } from './types/run';
import { Header } from './components/layout/Header';

export function App() {
  const [runs, setRuns] = useState<Run[]>([]);
  const [requestState, setRequestState] = useState<'loading' | 'success' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [simulateError, setSimulateError] = useState<boolean>(false);
  const [selectedRun, setSelectedRun] = useState<Run | null>(null);

  const { status, setStatus, search, setSearch, sort, setSort, resetFilters } = useRunsParams();

  const loadRuns = useCallback(
    async (shouldFail = simulateError) => {
      setRequestState('loading');
      setErrorMessage('');

      try {
        const data = await fetchRuns({ shouldFail });
        setRuns(data);
        setRequestState('success');
      } catch (err) {
        setErrorMessage(err instanceof Error ? err.message : 'Произошла неизвестная ошибка');
        setRequestState('error');
      }
    },
    [simulateError]
  );

  useEffect(() => {
    loadRuns();
  }, [loadRuns]);

  const counts = useMemo<Record<StatusFilter, number>>(() => {
    return runs.reduce(
      (acc, run) => {
        acc.all += 1;
        acc[run.status] += 1;
        return acc;
      },
      { all: 0, queued: 0, running: 0, succeeded: 0, failed: 0 }
    );
  }, [runs]);

  const filteredAndSortedRuns = useMemo(() => {
    const query = search.trim().toLowerCase();

    const filtered = runs.filter((run) => {
      const matchesStatus = status === 'all' || run.status === status;
      const matchesSearch =
        !query ||
        run.name.toLowerCase().includes(query) ||
        run.repository.toLowerCase().includes(query);

      return matchesStatus && matchesSearch;
    });

    return [...filtered].sort((a, b) => {
      if (sort === 'date_desc') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      if (sort === 'date_asc') {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      }
      const durA = a.durationSeconds ?? -1;
      const durB = b.durationSeconds ?? -1;
      return sort === 'duration_desc' ? durB - durA : durA - durB;
    });
  }, [runs, status, search, sort]);

  const handleToggleSimulateError = (checked: boolean) => {
    setSimulateError(checked);
    loadRuns(checked);
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-slate-900">
      <Header simulateError={simulateError} onToggleSimulateError={handleToggleSimulateError} />

      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold tracking-tight text-[#0F172A]">Agent Runs</h1>
          <p className="mt-1 text-sm text-slate-500">
            Monitor isolated AI agent executions, inspect logs, and review results.
          </p>
        </div>

        <RunFilters
          status={status}
          onStatusChange={setStatus}
          search={search}
          onSearchChange={setSearch}
          sort={sort}
          onSortChange={setSort}
          counts={counts}
        />

        {requestState === 'loading' && <SkeletonList />}

        {requestState === 'error' && (
          <ErrorState
            message={errorMessage}
            onRetry={() => {
              setSimulateError(false);
              loadRuns(false);
            }}
          />
        )}

        {requestState === 'success' && filteredAndSortedRuns.length === 0 && (
          <EmptyState onReset={resetFilters} />
        )}

        {requestState === 'success' && filteredAndSortedRuns.length > 0 && (
          <RunsList
            runs={filteredAndSortedRuns}
            selectedRunId={selectedRun?.id ?? null}
            onSelectRun={setSelectedRun}
          />
        )}
      </main>

      <RunDetailsDrawer run={selectedRun} onClose={() => setSelectedRun(null)} />
    </div>
  );
}

export default App;