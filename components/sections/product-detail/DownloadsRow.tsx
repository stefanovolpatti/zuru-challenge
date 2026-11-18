import type { ProductDownload } from "@/types/content";

/**
 * Full-width row linking to downloadable files (manuals, spec sheets).
 * Renders nothing when the product has no downloads.
 */
export function DownloadsRow({ downloads }: { downloads?: ProductDownload[] }) {
  if (!downloads || downloads.length === 0) return null;

  return (
    <section aria-label="Downloads" className="rounded-3xl bg-background px-6 py-5">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-base font-semibold text-primary">Downloads</h2>
        <ul className="flex items-center gap-6">
          {downloads.map((download) => (
            <li key={download.label}>
              <a
                href={download.href}
                className="flex items-center gap-2 text-sm font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                {download.label}
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="size-5"
                >
                  <path d="M12 3v12" />
                  <path d="m7 10 5 5 5-5" />
                  <path d="M5 21h14" />
                </svg>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
