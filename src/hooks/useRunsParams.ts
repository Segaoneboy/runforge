import { useState, useEffect, useCallback } from 'react';
import type { SortOption, StatusFilter } from '../types/run';

const VALID_STATUSES: StatusFilter[] = ['all', 'queued', 'running', 'succeeded', 'failed'];
const VALID_SORTS: SortOption[] = ['date_desc', 'date_asc', 'duration_desc', 'duration_asc'];

function getInitialParams() {
  const params = new URLSearchParams(window.location.search);
  const rawStatus = params.get('status') as StatusFilter;
  const rawSort = params.get('sort') as SortOption;

  return {
    status: VALID_STATUSES.includes(rawStatus) ? rawStatus : 'all',
    search: params.get('q') ?? '',
    sort: VALID_SORTS.includes(rawSort) ? rawSort : 'date_desc',
  };
}

export function useRunsParams() {
  const [status, setStatus] = useState<StatusFilter>(() => getInitialParams().status);
  const [search, setSearch] = useState<string>(() => getInitialParams().search);
  const [sort, setSort] = useState<SortOption>(() => getInitialParams().sort);

  useEffect(() => {
    const params = new URLSearchParams();
    if (status !== 'all') params.set('status', status);
    if (search.trim()) params.set('q', search.trim());
    if (sort !== 'date_desc') params.set('sort', sort);

    const queryString = params.toString();
    const newUrl = queryString ? `${window.location.pathname}?${queryString}` : window.location.pathname;
    window.history.replaceState(null, '', newUrl);
  }, [status, search, sort]);

  const resetFilters = useCallback(() => {
    setStatus('all');
    setSearch('');
    setSort('date_desc');
  }, []);

  return {
    status,
    setStatus,
    search,
    setSearch,
    sort,
    setSort,
    resetFilters,
  };
}