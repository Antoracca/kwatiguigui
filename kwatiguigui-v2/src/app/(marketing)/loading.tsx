// Marketing group loading — shown inside <main> (between header and footer)
// while any public page streams in.
import { ContentLoader } from "@/components/ui/page-loader";

export default function Loading() {
  return <ContentLoader size={160} />;
}
