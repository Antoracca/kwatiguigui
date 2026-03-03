// Root-level loading — shown on initial page load and hard refresh.
// Acts as the global Suspense fallback for any route that doesn't have
// its own loading.tsx.
import { FullscreenLoader } from "@/components/ui/page-loader";

export default function Loading() {
  return <FullscreenLoader />;
}
