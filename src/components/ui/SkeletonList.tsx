export function SkeletonList() {
  return (
    <div className="space-y-3" aria-label="Loading runs" role="status">
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse rounded-xl border border-slate-200 bg-white p-4 shadow-2xs"
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-2">
              <div className="h-4 w-44 rounded bg-slate-200" />
              <div className="h-3 w-32 rounded bg-slate-100" />
            </div>
            <div className="flex items-center gap-4">
              <div className="h-6 w-24 rounded-full bg-slate-200" />
              <div className="h-4 w-16 rounded bg-slate-100" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}