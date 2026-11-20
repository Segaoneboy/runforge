import { MOCK_RUNS } from '../data/mockRuns';
import type { Run } from '../types/run';

export interface FetchRunsOptions {
  delayMs?: number;
  shouldFail?: boolean;
}

export function fetchRuns(options: FetchRunsOptions = {}): Promise<Run[]> {
  const { delayMs = 600, shouldFail = false } = options;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error('Не удалось загрузить список запусков. Проверьте соединение с сервером.'));
        return;
      }

      // Возвращаем копию массива, чтобы имитировать свежий ответ от API
      resolve(MOCK_RUNS.map((run) => ({ ...run, logs: [...run.logs] })));
    }, delayMs);
  });
}