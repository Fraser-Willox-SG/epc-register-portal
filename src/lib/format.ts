// Null-safe address formatter used by tables and detail pages
export function formatAddress(parts: {
  addressLine1?: string | null;
  addressLine2?: string | null;
  addressLine3?: string | null;
  addressLine4?: string | null;
  town?: string | null;
  postcode?: string | null;
}) {
  const {
    addressLine1,
    addressLine2,
    addressLine3,
    addressLine4,
    town,
    postcode,
  } = parts;
  const line = [addressLine1, addressLine2, addressLine3, addressLine4, town]
    .filter(Boolean)
    .join(", ");
  return postcode ? `${line}, ${postcode}` : line;
}
