// Auth group loading — shown inside the glassmorphism card while
// login / register / onboarding / reset-password pages stream in.
import { ContentLoader } from "@/components/ui/page-loader";

export default function Loading() {
  return <ContentLoader size={100} />;
}
