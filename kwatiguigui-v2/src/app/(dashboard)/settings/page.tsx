import type { Metadata } from "next";

import { SettingsClient } from "@/components/dashboard/settings-client";

export const metadata: Metadata = {
  title: "Parametres — KWATIGUIGUI",
  robots: { index: false, follow: false },
};

export default function SettingsPage() {
  return <SettingsClient />;
}
