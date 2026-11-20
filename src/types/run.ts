export type RunStatus = 'queued' | 'running' | 'succeeded' | 'failed';

export type StatusFilter = 'all' | RunStatus;

export type SortOption = 'date_desc' | 'date_asc' | 'duration_desc' | 'duration_asc';

export interface Run {
  id: string;
  name: string;
  repository: string;
  branch: string;
  status: RunStatus;
  createdAt: string;
  durationSeconds?: number;
  logs: string[];
  result?: string;
}