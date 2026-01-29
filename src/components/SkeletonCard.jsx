const SkeletonCard = () => {
  return (
    <div className="glass-card overflow-hidden animate-pulse">
      <div className="aspect-square bg-slate-700/50" />
      <div className="p-4 space-y-3">
        <div className="flex justify-between">
          <div className="h-4 bg-slate-700/50 rounded w-20" />
          <div className="h-4 bg-slate-700/50 rounded w-16" />
        </div>
        <div className="h-5 bg-slate-700/50 rounded w-3/4" />
        <div className="h-5 bg-slate-700/50 rounded w-1/2" />
        <div className="flex justify-between pt-2">
          <div className="h-6 bg-slate-700/50 rounded w-20" />
          <div className="h-4 bg-slate-700/50 rounded w-16" />
        </div>
      </div>
    </div>
  )
}

export default SkeletonCard
