import Link from "next/link";
import { formatShortOrdinalDate } from "@/app/utils/date";
import { StatusTag } from "./StatusTag";

export type CipStatus = "complete" | "pending" | "failed";

export type CipHistoryItem = {
  id: number;
  file_id: string;
  uploaded_by: string;
  uploaded_at: string | null;
  computed_at: string | null;
  status: CipStatus;
};

type HistoryTableProps = {
  history: CipHistoryItem[];
  error: string | null;
};

export function HistoryTable({ history, error }: HistoryTableProps) {
  return (
    <>
      <h2 className="ds_h3 ds_mt-5">CIP History</h2>

      {error ? (
        <p className="ds_error-message">{error}</p>
      ) : history.length === 0 ? (
        <div className="ds_inset-text">
          <p>No CIP files have been created yet.</p>
        </div>
      ) : (
        <table className="ds_table">
          <caption>Recent CIP processing history</caption>

          <thead>
            <tr>
              <th scope="col">Creator</th>
              <th scope="col">Uploaded Date</th>
              <th scope="col">Computed Date</th>
              <th scope="col">Status</th>
              <th scope="col">Output XML</th>
              <th scope="col">Input ZIP</th>
            </tr>
          </thead>

          <tbody>
            {history.map((item) => {
              const complete = item.status === "complete";

              return (
                <tr key={item.id}>
                  <td>{item.uploaded_by || "—"}</td>

                  <td className="ds_nowrap">
                    {formatShortOrdinalDate(item.uploaded_at)}
                  </td>

                  <td className="ds_nowrap">
                    {item.computed_at
                      ? formatShortOrdinalDate(item.computed_at)
                      : "—"}
                  </td>

                  <td>
                    <StatusTag status={item.status} />
                  </td>

                  <td className="ds_nowrap">
                    {complete ? (
                      <Link
                        href={`/api/sg/cip/download/output/${item.file_id}`}
                        className="ds_link"
                      >
                        {item.file_id}.xml
                      </Link>
                    ) : (
                      "—"
                    )}
                  </td>

                  <td className="ds_nowrap">
                    {complete ? (
                      <Link
                        href={`/api/sg/cip/download/input/${item.file_id}`}
                        className="ds_link"
                      >
                        {item.file_id}.zip
                      </Link>
                    ) : (
                      "—"
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
}
