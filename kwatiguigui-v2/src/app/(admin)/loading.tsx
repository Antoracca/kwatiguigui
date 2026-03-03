// Admin group loading — shown inside the admin content area while any
// admin page streams in. Admin sidebar/header remain visible.
import { ContentLoader } from "@/components/ui/page-loader";

export default function Loading() {
  return <ContentLoader size={140} />;
}
