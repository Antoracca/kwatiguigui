// Dashboard group loading — shown inside <main> while any dashboard page
// streams in. The sidebar and header remain visible (layout is not suspended).
import { ContentLoader } from "@/components/ui/page-loader";

export default function Loading() {
  return <ContentLoader size={140} />;
}
