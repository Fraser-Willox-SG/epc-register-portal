import Link from "next/link";

type Props = {
  title?: string;
  message?: string;
  /** Optional reference / digest / correlation id for support/debug */
  reference?: string;
  /** Optional secondary detail (dev only, or if you choose) */
  detail?: string;
  /** Callback for Next.js error boundary reset() */
  onRetry?: () => void;

  backLinkHref?: string;
  backLinkText?: string;
};

export default function ServiceError({
  title = "We can’t display this page right now",
  message = "There’s a problem loading the information. Please try again later.",
  reference,
  detail,
  onRetry,
  backLinkHref = "/",
  backLinkText = "Back to start",
}: Props) {
  return (
    <div className="ds_inset-text" role="alert" aria-live="polite">
      <h1 className="ds_h1">{title}</h1>
      <p className="ds_lede">{message}</p>

      {reference ? (
        <p className="text-small">
          <strong>Reference:</strong> {reference}
        </p>
      ) : null}

      {detail ? (
        <pre className="ds_inset-text" style={{ whiteSpace: "pre-wrap" }}>
          {detail}
        </pre>
      ) : null}

      <div className="ds_mt-4 flex-between">
        {onRetry ? (
          <button type="button" className="ds_button" onClick={onRetry}>
            Try again
          </button>
        ) : (
          <span />
        )}

        <Link className="ds_link" href={backLinkHref}>
          {backLinkText}
        </Link>
      </div>
    </div>
  );
}
