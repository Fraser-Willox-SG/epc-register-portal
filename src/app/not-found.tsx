import Link from "next/link";

export default function GlobalNotFound() {
  return (
    <div className="ds_wrapper">
      <div className="ds_inset-text">
        <h1 className="ds_h1">Page not found</h1>

        <p className="ds_lede">
          The page you’re looking for does not exist or may have been moved.
        </p>

        <p>
          Check the web address is correct, or return to the service and try
          again.
        </p>

        <ul className="ds_list ds_list--bullet ds_mt-3">
          <li>
            <Link href="/" className="ds_link">
              Go to home page
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
