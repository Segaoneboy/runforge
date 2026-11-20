import { CheckCircle2, Clock, Loader2, XCircle } from 'lucide-react';
import type { RunStatus } from '../../types/run';

interface StatusBadgeProps {
  status: RunStatus;
}

const STATUS_CONFIG: Record<
  RunStatus,
  {
    label: string;
    classes: string;
    Icon: typeof Clock;
    iconClass?: string;
  }
> = {
  queued: {
    label: 'Queued',
    classes: 'bg-slate-100 text-slate-700 border-slate-200',
    Icon: Clock,
  },
  running: {
    label: 'Running',
    classes: 'bg-blue-50 text-blue-800 border-blue-200',
    Icon: Loader2,
    iconClass: 'animate-spin text-blue-600',
  },
  succeeded: {
    label: 'Succeeded',
    classes: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    Icon: CheckCircle2,
    iconClass: 'text-emerald-600',
  },
  failed: {
    label: 'Failed',
    classes: 'bg-red-50 text-red-800 border-red-200',
    Icon: XCircle,
    iconClass: 'text-red-600',
  },
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const { label, classes, Icon, iconClass } = STATUS_CONFIG[status];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium ${classes}`}
    >
      <Icon className={`h-3.5 w-3.5 shrink-0 ${iconClass ?? ''}`} aria-hidden="true" />
      <span>{label}</span>
    </span>
  );
}