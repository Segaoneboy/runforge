import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, beforeEach } from 'vitest';
import { App } from './App';

describe('Runforge Runs Dashboard', () => {
  beforeEach(() => {
    window.history.replaceState(null, '', '/');
  });


  it('filters runs by status', async () => {
    const user = userEvent.setup();
    render(<App />);

    await waitFor(() => {
      expect(screen.getAllByText('Auth refactor').length).toBeGreaterThan(0);
    }, { timeout: 2000 });

    const failedTab = screen.getByRole('tab', { name: /failed/i });
    await user.click(failedTab);

    expect(screen.getAllByText('Migrate user sessions to Redis').length).toBeGreaterThan(0);
    expect(screen.queryByText('Auth refactor')).not.toBeInTheDocument();
  });
  it('searches runs by name or repository', async () => {
    const user = userEvent.setup();
    render(<App />);

    await waitFor(() => {
      expect(screen.getAllByText('Auth refactor').length).toBeGreaterThan(0);
    }, { timeout: 2000 });

    const searchInput = screen.getByPlaceholderText(/search run or repo/i);
    await user.type(searchInput, 'payments');

    expect(screen.getAllByText('Fix checkout tests').length).toBeGreaterThan(0);
    expect(screen.queryByText('Auth refactor')).not.toBeInTheDocument();
  });
  it('opens run details drawer on click and closes on Escape', async () => {
    const user = userEvent.setup();
    render(<App />);

    await waitFor(() => {
      expect(screen.getAllByText('Fix checkout tests').length).toBeGreaterThan(0);
    }, { timeout: 2000 });

    const runTriggers = screen.getAllByRole('button', {
      name: /open details for fix checkout tests/i,
    });
    await user.click(runTriggers[0]);

    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();
    expect(screen.getByText(/execution logs/i)).toBeInTheDocument();
    expect(screen.getByText(/fixed race condition in stripe webhook/i)).toBeInTheDocument();

    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
  it('shows empty state when no runs match and resets filters', async () => {
    const user = userEvent.setup();
    render(<App />);

    await waitFor(() => {
      expect(screen.getAllByText('Auth refactor').length).toBeGreaterThan(0);
    }, { timeout: 2000 });

    const searchInput = screen.getByPlaceholderText(/search run or repo/i);
    await user.type(searchInput, 'non-existent-run-xyz');

    expect(screen.getByText('Запуски не найдены')).toBeInTheDocument();

    const resetBtn = screen.getByRole('button', { name: /сбросить фильтры/i });
    await user.click(resetBtn);

    expect(screen.getAllByText('Auth refactor').length).toBeGreaterThan(0);
    expect(searchInput).toHaveValue('');
  });

  it('handles API error state and recovers on retry', async () => {
    const user = userEvent.setup();
    render(<App />);

    await waitFor(() => {
      expect(screen.getAllByText('Auth refactor').length).toBeGreaterThan(0);
    }, { timeout: 2000 });

    const errorCheckbox = screen.getByLabelText(/simulate api error/i);
    await user.click(errorCheckbox);

    await waitFor(() => {
      expect(screen.getByText('Ошибка загрузки запусков')).toBeInTheDocument();
    }, { timeout: 2000 });

    const retryBtn = screen.getByRole('button', { name: /повторить/i });
    await user.click(retryBtn);

    await waitFor(() => {
      expect(screen.getAllByText('Auth refactor').length).toBeGreaterThan(0);
    }, { timeout: 2000 });
  });

  it('syncs selected status and search query with URL parameters', async () => {
    const user = userEvent.setup();
    render(<App />);

    await waitFor(() => {
      expect(screen.getAllByText('Auth refactor').length).toBeGreaterThan(0);
    }, { timeout: 2000 });

    await user.click(screen.getByRole('tab', { name: /succeeded/i }));
    await user.type(screen.getByPlaceholderText(/search run or repo/i), 'checkout');

    expect(window.location.search).toContain('status=succeeded');
    expect(window.location.search).toContain('q=checkout');
  });
});