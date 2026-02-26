import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-neutral-50 px-4 dark:bg-neutral-950">
      {/* Logo */}
      <Link
        href="/"
        className="mb-8 flex items-center gap-2 font-heading text-heading-lg font-bold text-primary-500"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-500 text-white">
          <span className="text-body-md font-bold">K</span>
        </div>
        KWATIGUIGUI
      </Link>

      {/* Form card */}
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-neutral-200 bg-white p-8 shadow-lg dark:border-neutral-800 dark:bg-neutral-900">
          {children}
        </div>
      </div>

      {/* Footer */}
      <p className="mt-8 text-body-xs text-neutral-400">
        &copy; {new Date().getFullYear()} KWATIGUIGUI. Tous droits reserves.
      </p>
    </div>
  );
}
