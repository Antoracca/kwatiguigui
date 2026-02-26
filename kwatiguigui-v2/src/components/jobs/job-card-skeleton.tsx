import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export function JobCardSkeleton() {
  return (
    <Card>
      <CardContent className="p-5">
        {/* Header */}
        <div className="flex items-start gap-3">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-32" />
            <div className="flex gap-2">
              <Skeleton className="h-5 w-20 rounded-full" />
              <Skeleton className="h-5 w-24 rounded-full" />
            </div>
          </div>
          <Skeleton className="h-3 w-16" />
        </div>

        {/* Location */}
        <div className="mt-3 flex items-center gap-2">
          <Skeleton className="h-3.5 w-3.5 rounded-full" />
          <Skeleton className="h-3.5 w-40" />
        </div>

        {/* Experience */}
        <div className="mt-3 space-y-1.5">
          <Skeleton className="h-3.5 w-full" />
          <Skeleton className="h-3.5 w-4/5" />
        </div>

        {/* WhatsApp button */}
        <div className="mt-4 border-t border-neutral-100 pt-4 dark:border-neutral-800">
          <Skeleton className="h-9 w-full rounded-full" />
        </div>

        {/* Detail link */}
        <Skeleton className="mx-auto mt-2 h-3 w-20" />
      </CardContent>
    </Card>
  );
}

// Grid of 6 skeletons for loading state
export function JobCardSkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <JobCardSkeleton key={i} />
      ))}
    </div>
  );
}
