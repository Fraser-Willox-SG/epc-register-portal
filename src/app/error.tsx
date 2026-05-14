"use client";

import ServiceError from "@/app/components/ServiceError";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const showDetail = process.env.NODE_ENV !== "production";

  return (
    <html lang="en">
      <body>
        <div className="ds_wrapper">
          <ServiceError
            title="Sorry, there is a problem with the service"
            message="Try again in a few minutes."
            reference={error.digest}
            detail={showDetail ? error.message : undefined}
            onRetry={reset}
            backLinkHref="/"
            backLinkText="Back to start"
          />
        </div>
      </body>
    </html>
  );
}
